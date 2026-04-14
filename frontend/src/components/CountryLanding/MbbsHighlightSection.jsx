import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAssetUrl } from './assetUrl';

export default function MbbsHighlightSection({ sections, countryName }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.06 });
  const list = Array.isArray(sections)
    ? sections.filter((s) => s?.title || s?.description)
    : [];
  if (!list.length) return null;

  return (
    <motion.section
      ref={ref}
      className="border-b border-slate-200 bg-slate-50 px-6 py-14 sm:px-8 sm:py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-8 sm:px-10 sm:py-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-main">
              MBBS abroad
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              Programme highlights — {countryName || 'this destination'}
            </h2>
          </div>
          <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
            {list.map((block, i) => (
              <motion.div
                key={block._id || i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.05 * i, duration: 0.4 }}
                className="bg-white p-6 sm:p-8"
              >
                {block.url ? (
                  <div className="mb-5 aspect-video w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                    <img
                      src={getAssetUrl(block.url)}
                      alt={block.title || ''}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                {block.title ? (
                  <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{block.title}</h3>
                ) : null}
                {block.description ? (
                  <div
                    className="prose prose-sm prose-slate mt-3 max-w-none prose-p:leading-relaxed prose-p:text-slate-600"
                    dangerouslySetInnerHTML={{ __html: block.description }}
                  />
                ) : null}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
