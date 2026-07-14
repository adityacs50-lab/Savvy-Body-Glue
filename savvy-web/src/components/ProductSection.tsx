import { useState } from "react";
import { Scene3D } from "./World3D";

const GALLERY = [
  { src: "/assets/products/tube-front.png", alt: "SAVVY tube front — savvyglue.com" },
  { src: "/assets/products/tube-back.png", alt: "SAVVY tube back — custom logo" },
  { src: "/assets/products/pouch.png", alt: "SAVVY Body Glue pouch" },
];

export function ProductSection({
  onAdd,
  onBuy,
}: {
  onAdd: (qty: number) => void;
  onBuy: (qty: number) => void;
}) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  return (
    <section className="product-shop" id="shop">
      <div className="product-shop-grid">
        <div className="product-gallery">
          <Scene3D className="product-main product-main-3d" intensity={1.4}>
            <div className="product-main-stage" data-cursor="view" data-cursor-label="VIEW">
              <div className="orbit-glow" aria-hidden />
              <img
                key={active}
                className="product-main-img float-3d"
                src={GALLERY[active].src}
                alt={GALLERY[active].alt}
              />
            </div>
          </Scene3D>
          <div className="product-thumbs" role="tablist" aria-label="Product images">
            {GALLERY.map((g, i) => (
              <button
                key={g.src}
                className={`product-thumb card-3d ${i === active ? "is-active" : ""}`}
                role="tab"
                aria-selected={i === active}
                aria-label={g.alt}
                onClick={() => setActive(i)}
                data-cursor="link"
              >
                <img src={g.src} alt="" />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="eyebrow">SAVVY — Body Glue</p>
          <h1 className="headline-3d">Savvy Body Glue</h1>
          <p className="product-desc">
            Lightweight, invisible glue that keeps straps, necklines, tops, dresses, and outfits in place.
          </p>
          <p className="product-price">₹ 799.00</p>
          <div className="product-badges">
            <span className="product-badge">Invisible</span>
            <span className="product-badge">Lightweight</span>
            <span className="product-badge">Outfit Ready</span>
            <span className="product-badge">15ml</span>
          </div>

          <div className="qty-row">
            <div className="qty-control" aria-label="Quantity">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                data-cursor="link"
              >
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                data-cursor="link"
              >
                +
              </button>
            </div>
          </div>

          <div className="product-actions">
            <button type="button" className="btn btn-dark btn-3d" onClick={() => onAdd(qty)} data-cursor="link">
              <img className="btn-spark" src="/assets/illustrations/flower.png" alt="" width={14} height={14} />
              Add to Bag
            </button>
            <button type="button" className="btn btn-primary btn-3d" onClick={() => onBuy(qty)} data-cursor="link">
              <img className="btn-spark" src="/assets/illustrations/flower.png" alt="" width={14} height={14} />
              Buy it Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
