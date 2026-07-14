import { useRef, useState } from "react";
import { Scene3D } from "./World3D";

const USE_CASES = [
  {
    label: "Slipping straps",
    hint: "Pin them. Own the look. No apology tape.",
    note: "straps → sorted",
    pouch: true,
  },
  {
    label: "Deep necklines",
    hint: "Low plunge. High stakes. Savvy holds the line.",
    note: "neckline locked",
    pouch: false,
  },
  {
    label: "Tricky tops",
    hint: "That one top that never sits right? It does now.",
    note: "top, tamed",
    pouch: true,
  },
  {
    label: "Dresses",
    hint: "Hem, strap, gap — keep the whole silhouette.",
    note: "dress emergency? nah",
    pouch: false,
  },
  {
    label: "Outfit gaps",
    hint: "Close the gap. Keep the chaos fashion-only.",
    note: "gap? gone.",
    pouch: true,
  },
  {
    label: "Fashion emergencies",
    hint: "Wardrobe malfunction? Not on Savvy's watch.",
    note: "crisis averted",
    pouch: false,
  },
];

export function UpgradeSection() {
  const [active, setActive] = useState(0);
  const visual = useRef<HTMLDivElement>(null);
  const current = USE_CASES[active];

  return (
    <section className="upgrade upgrade-3d" id="upgrade">
      <div className="upgrade-heading">
        <h2 className="headline-3d">
          THE HONEST, BOLD
          <br />
          UPGRADE TO FASHION TAPES
        </h2>
      </div>

      <div className="upgrade-layout">
        <Scene3D className="upgrade-visual" intensity={1.5}>
          <div ref={visual} className="upgrade-orbit">
            <div className="orbit-glow" aria-hidden />
            <img className="pouch" src="/assets/products/pouch.png" alt="SAVVY pouch" />
            <img
              className="tube float-3d"
              src={current.pouch ? "/assets/products/tube-front.png" : "/assets/products/tube-back.png"}
              alt=""
              style={{
                transform: `translateZ(80px) translateY(${active * -4}px) rotateY(${active * 8 - 12}deg)`,
              }}
            />
            <span className="upgrade-annotation is-on" style={{ top: "12%", left: "8%" }}>
              {current.note}
            </span>
          </div>
        </Scene3D>

        <div className="use-cases" role="list">
          {USE_CASES.map((u, i) => (
            <button
              key={u.label}
              type="button"
              className={`use-case card-3d ${i === active ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              data-cursor="link"
              role="listitem"
            >
              <div className="use-case-label">{u.label}</div>
              <div className="use-case-hint">{u.hint}</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
