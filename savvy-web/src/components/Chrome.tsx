import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CursorMode = "default" | "link" | "drag" | "view";

function isDesktopPointer() {
  // Prefer mouse/trackpad. Don't require hover:hover alone — some Windows
  // touch laptops report odd combo media queries.
  if (window.matchMedia("(pointer: fine)").matches) return true;
  if (window.matchMedia("(hover: hover)").matches && !("ontouchstart" in window)) return true;
  return false;
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const update = () => setEnabled(isDesktopPointer());
    update();
    const fine = window.matchMedia("(pointer: fine)");
    const hover = window.matchMedia("(hover: hover)");
    fine.addEventListener("change", update);
    hover.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      hover.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.body.classList.add("has-custom-cursor");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;
    let visible = false;

    const apply = () => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      if (!visible) {
        el.style.opacity = "1";
        visible = true;
      }
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const tick = () => {
      cx += (x - cx) * 0.35;
      cy += (y - cy) * 0.35;
      apply();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (!t) {
        setMode("default");
        setLabel("");
        return;
      }
      const m = (t.dataset.cursor as CursorMode) || "link";
      setMode(m);
      setLabel(
        t.dataset.cursorLabel ||
          (m === "drag" ? "DRAG" : m === "view" ? "VIEW" : ""),
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    apply();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!ready || !enabled) return null;

  return createPortal(
    <div
      ref={ref}
      className={`savvy-cursor ${mode !== "default" ? `is-${mode}` : ""}`}
      aria-hidden
    >
      <span>{label}</span>
    </div>,
    document.body,
  );
}

export function Grain() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  if (!ready) return null;
  return createPortal(<div className="grain" aria-hidden />, document.body);
}

export function Marquee({
  text,
  reverse = false,
  alt = false,
}: {
  text: string;
  reverse?: boolean;
  alt?: boolean;
}) {
  const items = Array.from({ length: 8 }, (_, i) => (
    <span className="marquee-item" key={i}>
      {text} <span className="dot">✦</span>
    </span>
  ));
  return (
    <div className={`marquee marquee-3d ${reverse ? "reverse" : ""} ${alt ? "alt" : ""}`} aria-hidden>
      <div className="marquee-track">
        {items}
        {items}
      </div>
    </div>
  );
}
