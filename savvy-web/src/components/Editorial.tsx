import { Scene3D } from "./World3D";

const ISSUES = [
  {
    issue: "ISSUE 01",
    title: "THE TOP IS CUTE.\nTHE STRAP IS NOT.",
    img: "/assets/products/tube-front.png",
    meta: "Style notes",
  },
  {
    issue: "ISSUE 02",
    title: "FASHION TAPE?\nWE NEED TO TALK.",
    img: "/assets/products/pouch.png",
    meta: "Editorial",
  },
  {
    issue: "ISSUE 03",
    title: "HOW TO SURVIVE\nA DEEP NECKLINE.",
    img: "/assets/products/tube-back.png",
    meta: "Field guide",
  },
];

export function Editorial() {
  return (
    <section className="editorial editorial-3d" id="editorial">
      <div className="editorial-heading">
        <p className="eyebrow">From the desk of</p>
        <h2 className="headline-3d">SAVVY SAYS</h2>
      </div>

      <div className="editorial-grid">
        {ISSUES.map((item) => (
          <Scene3D key={item.issue} className="mag-scene" intensity={1.2}>
            <a href="#shop" className="mag-card mag-card-3d card-3d" data-cursor="link">
              <span className="mag-issue">{item.issue}</span>
              <img src={item.img} alt="" className="float-3d" />
              <p className="mag-meta">{item.meta}</p>
              <h3>
                {item.title.split("\n").map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h3>
            </a>
          </Scene3D>
        ))}
      </div>
    </section>
  );
}
