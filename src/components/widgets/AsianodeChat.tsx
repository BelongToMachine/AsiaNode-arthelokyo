'use client';

import { IconArrowUp, IconLoader2, IconMessageCircle2, IconSparkles } from '@tabler/icons-react';
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const suggestedPrompts = [
  'How can creator partnerships support a Türkiye market entry?',
  'What should we consider before launching social commerce locally?',
  'How can Asianode support a market activation plan?',
];

function getSseContent(buffer: string) {
  const events = buffer.split('\n\n');
  const remainder = events.pop() || '';
  let content = '';

  for (const event of events) {
    const line = event.split('\n').find((item) => item.startsWith('data: '));
    const data = line?.slice(6);
    if (!data || data === '[DONE]') continue;

    try {
      content += JSON.parse(data).choices?.[0]?.delta?.content || '';
    } catch {
      // Ignore incomplete or non-content events from the upstream stream.
    }
  }

  return { content, remainder };
}

export default function AsianodeChat({ embedded = false }: { embedded?: boolean }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isSending]);

  const sendMessage = async (message = input) => {
    const content = message.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: 'user' as const, content }];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok || !response.body) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'The advisor is temporarily unavailable.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const parsed = getSseContent(buffer);
        buffer = parsed.remainder;
        assistantContent += parsed.content;

        if (parsed.content) {
          setMessages([...nextMessages, { role: 'assistant', content: assistantContent }]);
        }
      }

      const parsed = getSseContent(`${buffer}\n\n`);
      if (parsed.content) {
        assistantContent += parsed.content;
        setMessages([...nextMessages, { role: 'assistant', content: assistantContent }]);
      }
    } catch (requestError) {
      setMessages(nextMessages);
      setError(requestError instanceof Error ? requestError.message : 'Unable to start a conversation.');
    } finally {
      setIsSending(false);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <section className={embedded ? '' : 'min-h-[calc(100vh-5rem)] bg-stone-50 py-12 dark:bg-slate-950 sm:py-16'}>
      <div
        className={
          embedded
            ? 'mx-auto max-w-3xl'
            : 'mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14'
        }
      >
        {!embedded && (
          <div className="pt-3 lg:pt-12">
            <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
              <IconSparkles className="h-4 w-4" aria-hidden="true" /> Asianode advisor
            </p>
            <h1 className="font-heading max-w-lg text-4xl font-bold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              A clearer starting point for Türkiye.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Ask about local growth, creator partnerships, social commerce, or how to begin a focused market
              conversation.
            </p>
            <p className="mt-8 max-w-md border-l-2 border-amber-400 pl-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
              This advisor offers general guidance based on Asianode&apos;s public positioning. For tailored
              recommendations, please contact our team.
            </p>
          </div>
        )}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/20">
          <div className="flex items-center gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-800 dark:bg-amber-300 dark:text-slate-950">
              <IconMessageCircle2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">Start a conversation</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">General market and partnership guidance</p>
            </div>
          </div>

          <div className="flex min-h-[27rem] flex-col">
            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6" aria-live="polite">
              {messages.length === 0 ? (
                <div className="flex h-full flex-col justify-center py-8">
                  <p className="max-w-md text-xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                    Where would you like to begin?
                  </p>
                  <div className="mt-6 flex flex-col items-start gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void sendMessage(prompt)}
                        disabled={isSending}
                        className="rounded-full border border-slate-200 px-4 py-2 text-left text-sm text-slate-700 transition hover:border-amber-400 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:border-amber-300 dark:hover:bg-slate-800"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-7 sm:max-w-[80%] ${
                        message.role === 'user'
                          ? 'rounded-br-sm bg-slate-900 text-white dark:bg-amber-300 dark:text-slate-950'
                          : 'rounded-bl-sm bg-stone-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {message.content || <IconLoader2 className="h-5 w-5 animate-spin" aria-label="Thinking" />}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {error && <p className="px-5 pb-2 text-sm text-red-700 dark:text-red-300">{error}</p>}
            <form onSubmit={submit} className="border-t border-slate-200 p-4 dark:border-slate-700">
              <label className="sr-only" htmlFor="asianode-chat-input">
                Ask AI about Asianode
              </label>
              <div className="flex items-end gap-3 rounded-lg border border-slate-300 bg-white p-2 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 dark:border-slate-600 dark:bg-slate-950 dark:focus-within:border-amber-300 dark:focus-within:ring-amber-300/20">
                <textarea
                  id="asianode-chat-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask a question about growing in Türkiye..."
                  rows={1}
                  maxLength={2000}
                  disabled={isSending}
                  className="max-h-32 min-h-[2.5rem] flex-1 resize-y border-0 bg-transparent px-2 py-2 text-[15px] leading-6 text-slate-900 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isSending}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-amber-400 text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-amber-300 dark:hover:bg-amber-200"
                  aria-label="Send message"
                >
                  {isSending ? <IconLoader2 className="h-5 w-5 animate-spin" /> : <IconArrowUp className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 px-1 text-xs text-slate-400 dark:text-slate-500">
                Press Enter to send · Shift + Enter for a new line
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
