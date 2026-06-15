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
import flyer3 from "./assets/heavy-happening-flyer.jpg";
import flyer4 from "./assets/psychedelic-doom-flyer.jpg";
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
  return (
    <Section id="music" eyebrow="Resonances" title="Tsöngs of the Rite">
      <div className="music-grid">
        <iframe data-testid="embed-iframe"
          style="border-radius:12px"
          src="https://open.spotify.com/embed/album/12DAfDvouh39Z4pBlpH8eR?utm_source=generator&theme=0&si=36c877e5698d4b8f"
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy">
        </iframe>
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
  if (gatherings.length === 0) {
    return (
      <Section
        id="gatherings"
        eyebrow="The Rite"
        title="Gatherings Where The Veil Thins"
        className="gatherings-section"
      >
        <div className="gathering-empty">
          <h3>No Gatherings Announced</h3>
          <p>
            The Orb remains watchful. Future Rites will be revealed when the
            Veil permits.
            </p>
        </div>
      </Section>
    );
  }

  const countdown = useCountdown(gatherings[0].date);

  return (
    <Section
      id="gatherings"
      eyebrow="The Rite"
      title="Gatherings Where The Veil Thins"
      className="gatherings-section"
    >
      <div className="countdown">
        {Object.entries(countdown).map(([label, value]) => (
          <div key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="gathering-list">
        {gatherings.map((event, i) => (
          <motion.article
            className="gathering-card"
            key={event.place}
            custom={i}
            variants={slowReveal}
            whileHover={{ x: 8 }}
          >
            <time dateTime={event.date}>{event.day}</time>
            <div>
              <h3>{event.place}</h3>
              <p>{event.city}</p>
            </div>

            <a className="rite-button small" href="#contact">
              Tickets
            </a>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Band() {
  return (
    <Section id="keepers" eyebrow="The Keepers" title="Guardians of the Orb">
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

const relicImages = [flyer1, flyer4, flyer3];

const videoRelics = [
  {
    title: "The First Rite",
    description:
      "A recovered vision from the Circle's first gathering.",
    youtubeId: "bRNYl8g2BA0",
  },
];

function Relics() {
  return (
    <Section
      id="relics"
      eyebrow="Recovered Visions"
      title="Media And Relics From The Gathering"
      className="media-section"
    >
      <div className="relic-grid">
        {relics.map(([title, text], i) => (
          <motion.article
            className={`vision-card vision-${i + 1}`}
            key={title}
            custom={i}
            variants={slowReveal}
            whileHover={{ scale: 1.025 }}
          >
            <div className="vision-image">
              {relicImages[i] && <img src={relicImages[i]} alt={title} />}
            </div>

            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>
        ))}
      </div>

      <div className="video-relics">
  {videoRelics.map((video) => (
    <div className="video-relic" key={video.title}>
      <div className="video-header">
        <p className="section-eyebrow">Recovered Vision</p>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>

      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  ))}
</div>
    </Section>
  );
}

function Merch() {
  return (
    <Section id="artifacts" eyebrow="Artifacts" title="The Orbkeeper Vault">
      <div className="artifact-grid">
        {merch.map((item, i) => (
          <motion.article
            className="artifact-card"
            key={item.title}
            custom={i}
            variants={slowReveal}
            whileHover={{ y: -8 }}
          >
            {item.image ? (
              <img
                className="artifact-image"
                src={item.image}
                alt={item.title}
              />
            ) : (
              <div className={`artifact-mark mark-${i}`} />
            )}

            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <a
              className="ledger-button"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acquire Artifact
            </a>
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
