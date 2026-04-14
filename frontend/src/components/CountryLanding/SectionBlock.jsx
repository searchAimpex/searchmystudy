import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { getAssetUrl } from './assetUrl';

export default function SectionBlock({ section, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const reverse = index % 2 === 1;
  const title = section?.title;
  const body = section?.description;
  const imageUrl = section?.url;
  const hasImage = Boolean(imageUrl);

  if (!title && !body) return null;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.35) }}
      className="border-b border-slate-100 bg-white px-6 py-14 sm:px-10 sm:py-16"
    >
      <div
        className={
          hasImage
            ? `container mx-auto flex max-w-6xl flex-col gap-10 lg:gap-14 ${
                reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } lg:items-start`
            : 'container mx-auto max-w-3xl'
        }
      >
        <div
          className={`min-w-0 ${
            hasImage ? 'flex-1 rounded-xl border border-slate-200 bg-slate-50/40 p-6 sm:p-8 lg:p-10' : ''
          }`}
        >
          {title ? (
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {title}
            </h2>
          ) : null}
          {body ? (
            <div
              className={`prose prose-slate max-w-none prose-p:leading-[1.75] prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-blue-main prose-li:text-slate-600 ${
                title ? 'mt-5' : ''
              }`}
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : null}
        </div>

        {hasImage ? (
          <div className="flex flex-1 justify-center lg:justify-center lg:pt-2">
            <div className="aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm transition-shadow duration-300 hover:shadow-md">
              <img
                src={getAssetUrl(imageUrl)}
                alt={title || ''}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}
