import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const slowReveal = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.19, 1, 0.22, 1] },
  }),
};

export function Section({ eyebrow, title, children, className = "", id }) {
  return (
    <motion.section
      id={id}
      className={`relic-section ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={fadeUp}
      transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="section-heading">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}
