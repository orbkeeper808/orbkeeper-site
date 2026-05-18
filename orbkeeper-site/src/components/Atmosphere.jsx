import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Atmosphere() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <div className="smoke smoke-a" aria-hidden="true" />
      <div className="smoke smoke-b" aria-hidden="true" />
      <div className="dust" aria-hidden="true">
        {Array.from({ length: 34 }).map((_, i) => (
          <i
            key={i}
            style={{
              "--x": `${(i * 37) % 100}%`,
              "--d": `${8 + (i % 9)}s`,
              "--delay": `${-(i * 0.63)}s`,
              "--size": `${2 + (i % 4)}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}

export function CursorOrb() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <motion.div
      className="cursor-orb"
      animate={{ x: pos.x - 18, y: pos.y - 18 }}
      transition={{ type: "spring", stiffness: 900, damping: 48, mass: 0.18 }}
      aria-hidden="true"
    />
  );
}
