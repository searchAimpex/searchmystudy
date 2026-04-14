import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAssetUrl } from './assetUrl';
import ImageWithSkeleton from './ImageWithSkeleton';

export default function HeroSection({
  name,
  bannerURL,
  flagURL,
  bullet,
  onCtaClick,
}) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const bannerSrc = getAssetUrl(bannerURL);
  const flagSrc = getAssetUrl(flagURL);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-[340px] w-full overflow-hidden sm:min-h-[440px] md:min-h-[500px]"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        <ImageWithSkeleton
          src={bannerSrc}
          alt=""
          className="h-full w-full"
          imgClassName="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-slate-950/55"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/25"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[340px] max-w-6xl flex-col justify-end px-6 pb-12 pt-24 sm:min-h-[440px] sm:pb-14 sm:pt-28 md:min-h-[500px] md:pb-16 md:pt-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-8"
          >
            <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg border border-white/25 bg-white shadow-lg ring-1 ring-black/5 sm:h-[88px] sm:w-[88px]">
              <img
                src={flagSrc || bannerSrc}
                alt={name ? `${name} flag` : 'Country flag'}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Study destination
              </p>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                {name}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
                Independent counselling and admissions support for students planning to study abroad.
              </p>
            </div>
          </motion.div>

          {bullet ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-8 flex max-w-2xl flex-col gap-5 border-l-2 border-white/35 pl-5 sm:pl-6"
            >
              <p className="text-base font-medium leading-relaxed text-white/95 sm:text-lg">
                {bullet}
              </p>
              <motion.button
                type="button"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.99 }}
                onClick={onCtaClick}
                className="inline-flex w-fit items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-md ring-1 ring-black/5 transition hover:bg-slate-50"
              >
                Learn more
                <span className="text-slate-500" aria-hidden>
                  →
                </span>
              </motion.button>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.section>
  );
}
