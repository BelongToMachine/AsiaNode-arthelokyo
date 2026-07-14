'use client';

import { IconArrowsMove, IconMessageCircle2, IconX } from '@tabler/icons-react';
import { type PointerEvent, useEffect, useRef, useState } from 'react';

import AsianodeChat from './AsianodeChat';

type Position = { x: number; y: number };

const EDGE_GAP = 16;
const DRAG_HOLD_DELAY_MS = 180;

export default function FloatingAdvisor() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef<Position | null>(null);
  const dragHoldTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDragActiveRef = useRef(false);

  useEffect(() => {
    const openAdvisor = () => setIsOpen(true);
    window.addEventListener('open-asianode-advisor', openAdvisor);
    return () => window.removeEventListener('open-asianode-advisor', openAdvisor);
  }, []);

  const clampPosition = (nextPosition: Position) => {
    const panel = panelRef.current;
    if (!panel) return nextPosition;

    return {
      x: Math.min(Math.max(EDGE_GAP, nextPosition.x), window.innerWidth - panel.offsetWidth - EDGE_GAP),
      y: Math.min(Math.max(EDGE_GAP, nextPosition.y), window.innerHeight - panel.offsetHeight - EDGE_GAP),
    };
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest('button')) return;

    const panel = panelRef.current;
    if (!panel) return;

    panel.setPointerCapture(event.pointerId);
    dragOffsetRef.current = {
      x: event.clientX - panel.getBoundingClientRect().left,
      y: event.clientY - panel.getBoundingClientRect().top,
    };
    dragHoldTimerRef.current = setTimeout(() => {
      isDragActiveRef.current = true;
      setIsDragging(true);
    }, DRAG_HOLD_DELAY_MS);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragOffsetRef.current || !isDragActiveRef.current) return;
    setPosition(
      clampPosition({ x: event.clientX - dragOffsetRef.current.x, y: event.clientY - dragOffsetRef.current.y }),
    );
  };

  const handlePointerUp = () => {
    if (!dragOffsetRef.current) return;

    if (dragHoldTimerRef.current) clearTimeout(dragHoldTimerRef.current);
    dragHoldTimerRef.current = null;
    dragOffsetRef.current = null;
    if (!isDragActiveRef.current) return;

    isDragActiveRef.current = false;
    setIsDragging(false);
    setPosition((currentPosition) => {
      if (!currentPosition || !panelRef.current) return currentPosition;

      const panel = panelRef.current;
      const snapToRight = currentPosition.x + panel.offsetWidth / 2 > window.innerWidth / 2;
      return clampPosition({
        x: snapToRight ? window.innerWidth - panel.offsetWidth - EDGE_GAP : EDGE_GAP,
        y: currentPosition.y,
      });
    });
  };

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-amber-300 dark:hover:bg-amber-200"
        aria-label="Open Asianode Advisor"
      >
        <IconMessageCircle2 className="h-5 w-5" aria-hidden="true" />
        Ask AI about Asianode
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      className={`fixed z-50 w-[calc(100vw-2rem)] max-w-md overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/20 dark:border-slate-700 dark:bg-slate-900 ${
        isDragging ? '' : 'transition-[left,top] duration-300 ease-out'
      }`}
      style={position ? { left: position.x, top: position.y } : { right: EDGE_GAP, bottom: EDGE_GAP }}
    >
      <div
        className="flex touch-none items-center justify-between border-b border-slate-200 bg-stone-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
          <IconArrowsMove className="h-4 w-4 text-amber-700 dark:text-amber-300" aria-hidden="true" />
          <span className="text-sm font-semibold">Asianode Advisor</span>
          <span className="hidden text-xs text-slate-400 sm:inline">Drag to reposition</span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded p-1 text-slate-500 transition hover:bg-slate-200 hover:text-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white"
          aria-label="Close Asianode Advisor"
        >
          <IconX className="h-5 w-5" />
        </button>
      </div>
      <AsianodeChat embedded />
    </div>
  );
}
