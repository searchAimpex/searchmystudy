import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function DescriptionSection({ html, id = 'country-description' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });
  if (!html || !String(html).trim()) return null;

  return (
    <motion.section
      ref={ref}
      id={id}
      className="border-b border-slate-100 bg-white px-6 py-14 sm:px-10 sm:py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto max-w-3xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Overview
        </p>
        <article
          className="prose prose-slate prose-lg mt-6 max-w-none prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:text-slate-900 prose-headings:tracking-tight prose-p:text-slate-600 prose-p:leading-[1.75] prose-a:font-medium prose-a:text-blue-main prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-800 prose-li:text-slate-600"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </motion.section>
  );
}
