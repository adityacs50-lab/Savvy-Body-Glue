import { ArrowRight } from "lucide-react";
import { Scene3D } from "./World3D";

const STEPS = [
  {
    num: "01",
    title: "ROLL IT",
    copy: "A little bead goes a long way. Dot where your outfit needs backup.",
    img: "/assets/products/tube-front.png",
  },
  {
    num: "02",
    title: "APPLY IT",
    copy: "Press fabric to skin — or fabric to fabric. Hold for a sec. Breathe.",
    img: "/assets/products/pouch.png",
  },
  {
    num: "03",
    title: "OWN THE OUTFIT",
    copy: "Walk in. Sit weird. Dance bad. Your look stays exactly where you left it.",
    img: "/assets/products/tube-back.png",
  },
];

export function HowTo() {
  return (
    <section className="howto howto-3d" id="how-to">
      <div className="howto-heading">
        <p className="eyebrow">The method</p>
        <h2 className="headline-3d">HOW TO SAVVY</h2>
      </div>

      <div className="howto-steps">
        {STEPS.map((s) => (
          <Scene3D key={s.num} className="howto-scene" intensity={1.1}>
            <article className="howto-step howto-step-3d card-3d">
              <div className="howto-num">{s.num}</div>
              <div className="howto-visual">
                <img src={s.img} alt="" className="float-3d" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.copy}</p>
              <ArrowRight className="howto-arrow" size={28} strokeWidth={1.5} aria-hidden />
            </article>
          </Scene3D>
        ))}
      </div>
    </section>
  );
}
