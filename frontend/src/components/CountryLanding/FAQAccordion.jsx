import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ faqs }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.08 });
  const list = Array.isArray(faqs) ? faqs.filter((f) => f?.question || f?.answer) : [];
  const [openIndex, setOpenIndex] = useState(null);

  if (!list.length) return null;

  return (
    <motion.section
      ref={ref}
      className="border-t border-slate-200 bg-slate-50 px-6 py-16 sm:px-8 sm:py-20"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto max-w-3xl">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          Support
        </p>
        <h2 className="mt-2 text-center text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          Frequently asked questions
        </h2>
        <div className="mt-10 divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {list.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 sm:px-6 sm:py-5"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-[15px] font-medium leading-snug text-slate-900 sm:text-base">
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-600"
                    aria-hidden
                  >
                    <ChevronDown className="h-4 w-4" strokeWidth={2} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden border-t border-slate-100"
                    >
                      <div className="px-5 py-4 text-[15px] leading-relaxed text-slate-600 sm:px-6 sm:py-5">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
