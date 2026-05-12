import logo from "../assets/orbkeeper-logo-transparent.png";

export function Header() {
  return (
    <header className="site-header">
      <a className="header-crest" href="#hero" aria-label="ORBKEEPER home">
        <img src={logo} alt="ORBKEEPER logo" />
      </a>
      <nav className="nav-links" aria-label="Primary">
        {["Lore", "Music", "Gatherings", "Keepers", "Relics", "Artifacts"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
      </nav>
    </header>
  );
}
