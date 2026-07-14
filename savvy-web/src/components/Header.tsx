import { ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Shop", href: "#shop" },
  { label: "How To Savvy", href: "#how-to" },
  { label: "Blog", href: "#editorial" },
  { label: "Career", href: "#footer" },
  { label: "About Us", href: "#footer" },
  { label: "Membership", href: "#footer" },
  { label: "Model For Us", href: "#footer" },
];

const SOCIALS = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "TikTok", href: "#" },
  { label: "YouTube", href: "#" },
];

export function Header({ cartCount }: { cartCount: number }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-left">
          <button
            className={`menu-trigger ${open ? "is-open" : ""}`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            data-cursor="link"
          >
            <span />
            <span />
            <span />
          </button>
          <nav className="desktop-nav-links" aria-label="Primary">
            {NAV_LINKS.slice(0, 4).map((l) => (
              <a key={l.label} href={l.href} className="nav-link" data-cursor="link">
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <a href="#top" className="nav-logo" data-cursor="link" aria-label="SAVVY home">
          <img src="/assets/brand/logo.png" alt="SAVVY" />
        </a>

        <div className="nav-right">
          <button className="nav-icon-btn" aria-label="Account" data-cursor="link">
            <User size={18} strokeWidth={1.75} />
          </button>
          <a href="#shop" className="nav-icon-btn" aria-label={`Cart, ${cartCount} items`} data-cursor="link">
            <ShoppingBag size={18} strokeWidth={1.75} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "var(--savvy-pink)",
                }}
                aria-hidden
              />
            )}
          </a>
        </div>
      </header>

      <div className={`menu-overlay ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Site menu">
        <img className="menu-overlay-logo" src="/assets/brand/logo.png" alt="" />
        <nav className="menu-links" aria-label="Full menu">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={close} data-cursor="link">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="menu-socials">
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} data-cursor="link">
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
