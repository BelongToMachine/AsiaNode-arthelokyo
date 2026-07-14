import { randomUUID } from 'crypto';

import { asianodeKnowledgeBase } from '~/shared/data/asianode-knowledge';

export const dynamic = 'force-dynamic';
export const maxDuration = 45;

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2_000;
const MAX_CONTEXT_LENGTH = 10_000;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const SESSION_COOKIE = 'asianode_ai_session';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

const requestLog = new Map<string, number[]>();

const SYSTEM_PROMPT = `You are the Asianode Advisor, a helpful guide for international brands considering growth in Türkiye.

Asianode is a local growth partner based in Istanbul. Its public focus areas are creator partnerships, social commerce, channel development, local operations, market activation, and cross-border growth.

Use the following published FAQ knowledge as your primary source of truth. If a question is covered here, answer consistently with it:\n\n${asianodeKnowledgeBase}

Give clear, commercially useful answers in English. Explain market considerations at a high level, suggest sensible next steps, and invite the visitor to contact Asianode when a tailored recommendation, pricing, a timeline, or verified local market detail is needed.

Do not invent case studies, team details, customer names, performance metrics, pricing, legal advice, or claims that are not supplied here. If the visitor asks for information outside Asianode's published scope, say so plainly. Do not present yourself as a human employee. Keep answers concise and practical, using short paragraphs or bullets when useful.`;

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  return forwardedFor?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (requestLog.get(key) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, recent);
    return true;
  }

  recent.push(now);
  requestLog.set(key, recent);
  return false;
}

function parseMessages(value: unknown): Message[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return null;

  const messages = value.map((message) => {
    if (!message || typeof message !== 'object') return null;

    const { role, content } = message as Record<string, unknown>;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') return null;

    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent.length > MAX_MESSAGE_LENGTH) return null;

    return { role, content: trimmedContent } as Message;
  });

  if (messages.some((message) => !message) || messages[messages.length - 1]?.role !== 'user') return null;
  if (messages.reduce((total, message) => total + (message?.content.length || 0), 0) > MAX_CONTEXT_LENGTH) return null;

  return messages as Message[];
}

function withSessionCookie(response: Response, request: Request) {
  if (request.headers.get('cookie')?.includes(`${SESSION_COOKIE}=`)) return response;

  response.headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=${randomUUID()}; Path=/; Max-Age=31536000; HttpOnly; SameSite=Lax${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  );
  return response;
}

export async function POST(request: Request) {
  let payload: { messages?: unknown };

  try {
    payload = await request.json();
  } catch {
    return withSessionCookie(Response.json({ error: 'Invalid request body.' }, { status: 400 }), request);
  }

  const messages = parseMessages(payload.messages);
  if (!messages) {
    return withSessionCookie(Response.json({ error: 'Please send a valid conversation.' }, { status: 400 }), request);
  }

  if (isRateLimited(getClientKey(request))) {
    return withSessionCookie(
      Response.json({ error: 'Please wait a moment before sending another message.' }, { status: 429 }),
      request,
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return withSessionCookie(
      Response.json({ error: 'The advisor is not configured yet. Please use the contact form.' }, { status: 503 }),
      request,
    );
  }

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), 30_000);

  try {
    const upstream = await fetch(`${process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1'}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
        stream: true,
        temperature: 0.4,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      }),
      signal: abortController.signal,
    });

    if (!upstream.ok || !upstream.body) {
      return withSessionCookie(
        Response.json({ error: 'The advisor is temporarily unavailable. Please try again shortly.' }, { status: 503 }),
        request,
      );
    }

    return withSessionCookie(
      new Response(upstream.body, {
        headers: {
          'Content-Type': 'text/event-stream; charset=utf-8',
          'Cache-Control': 'no-cache, no-transform',
          Connection: 'keep-alive',
        },
      }),
      request,
    );
  } catch {
    return withSessionCookie(
      Response.json({ error: 'The advisor is temporarily unavailable. Please try again shortly.' }, { status: 503 }),
      request,
    );
  } finally {
    clearTimeout(timeout);
  }
}
