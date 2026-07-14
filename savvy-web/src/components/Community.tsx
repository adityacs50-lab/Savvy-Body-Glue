import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Scene3D } from "./World3D";

const REVIEWS = [
  {
    quote: "Straps stayed. Ego stayed higher.",
    name: "@outfitunbothered",
    img: "/assets/products/tube-front.png",
  },
  {
    quote: "Deep neckline. Zero panic. Savvy gets it.",
    name: "@lowplungeenergy",
    img: "/assets/products/pouch.png",
  },
  {
    quote: "Fashion tape who? We don't know her.",
    name: "@everyone.says.savvy",
    img: "/assets/products/tube-back.png",
  },
];

export function Community() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const cards = el.querySelectorAll<HTMLElement>(".polaroid");
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      cards.forEach((card, i) => {
        const depth = (i + 1) * 18;
        gsap.to(card, {
          x: nx * depth,
          y: ny * depth * 0.55,
          z: depth * 2,
          rotateY: nx * 8,
          rotateX: -ny * 6,
          duration: 0.7,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="community community-3d" id="community">
      <div className="community-heading">
        <p className="eyebrow">The girls</p>
        <h2 className="headline-3d">THE GIRLS GET IT.</h2>
      </div>

      <Scene3D className="polaroid-stage" intensity={0.8}>
        <div ref={stage} className="polaroid-world">
          {REVIEWS.map((r, i) => (
            <article
              className={`polaroid polaroid-3d card-3d p-${i}`}
              key={r.name}
              data-cursor="view"
              data-cursor-label="VIEW"
            >
              <div className="polaroid-photo">
                <img src={r.img} alt="" />
              </div>
              <p className="polaroid-quote">&ldquo;{r.quote}&rdquo;</p>
              <p className="polaroid-name">{r.name}</p>
            </article>
          ))}
        </div>
      </Scene3D>
    </section>
  );
}
