import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Depth, Scene3D } from "./World3D";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (!reduced) {
        gsap.from(".hero-logo-float, .hero-title, .hero-sub, .hero-ctas, .hero-micro", {
          y: 48,
          z: -80,
          opacity: 0,
          duration: 1.1,
          stagger: 0.11,
          ease: "power3.out",
          delay: 0.12,
        });
        gsap.from(".hero-product-stage", {
          z: -200,
          opacity: 0,
          rotateY: -25,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.2,
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-art" aria-hidden>
        <img className="hero-flower one float-3d" src="/assets/illustrations/flower.png" alt="" />
        <img className="hero-flower two float-3d" src="/assets/illustrations/flower.png" alt="" style={{ animationDelay: "-2s" }} />
      </div>

      <div className="hero-content">
        <Depth z={60} parallax={1.4}>
          <img className="hero-logo-float" src="/assets/brand/logo.png" alt="SAVVY" />
        </Depth>
        <Depth z={40} parallax={1.1}>
          <h1 className="hero-title headline-3d">
            YOUR OUTFIT&apos;S
            <br />
            <em>NEW BESTIE.</em>
          </h1>
        </Depth>
        <Depth z={25} parallax={0.8}>
          <p className="hero-sub">
            Lightweight, invisible glue that keeps straps, necklines, and outfits exactly where you want them.
          </p>
        </Depth>
        <Depth z={50} parallax={1.2}>
          <div className="hero-ctas">
            <a href="#shop" className="btn btn-primary btn-3d" data-cursor="link">
              <img className="btn-spark" src="/assets/illustrations/flower.png" alt="" width={16} height={16} />
              Shop Body Glue
            </a>
            <a href="#how-to" className="btn btn-ghost btn-3d" data-cursor="link">
              How To Savvy
            </a>
          </div>
        </Depth>
        <p className="hero-micro">stay put. look unbothered.</p>
      </div>

      <Scene3D className="hero-product-stage" intensity={1.35}>
        <div className="hero-orbit" data-cursor="drag" data-cursor-label="DRAG">
          <div className="orbit-glow" aria-hidden />
          <img className="hero-pouch orbit-pouch" src="/assets/products/pouch.png" alt="" />
          <img className="hero-tube float-3d" src="/assets/products/tube-front.png" alt="SAVVY Body Glue tube" />
          <img className="hero-tube-ghost" src="/assets/products/tube-back.png" alt="" aria-hidden />
        </div>
      </Scene3D>

      <div className="hero-scroll-phrase marquee-3d">
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span className="marquee-item" key={i}>
                EVERYONE SAYS SAVVY <span className="dot">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
