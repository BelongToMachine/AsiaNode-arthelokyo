'use client';

import { useEffect, useRef } from 'react';
import Headline from '../common/Headline';
import { TeamProps } from '~/shared/types';
import WidgetWrapper from '../common/WidgetWrapper';
import ItemTeam from '../common/ItemTeam';
import { twMerge } from 'tailwind-merge';

const carouselInterval = 4000;

const Team = ({ header, teams, id, hasBackground = false }: TeamProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel || teams.length < 2) return;

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let intervalId: number | undefined;
    let resumeTimerId: number | undefined;

    const stop = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }
    };

    const start = () => {
      stop();

      if (desktopQuery.matches || reducedMotionQuery.matches || document.hidden) return;

      intervalId = window.setInterval(() => {
        const card = carousel.querySelector<HTMLElement>('[data-team-card]');
        const step = card ? card.offsetWidth + parseFloat(window.getComputedStyle(carousel).gap || '0') : 0;
        const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;

        if (!step || maxScrollLeft <= 0) return;

        const isAtEnd = carousel.scrollLeft >= maxScrollLeft - step / 2;

        carousel.scrollTo({
          left: isAtEnd ? 0 : carousel.scrollLeft + step,
          behavior: 'smooth',
        });
      }, carouselInterval);
    };

    const resumeAfterInteraction = () => {
      if (resumeTimerId !== undefined) window.clearTimeout(resumeTimerId);
      resumeTimerId = window.setTimeout(start, carouselInterval);
    };

    const handleVisibilityChange = () => (document.hidden ? stop() : start());
    const handleMediaChange = () => start();
    const handleFocusIn = () => stop();
    const handleFocusOut = (event: FocusEvent) => {
      if (!carousel.contains(event.relatedTarget as Node | null)) resumeAfterInteraction();
    };

    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', resumeAfterInteraction);
    carousel.addEventListener('pointerdown', stop);
    carousel.addEventListener('pointerup', resumeAfterInteraction);
    carousel.addEventListener('focusin', handleFocusIn);
    carousel.addEventListener('focusout', handleFocusOut);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    desktopQuery.addEventListener('change', handleMediaChange);
    reducedMotionQuery.addEventListener('change', handleMediaChange);
    start();

    return () => {
      stop();
      if (resumeTimerId !== undefined) window.clearTimeout(resumeTimerId);
      carousel.removeEventListener('mouseenter', stop);
      carousel.removeEventListener('mouseleave', resumeAfterInteraction);
      carousel.removeEventListener('pointerdown', stop);
      carousel.removeEventListener('pointerup', resumeAfterInteraction);
      carousel.removeEventListener('focusin', handleFocusIn);
      carousel.removeEventListener('focusout', handleFocusOut);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      desktopQuery.removeEventListener('change', handleMediaChange);
      reducedMotionQuery.removeEventListener('change', handleMediaChange);
    };
  }, [teams.length]);

  return (
    <WidgetWrapper id={id ? id : ''} hasBackground={hasBackground} containerClass="">
      {header && <Headline header={header} titleClass="text-2xl sm:text-3xl" />}
      <div className="flex items-stretch justify-center">
        <div
          ref={carouselRef}
          role="region"
          aria-label="Team members"
          className="flex w-full max-w-full snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dark:text-white lg:grid lg:max-w-none lg:grid-cols-4 lg:justify-items-center lg:overflow-visible lg:px-0 lg:pb-0 xl:gap-5"
        >
          {teams.map(({ name, occupation, image, imageClass, items }, index) => (
            <div
              key={`item-team-${index}`}
              data-team-card
              className="w-[min(82vw,15rem)] shrink-0 snap-center p-2 lg:w-auto lg:shrink lg:snap-none"
            >
              <ItemTeam
                name={name}
                occupation={occupation}
                image={image}
                items={items}
                containerClass=""
                imageClass={twMerge(
                  'h-72 w-full max-w-60 rounded-md bg-gray-500 object-cover shadow-lg dark:bg-slate-700',
                  imageClass,
                )}
                panelClass="relative mt-3 text-center"
                nameClass="mb-1.5 text-xl font-bold"
                occupationClass="mb-7 text-base font-medium capitalize text-gray-600 dark:text-slate-400"
                itemsClass="absolute right-[-10px] top-[-290px] block list-none rounded-md bg-white/70 shadow-[0_0_8px_rgba(0,0,0,0.2)] backdrop-blur-sm dark:bg-white/40"
              />
            </div>
          ))}
        </div>
      </div>
    </WidgetWrapper>
  );
};

export default Team;
