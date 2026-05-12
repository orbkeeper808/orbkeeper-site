import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "../assets/orbkeeper-logo-transparent.png";
import { phrases } from "../data/siteData";

export function Hero() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 170]);
  const glow = useSpring(useTransform(scrollYProgress, [0, 0.25], [1, 0.55]), {
    stiffness: 80,
    damping: 24,
  });

  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % phrases.length), 2600);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="hero" id="hero">
      <motion.div className="hero-landscape" style={{ y }} aria-hidden="true" />
      <motion.div className="orb-light" style={{ opacity: glow }} aria-hidden="true" />
      <motion.div
        className="hero-sigil"
        initial={{ opacity: 0, scale: 0.86, filter: "blur(18px) brightness(0.7)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
        transition={{ duration: 1.45, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="sigil-ring" />
        <img src={logo} alt="ORBKEEPER logo" />
      </motion.div>
      <motion.div
        className="hero-copy"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.55 }}
      >
        <p className="hero-tag">Fantasy Doom Metal</p>
        <div className="phrase-window" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.span
              key={phrases[active]}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.55 }}
            >
              {phrases[active]}
            </motion.span>
          </AnimatePresence>
        </div>
        <div className="hero-actions">
          <a className="rite-button primary" href="#lore">Enter the Rite</a>
          <a className="rite-button" href="#music">Listen</a>
          <a className="rite-button" href="#gatherings">Gatherings</a>
        </div>
      </motion.div>
    </section>
  );
}
