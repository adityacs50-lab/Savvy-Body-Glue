import { useState } from "react";

const FAQS = [
  {
    q: "How do I use it?",
    a: "Apply a small amount where you need hold — skin-to-fabric or fabric-to-fabric. Press gently, wait a moment, then style as usual. A little Savvy goes a long way.",
  },
  {
    q: "What is Savvy Body Glue?",
    a: "Savvy is a lightweight, invisible fashion adhesive that helps keep straps, necklines, tops, dresses, and outfits in place — so the look stays where you want it.",
  },
  {
    q: "Can I use it on fabric?",
    a: "Yes — Savvy is made for fashion moments: straps, necklines, tricky tops, dresses, and outfit gaps. Always spot-check delicate fabrics first if you're unsure.",
  },
  {
    q: "Does it leave marks?",
    a: "Savvy is designed to stay invisible on skin and under clothing when used as directed. Remove gently and wipe any leftover residue if needed.",
  },
  {
    q: "How do I remove Savvy?",
    a: "Peel fabric away slowly. Softly roll or wipe remaining adhesive from skin. Clean fabric according to its care label.",
  },
  {
    q: "How much product do I get?",
    a: "Each tube is 15ml / 0.50oz — sized for real-life fashion emergencies and everyday outfit insurance.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <p className="eyebrow">Questions</p>
        <h2>FAQ</h2>
        <div>
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item ${isOpen ? "is-open" : ""}`} key={item.q}>
                <button
                  type="button"
                  className="faq-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-btn-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                  data-cursor="link"
                >
                  {item.q}
                  <span className="faq-icon" aria-hidden />
                </button>
                <div
                  className="faq-panel"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                >
                  <div className="faq-panel-inner">
                    <p className="faq-answer">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
