import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check } from 'lucide-react';

function normalizeItems(raw) {
  if (!raw) return [];
  if (Array.isArray(raw)) {
    return raw.map((x) => (typeof x === 'string' ? x.trim() : String(x || '').trim())).filter(Boolean);
  }
  return [];
}

export default function EligibilityList({ items }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const list = normalizeItems(items);
  if (!list.length) return null;

  return (
    <motion.section
      ref={ref}
      className="border-b border-slate-100 bg-white px-6 py-14 sm:px-10 sm:py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-3xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Requirements
        </p>
        <h2 className="mt-2 text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Eligibility criteria
        </h2>
        <ul className="mt-10 space-y-0 divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
          {list.map((line, i) => (
            <motion.li
              key={`${i}-${line.slice(0, 24)}`}
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.04 * i, duration: 0.3 }}
              className="flex items-start gap-4 px-5 py-4 first:rounded-t-xl last:rounded-b-xl"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-main/10 text-blue-main">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
              </span>
              <span className="text-[15px] leading-relaxed text-slate-700">{line}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
