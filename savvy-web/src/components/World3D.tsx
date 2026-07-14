import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type CSSProperties,
} from "react";

type Vec = { x: number; y: number };

const PointerCtx = createContext<Vec>({ x: 0, y: 0 });

export function usePointer3D() {
  return useContext(PointerCtx);
}

/** Global pointer → CSS vars + context for the whole page */
export function World3D({ children }: { children: ReactNode }) {
  const target = useRef<Vec>({ x: 0, y: 0 });
  const current = useRef<Vec>({ x: 0, y: 0 });
  const [vec, setVec] = useState<Vec>({ x: 0, y: 0 });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduced) return;

    const onMove = (e: PointerEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    let raf = 0;
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;
      const { x, y } = current.current;
      document.documentElement.style.setProperty("--px", x.toFixed(4));
      document.documentElement.style.setProperty("--py", y.toFixed(4));
      document.documentElement.style.setProperty("--tilt-x", `${(-y * 6).toFixed(3)}deg`);
      document.documentElement.style.setProperty("--tilt-y", `${(x * 8).toFixed(3)}deg`);
      setVec({ x, y });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <PointerCtx.Provider value={vec}>
      <div className="world-3d">{children}</div>
    </PointerCtx.Provider>
  );
}

/** Local perspective stage — tilts based on pointer within the box */
export function Scene3D({
  children,
  className = "",
  intensity = 1,
  style,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduced) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.setProperty("--sx", cx.toFixed(4));
      el.style.setProperty("--sy", cy.toFixed(4));
      el.style.setProperty("--s-tilt-x", `${(-cy * 10 * intensity).toFixed(3)}deg`);
      el.style.setProperty("--s-tilt-y", `${(cx * 14 * intensity).toFixed(3)}deg`);
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={`scene-3d ${className}`} style={style}>
      <div className="scene-3d-inner">{children}</div>
    </div>
  );
}

export function Depth({
  children,
  z = 0,
  className = "",
  parallax = 1,
}: {
  children: ReactNode;
  z?: number;
  className?: string;
  parallax?: number;
}) {
  return (
    <div
      className={`depth-layer ${className}`}
      style={
        {
          "--dz": `${z}px`,
          "--dp": parallax,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
