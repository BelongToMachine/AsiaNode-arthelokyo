import Image from 'next/image';
import { HeroProps } from '~/shared/types';
import CTA from '../common/CTA';
import HeroParallaxContent from './HeroParallaxContent';

const Hero = ({ title, subtitle, tagline, callToAction, callToAction2, image, isImageBackground }: HeroProps) => {
  if (image && isImageBackground) {
    return (
      <section id="heroOne" className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          className="hero-image-reveal absolute inset-0 -z-20 h-full w-full object-cover object-center"
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          loading="eager"
          priority
        />
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(12,28,40,0.18)_0%,rgba(12,28,40,0.06)_42%,rgba(12,28,40,0.26)_100%)] dark:bg-[linear-gradient(180deg,rgba(6,16,24,0.28)_0%,rgba(6,16,24,0.10)_42%,rgba(6,16,24,0.32)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[clamp(8rem,18vw,14rem)] overflow-hidden"
          aria-hidden="true"
        >
          <div className="hero-horizon-transition absolute inset-y-0 -left-[6%] w-[112%]" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-4 py-20 sm:px-6 md:py-28">
          <div id="heroContent" className="mx-auto w-full max-w-4xl text-center">
            <HeroParallaxContent distance={220}>
              {tagline && (
                <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100 sm:text-base">
                  {tagline}
                </p>
              )}
              {title && (
                <h1 className="font-heading mx-auto mb-6 max-w-4xl text-4xl font-bold leading-[1.04] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] sm:text-5xl md:text-6xl lg:text-7xl">
                  {title}
                </h1>
              )}
              {subtitle && (
                <div className="mx-auto max-w-2xl">
                  <p className="mb-9 text-lg font-normal leading-relaxed text-slate-100 drop-shadow-[0_1px_12px_rgba(0,0,0,0.35)] sm:text-xl">
                    {subtitle}
                  </p>
                </div>
              )}
            </HeroParallaxContent>
            <HeroParallaxContent distance={92}>
              <div className="mx-auto max-w-2xl">
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                  {callToAction && (
                    <CTA
                      callToAction={callToAction}
                      linkClass="btn border-amber-400 bg-amber-400 font-semibold text-slate-950 shadow-lg shadow-black/20 hover:border-amber-300 hover:bg-amber-300 hover:text-slate-950 focus:ring-amber-300 focus:ring-offset-slate-900 dark:border-amber-300 dark:bg-amber-300 dark:text-slate-950 dark:hover:border-amber-200 dark:hover:bg-amber-200 dark:hover:text-slate-950"
                    />
                  )}
                  {callToAction2 && (
                    <CTA
                      callToAction={callToAction2}
                      linkClass="btn border-slate-100 bg-slate-950/85 font-semibold text-white shadow-lg shadow-black/20 hover:border-white hover:bg-slate-900 hover:text-white focus:ring-white focus:ring-offset-slate-900 dark:border-teal-200 dark:bg-teal-900 dark:text-teal-50 dark:hover:border-teal-100 dark:hover:bg-teal-800 dark:hover:text-white"
                    />
                  )}
                </div>
              </div>
            </HeroParallaxContent>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="heroOne">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="py-12 md:py-20">
          <div className="mx-auto max-w-4xl pb-10 text-center md:pb-16">
            {tagline && (
              <p className="text-base font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-200">
                {tagline}
              </p>
            )}
            {title && (
              <h1 className="leading-tighter font-heading mb-6 text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
                {title}
              </h1>
            )}
            <div className="mx-auto max-w-3xl">
              {subtitle && <p className="mb-6 text-xl font-normal text-gray-600 dark:text-slate-400">{subtitle}</p>}
              <div className="flex max-w-none flex-col flex-nowrap gap-4 px-4 sm:flex-row sm:justify-center">
                {callToAction && <CTA callToAction={callToAction} linkClass="btn btn-primary" />}
                {callToAction2 && <CTA callToAction={callToAction2} linkClass="btn" />}
              </div>
            </div>
          </div>
          {image && (
            <div className="relative m-auto max-w-5xl">
              <Image
                className="mx-auto h-auto w-full rounded-md bg-gray-400 dark:bg-slate-700"
                src={image.src}
                alt={image.alt}
                width={1024}
                height={607}
                sizes="(max-width: 64rem) 100vw, 1024px"
                loading="eager"
                placeholder="blur"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
