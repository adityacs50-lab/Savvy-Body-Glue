import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Depth, Scene3D } from "./World3D";

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const drag = useRef(0);
  const scrollAngle = useRef(0);

  useEffect(() => {
    const el = root.current;
    const tube = inner.current;
    if (!el || !tube) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      gsap.set(tube, { rotateY: scrollAngle.current + drag.current });
    };

    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.to({ a: 0 }, {
          a: 360,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            onUpdate: (self) => {
              scrollAngle.current = self.progress * 360;
              apply();
            },
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const startX = e.clientX;
    const startDrag = drag.current;
    const tube = inner.current;

    const onMove = (ev: PointerEvent) => {
      drag.current = startDrag + (ev.clientX - startX) * 0.5;
      if (tube) gsap.set(tube, { rotateY: scrollAngle.current + drag.current });
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <section className="showcase showcase-3d" ref={root} aria-label="3D product showcase">
      <Depth z={30} parallax={0.6} className="showcase-copy">
        <p className="eyebrow">The product · 3D</p>
        <h2 className="headline-3d">Body Glue, but make it fashion.</h2>
        <p className="showcase-hint">Drag · scroll spins the tube</p>
      </Depth>

      <Scene3D className="showcase-stage" intensity={1.6}>
        <div
          className="product-orbit"
          data-cursor="drag"
          data-cursor-label="DRAG"
          onPointerDown={onPointerDown}
        >
          <div className="orbit-glow" aria-hidden />
          <img className="orbit-pouch" src="/assets/products/pouch.png" alt="" draggable={false} />
          <div className="product-orbit-inner" ref={inner}>
            <div className="orbit-face front">
              <img src="/assets/products/tube-front.png" alt="SAVVY tube front" draggable={false} />
            </div>
            <div className="orbit-face back">
              <img src="/assets/products/tube-back.png" alt="SAVVY tube back" draggable={false} />
            </div>
          </div>
        </div>
      </Scene3D>

      <p className="showcase-side-text">15ml / 0.50oz ✦ savvyglue.com</p>
    </section>
  );
}
