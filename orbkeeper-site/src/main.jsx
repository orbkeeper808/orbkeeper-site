import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Atmosphere, CursorOrb } from "./components/Atmosphere";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section, slowReveal } from "./components/Section";
import { gatherings, lore, members, merch, releases, relics } from "./data/siteData";
import flyer2 from "./assets/orbkeeper-flyer2.jpg";
import flyer1 from "./assets/orbkeeper-flyer.jpg";
import logo from "./assets/orbkeeper-logo-transparent.png";
import "./styles.css";

function Lore() {
  return (
    <Section id="lore" eyebrow="Lore" title="The Chronicle" className="lore-section">
      <div className="lore-grid">
        {lore.map((item, i) => (
          <motion.article className="lore-card" key={item.title} custom={i} variants={slowReveal} whileHover={{ y: -8, scale: 1.015 }}>
            <span className="card-number">0{i + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Music() {
  const [playing, setPlaying] = useState(null);

  return (
    <Section id="music" eyebrow="Resonances" title="Tsöngs of the Rite">
      <div className="music-grid">
        {releases.map((release, i) => (
          <motion.article className={`release-card ${playing === i ? "is-playing" : ""}`} key={release.title} custom={i} variants={slowReveal}>
            <div className="vinyl-relic"><span /></div>
            <div className="release-copy">
              <p className="section-eyebrow">{release.type}</p>
              <h3>{release.title}</h3>
              <ol>{release.tracks.map((track) => <li key={track}>{track}</li>)}</ol>
              <div className="embedded-player" aria-label={`${release.title} music player`}>
                <span className="player-orb" />
                <div className="frequency-bars" aria-hidden="true">
                  {Array.from({ length: 18 }).map((_, bar) => (
                    <i key={bar} style={{ "--bar": `${22 + ((bar * 17) % 58)}%` }} />
                  ))}
                </div>
              </div>
              <button className="rite-button small" type="button" onClick={() => setPlaying(playing === i ? null : i)}>
                {playing === i ? "Let It Fade" : "Awaken Preview"}
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function useCountdown(date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const diff = Math.max(0, new Date(date).getTime() - now.getTime());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  }, [date, now]);
}

function Gatherings() {
  const countdown = useCountdown(gatherings[0].date);

  return (
    <Section id="gatherings" eyebrow="The Rite" title="Gatherings Where The Veil Thins" className="gatherings-section">
      <div className="countdown">
        {Object.entries(countdown).map(([label, value]) => (
          <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>
        ))}
      </div>
      <div className="gathering-list">
        {gatherings.map((event, i) => (
          <motion.article className="gathering-card" key={event.place} custom={i} variants={slowReveal} whileHover={{ x: 8 }}>
            <time dateTime={event.date}>{event.day}</time>
            <div><h3>{event.place}</h3><p>{event.city}</p></div>
            <a className="rite-button small" href="#contact">Tickets</a>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Band() {
  return (
    <Section id="keepers" eyebrow="The Keepers" title="Guarduans of the Orb">
      <div className="member-grid">
        {members.map(([name, role, text], i) => (
          <motion.article className="member-card" key={name} custom={i} variants={slowReveal} whileHover={{ y: -10 }}>
            <div className="portrait-orb">{name.slice(0, 1)}</div>
            <h3>{name}</h3>
            <h4>{role}</h4>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Visions() {
  return (
    <Section id="visions" eyebrow="Recovered Visions" title="Media And Relics From The Gathering" className="media-section">
      <div className="relic-grid">
        {relics.map(([title, text], i) => (
          <motion.article className={`vision-card vision-${i + 1}`} key={title} custom={i} variants={slowReveal} whileHover={{ scale: 1.025 }}>
            <div className="vision-image">{i === 0 && <img src={flyer1} alt="ORBKEEPER fantasy flyer" />}</div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>
      <div className="video-relic">
        <div className="play-sigil">▶</div>
        <div>
          <p className="section-eyebrow">Video Relic</p>
          <h3>Live Invocation Placeholder</h3>
          <p>Swap this frame for a YouTube or Vimeo embed when the first gathering footage is ready. Test</p>
        </div>
      </div>
    </Section>
  );
}

function Merch() {
  return (
    <Section id="artifacts" eyebrow="Artifacts" title="The Orbkeeper Vault">
      <div className="artifact-grid">
        {merch.map(([title, text], i) => (
          <motion.article className="artifact-card" key={title} custom={i} variants={slowReveal} whileHover={{ y: -8 }}>
            <div className={`artifact-mark mark-${i}`} />
            <h3>{title}</h3>
            <p>{text}</p>
            <button className="ledger-button" type="button">Reserve</button>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <img src={logo} alt="ORBKEEPER logo" />
      <p>The Veil Remains Thin</p>
      <form onSubmit={(event) => event.preventDefault()}>
        <input type="email" placeholder="keeper@example.com" aria-label="Email address" />
        <button type="submit">Send Signal</button>
      </form>
      <small>The Orb Watches</small>
    </footer>
  );
}

function App() {
  return (
    <>
      <Atmosphere />
      <CursorOrb />
      <Header />
      <main>
        <Hero />
        <Lore />
        <Music />
        <Gatherings />
        <Band />
        <Relics />
        <Merch />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
