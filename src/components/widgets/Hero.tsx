import Image from 'next/image';
import { HeroProps } from '~/shared/types';
import CTA from '../common/CTA';
import HeroParallaxContent from './HeroParallaxContent';

const Hero = ({ title, subtitle, tagline, callToAction, callToAction2, image, isImageBackground }: HeroProps) => {
  if (image && isImageBackground) {
    return (
      <section id="heroOne" className="relative isolate overflow-hidden bg-slate-950 text-white">
        <Image
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          loading="eager"
          priority
        />
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(3,10,22,0.72)_0%,rgba(3,10,22,0.52)_45%,rgba(3,10,22,0.34)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(2,7,16,0.78)_0%,rgba(2,7,16,0.58)_45%,rgba(2,7,16,0.42)_100%)]"
          aria-hidden="true"
        />
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
                      linkClass="btn border-white bg-white/95 font-semibold text-slate-950 shadow-lg shadow-black/25 hover:border-amber-100 hover:bg-amber-50 hover:text-slate-950 focus:ring-white focus:ring-offset-slate-900 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:border-amber-100 dark:hover:bg-amber-50 dark:hover:text-slate-950"
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
