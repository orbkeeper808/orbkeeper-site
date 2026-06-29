import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Atmosphere, CursorOrb } from "./components/Atmosphere";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Section, slowReveal } from "./components/Section";
import { gatherings, lore, members, merch, releases, relics } from "./data/siteData";
import flyer1 from "./assets/orbkeeper-flyer.jpg";
import flyer3 from "./assets/heavy-happening-flyer.jpg";
import flyer4 from "./assets/psychedelic-doom-flyer.jpg";
import logo from "./assets/orbkeeper-logo-transparent.png";
import "./styles.css";



function OrbInterior() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const handleMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    let timeoutId;
    let fadeTimeoutId;

    const pulseOrb = () => {
      setPulse(true);
      document.body.classList.add("orb-pulse");

      fadeTimeoutId = window.setTimeout(() => {
        setPulse(false);
        document.body.classList.remove("orb-pulse");
      }, 2600);

      timeoutId = window.setTimeout(
        pulseOrb,
        45000 + Math.random() * 45000
      );
    };

    timeoutId = window.setTimeout(pulseOrb, 12000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(fadeTimeoutId);
      document.body.classList.remove("orb-pulse");
    };
  }, []);

  return (
    <div
      className={`orb-interior ${pulse ? "is-pulsing" : ""}`}
      style={{
        "--orb-x": `${position.x}`,
        "--orb-y": `${position.y}`,
      }}
      aria-hidden="true"
    >
      <div className="orb-depth orb-depth-back">
        <div className="orb-depth-inner" />
      </div>

      <div className="orb-depth orb-depth-front">
        <div className="orb-depth-inner" />
      </div>

      <div className="orb-caustics" />
    </div>
  );
}

const dividerRunes = ["ᛉ", "ᛟ", "ᛜ", "ᚱ", "ᛒ", "ᚢ"];

const getRune = (index) => dividerRunes[index % dividerRunes.length];

const runes = [
  { rune: "ᛉ", runeIndex: 0 },
  { rune: "ᛟ", runeIndex: 1 },
  { rune: "ᛜ", runeIndex: 2 },
  { rune: "ᚱ", runeIndex: 3 },
  { rune: "ᛒ", runeIndex: 4 },
];

function GutterRune({ rune, runeIndex, index, activeRune }) {
  const hiddenRelicLink = "https://vault.orbkeeper.com/products/veilwalkers";
  const isAwake = activeRune === index;

  return (
    <div className="gutter-rune-wrap" aria-hidden="true">
      <button
        type="button"
        className={`gutter-rune rune-${runeIndex} ${
          isAwake ? "rune-awake" : ""
        }`}
        onClick={() => {
          if (!isAwake) return;
          window.open(hiddenRelicLink, "_blank", "noopener,noreferrer");
        }}
        aria-label="Open hidden relic"
      >
        {rune}
      </button>
    </div>
  );
}

function useRuneAwakening() {
  const [activeRune, setActiveRune] = useState(null);

  useEffect(() => {
    let timeoutId;
    let fadeTimeoutId;

    const awakenRune = () => {
      const index = Math.floor(Math.random() * runes.length);

      setActiveRune(index);
      document.body.classList.add("rune-stirring");

      fadeTimeoutId = window.setTimeout(() => {
        setActiveRune(null);
        document.body.classList.remove("rune-stirring");
      }, 2200);

      timeoutId = window.setTimeout(
        awakenRune,
        15000 + Math.random() * 30000
      );
    };

    timeoutId = window.setTimeout(awakenRune, 6000);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearTimeout(fadeTimeoutId);
      document.body.classList.remove("rune-stirring");
    };
  }, []);

  return activeRune;
}

function Lore() {
  return (
    <Section id="lore" eyebrow="Lore" title="The Chronicle" className="lore-section">
      <div className="lore-grid">
        {lore.map((item, i) => (
          <motion.article
            className="lore-card premium-card"
            key={item.title}
            custom={i}
            variants={slowReveal}
            whileHover={{ y: -4 }}
            
          >
            <span className="card-number">0{i + 1}</span>
            <h3>{item.title}</h3>
            <div className="lore-divider" data-rune={getRune(i)} />
            <p>{item.text}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

function Music() {
  const release = releases[0];

  return (
    <Section id="music" eyebrow="Resonances" title="Tsöngs of the Rite">
      <div className="spotify-section">
        <div className="music-copy">
          <p className="section-eyebrow">{release.type}</p>
          <h3>{release.title}</h3>
          <div className="lore-divider" />
          {release.description && <p>{release.description}</p>}
        </div>

        <div className="spotify-embed">
          <iframe
            src={release.spotifyEmbed}
            width="100%"
            height="552"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title={`${release.title} Spotify Player`}
          />
        </div>
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
        <div className="gathering-empty premium-card">
          
          <h3>No Gatherings Announced</h3>
          <p>
            The Orb remains watchful. The path to the next Rite is still unfolding. Stay vigilant, for when the time comes, the call will echo across realms, and the Circle will gather once more.
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
            className="gathering-card premium-card"
            key={event.place}
            custom={i}
            variants={slowReveal}
            whileHover={{ x: 4 }}
            
          >
            <time dateTime={event.date}>{event.day}</time>
            <div>
              <h3>{event.place}</h3>
              <p>{event.city}</p>
            </div>

            <a className="rite-button small premium-button" href="#contact">
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
          <motion.article
            className="member-card premium-card"
            key={name}
            custom={i}
            variants={slowReveal}
            whileHover={{ y: -4 }}
            
          >
            <div className="portrait-orb">{name.slice(0, 1)}</div>
            <h3>{name}</h3>
            <h4>{role}</h4>
            <div className="keeper-divider" data-rune={getRune(i)} />
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
    description: "A recovered vision from the Circle's first gathering.",
    youtubeId: "bRNYl8g2BA0",
  },
];

function Media() {
  return (
    <Section
      id="artifacts"
      eyebrow="Recovered Fragments"
      title="Artifacts From Past Rites"
      className="media-section"
    >
      <div className="relic-grid">
        {relics.map(([title, text], i) => (
          <motion.article
            className={`vision-card vision-${i + 1} premium-card`}
            key={title}
            custom={i}
            variants={slowReveal}
            whileHover={{ y: -4 }}
            
          >
            <div className="vision-image">
              {relicImages[i] && <img src={relicImages[i]} alt={title} />}
            </div>

            <h3>{title}</h3>
            <div className="lore-divider" />
            <p>{text}</p>
          </motion.article>
        ))}
      </div>

      <div className="video-relics">
        {videoRelics.map((video) => (
          <div className="video-relic premium-card" key={video.title}>
            <div className="video-header">
              <p className="section-eyebrow">Recovered Vision</p>
              <h3>{video.title}</h3>
              <div className="lore-divider" />
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
    <Section id="relics" eyebrow="Relics" title="The Orbkeeper Vault">
      <div className="artifact-grid">
        {merch.map((item, i) => (
          <motion.article
            className="artifact-card premium-card"
            key={item.title}
            custom={i}
            variants={slowReveal}
            whileHover={{ y: -4 }}
            
          >
            {item.image ? (
              <img className="artifact-image" src={item.image} alt={item.title} />
            ) : (
              <div className={`artifact-mark mark-${i}`} />
            )}

            <h3>{item.title}</h3>
            <div className="keeper-divider" />
            <p>{item.description}</p>

            <a
              className="ledger-button premium-button"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Acquire Relic
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
      <div className="footer-divider" aria-hidden="true" />

      <img src={logo} alt="ORBKEEPER logo" />

      <p>The Veil Remains Thin</p>

      <div className="footer-divider-wrap">
        <div className="lore-divider" />
      </div>

      <div className="footer-epilogue">
        <span>Those who hear the call will know when the path opens again.</span>
      </div>

      <small>© Orbkeeper</small>
    </footer>
  );
}

function App() {
  const activeRune = useRuneAwakening();

  return (
    <>
      <Atmosphere />
      <OrbInterior />
      <CursorOrb />
      <Header />

      <main>
        <Hero />

        <GutterRune {...runes[0]} index={0} activeRune={activeRune} />

        <Lore />

        <GutterRune {...runes[1]} index={1} activeRune={activeRune} />

        <Music />

        <GutterRune {...runes[2]} index={2} activeRune={activeRune} />

        <Gatherings />

        <GutterRune {...runes[3]} index={3} activeRune={activeRune} />

        <Band />

        <GutterRune {...runes[4]} index={4} activeRune={activeRune} />

        <Media />
        <Merch />
      </main>

      <Footer />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);