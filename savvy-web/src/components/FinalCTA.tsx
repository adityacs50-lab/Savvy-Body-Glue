import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Depth, Scene3D } from "./World3D";

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(".final-tube", {
        y: 140,
        z: -200,
        rotateY: -40,
        opacity: 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 70%",
          end: "center center",
          scrub: 1,
        },
      });
      gsap.from(".final-logo", {
        scale: 0.8,
        z: -120,
        opacity: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 75%",
          end: "center center",
          scrub: 1,
        },
      });
      gsap.from(".final-line", {
        y: 50,
        z: -60,
        opacity: 0,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 60%",
          end: "center 45%",
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta final-cta-3d" ref={root} id="get-savvy">
      <Scene3D intensity={1.2} className="final-scene">
        <Depth z={40}>
          <img className="final-logo" src="/assets/brand/logo.png" alt="SAVVY" />
        </Depth>
        <Depth z={90} parallax={1.5}>
          <img className="final-tube float-3d" src="/assets/products/tube-back.png" alt="SAVVY Body Glue" />
        </Depth>
        <Depth z={55}>
          <h2 className="final-title headline-3d">
            <span className="final-line">WEAR</span>
            <br />
            <span className="final-line">THE DAMN</span>
            <br />
            <span className="final-line">OUTFIT.</span>
          </h2>
        </Depth>
        <Depth z={70}>
          <p className="final-sub">Savvy keeps it where you want it.</p>
        </Depth>
        <a href="#shop" className="btn btn-primary btn-3d" data-cursor="link">
          <img className="btn-spark" src="/assets/illustrations/flower.png" alt="" width={16} height={16} />
          Get Savvy
        </a>
      </Scene3D>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <img className="footer-logo headline-3d" src="/assets/brand/logo.png" alt="SAVVY" />

      <div className="footer-grid">
        <div className="footer-col">
          <h4>Shop</h4>
          <a href="#shop" data-cursor="link">Body Glue</a>
          <a href="#how-to" data-cursor="link">How To Savvy</a>
          <a href="#upgrade" data-cursor="link">The Upgrade</a>
        </div>
        <div className="footer-col">
          <h4>Savvy</h4>
          <a href="#footer" data-cursor="link">About</a>
          <a href="#editorial" data-cursor="link">Blog</a>
          <a href="#footer" data-cursor="link">Career</a>
          <a href="#footer" data-cursor="link">Model For Us</a>
        </div>
        <div className="footer-col">
          <h4>Help</h4>
          <a href="#faq" data-cursor="link">FAQ</a>
          <a href="#footer" data-cursor="link">Contact</a>
          <a href="#footer" data-cursor="link">Shipping</a>
          <a href="#footer" data-cursor="link">Returns</a>
        </div>
        <div className="footer-col">
          <h4>Social</h4>
          <a href="#" data-cursor="link">Instagram</a>
          <a href="#" data-cursor="link">Pinterest</a>
          <a href="#" data-cursor="link">TikTok</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-tagline">KEEP IT TOGETHER. OR DON&apos;T. 💋</p>
        <p className="footer-copy">© {new Date().getFullYear()} SAVVY. All rights reserved.</p>
      </div>
    </footer>
  );
}
