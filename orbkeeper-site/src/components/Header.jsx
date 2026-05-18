import logo from "../assets/orbkeeper-logo-transparent.png";

export function Header() {
  return (
    <header className="site-header">
      <a className="header-crest" href="#hero" aria-label="ORBKEEPER home">
        <img src={logo} alt="ORBKEEPER logo" />
      </a>

      <nav className="nav-links" aria-label="Primary">
        {[
          ["Lore", "#lore"],
          ["Music", "#music"],
          ["Gatherings", "#gatherings"],
          ["Keepers", "#keepers"],
          ["Visions", "#relics"],
          ["Artifacts", "#artifacts"],
        ].map(([label, href]) => (
          <a key={label} href={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}