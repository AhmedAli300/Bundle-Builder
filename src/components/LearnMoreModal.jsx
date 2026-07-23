import { X, CheckCircle } from 'lucide-react';
import { ProductImage } from './ProductImage';

export function LearnMoreModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-visual">
          <ProductImage productId={product.id} variantId="white" />
        </div>

        <div className="modal-body-content">
          <div className="modal-title-group">
            {product.badge && <span className="modal-badge">{product.badge}</span>}
            <h2 className="modal-product-title">{product.name}</h2>
            <p className="modal-product-desc">{product.description}</p>
          </div>

          <div className="specs-section">
            <h3>Key Features & Specs</h3>
            <ul className="specs-list">
              <li><CheckCircle size={16} className="check-icon" /> 1080p / 2.5K HD Crystal Clear Video</li>
              <li><CheckCircle size={16} className="check-icon" /> Color Night Vision with Starlight Sensor</li>
              <li><CheckCircle size={16} className="check-icon" /> Two-Way Audio with Built-in Siren</li>
              <li><CheckCircle size={16} className="check-icon" /> IP65 Weatherproof & Indoor/Outdoor Ready</li>
              <li><CheckCircle size={16} className="check-icon" /> Smart AI Motion & Sound Detection</li>
            </ul>
          </div>

          <div className="modal-footer-row">
            <div className="modal-price">
              {product.compareAtPrice && (
                <span className="compare-at">${product.compareAtPrice.toFixed(2)}</span>
              )}
              <span className="active-price">${product.price.toFixed(2)}</span>
            </div>
            <button type="button" className="modal-done-btn" onClick={onClose}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
