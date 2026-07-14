import { useCallback, useState } from "react";
import { Cursor, Grain, Marquee } from "./components/Chrome";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductShowcase } from "./components/ProductShowcase";
import { ProductSection } from "./components/ProductSection";
import { UpgradeSection } from "./components/UpgradeSection";
import { HowTo } from "./components/HowTo";
import { FAQ } from "./components/FAQ";
import { Community } from "./components/Community";
import { Editorial } from "./components/Editorial";
import { FinalCTA, Footer } from "./components/FinalCTA";
import { World3D } from "./components/World3D";
import "./styles/world3d.css";
import "./App.css";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [toast, setToast] = useState("");
  const [toastOn, setToastOn] = useState(false);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setToastOn(true);
    window.setTimeout(() => setToastOn(false), 2200);
  }, []);

  const onAdd = useCallback(
    (qty: number) => {
      setCartCount((c) => c + qty);
      flash(`Added ${qty} to bag`);
    },
    [flash],
  );

  const onBuy = useCallback(
    (qty: number) => {
      setCartCount((c) => c + qty);
      flash("Let's get you Savvy");
    },
    [flash],
  );

  return (
    <>
      <Grain />
      <Cursor />
      <World3D>
        <Header cartCount={cartCount} />
        <main>
          <Hero />
          <Marquee text="EVERYONE SAYS SAVVY" />
          <ProductShowcase />
          <Marquee text="SAVVY BODY GLUE ✦ STAY PUT ✦ WEAR THE TOP" reverse alt />
          <ProductSection onAdd={onAdd} onBuy={onBuy} />
          <UpgradeSection />
          <HowTo />
          <Marquee text="SAVVY BODY GLUE ✦ STAY PUT ✦ WEAR THE TOP" />
          <FAQ />
          <Community />
          <Editorial />
          <FinalCTA />
        </main>
        <Footer />
        <div className={`cart-toast ${toastOn ? "is-visible" : ""}`} role="status" aria-live="polite">
          {toast}
        </div>
      </World3D>
    </>
  );
}
