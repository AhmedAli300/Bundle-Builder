import { ProductImage } from './ProductImage';
import { QuantityStepper } from './QuantityStepper';
import { Truck, Sparkles, Bookmark } from 'lucide-react';

export function ReviewPanel({
  reviewLineItems,
  totals,
  shipping,
  onUpdateQuantity,
  onSaveBundle,
  onCheckout
}) {
  const categories = [
    { key: 'CAMERAS', label: 'CAMERAS' },
    { key: 'SENSORS', label: 'SENSORS' },
    { key: 'ACCESSORIES', label: 'ACCESSORIES' },
    { key: 'PLAN', label: 'PLAN' }
  ];

  const hasAnyItems = totals.totalItems > 0;

  return (
    <aside className="review-panel">
      <div className='The-Left-Side'>

        <div className="panel-header">
          <div className="panel-badge">REVIEW</div>
          <h2 className="panel-title">Your security system</h2>
          <p className="panel-subtitle">
            Review your personalized protection system designed to keep what matters most safe.
          </p>
        </div>

        <div className="panel-content">
          {!hasAnyItems ? (
            <div className="empty-panel-state">
              <Sparkles size={32} className="empty-icon" />
              <p>Your security system is empty.</p>
              <span className="empty-sub">Add cameras, plans, or sensors to build your system.</span>
            </div>
          ) : (
            <div className="categories-list">
              {categories.map(({ key, label }) => {
                const items = reviewLineItems[key] || [];
                if (items.length === 0) return null;

                return (
                  <div key={key} className="category-group">
                    <div className="category-heading">{label}</div>
                    <div className="line-items-list">
                      {items.map((item) => (
                        <div key={item.itemKey} className="review-line-item">
                          <div className="line-item-thumb">
                            <ProductImage
                              productId={item.productId}
                              variantId={item.variantId || 'white'}
                            />
                          </div>

                          <div className="line-item-body">
                            <div className="line-item-title-row">
                              <span className="line-item-name">{item.title}</span>
                            </div>

                            <div className="line-item-controls-row">
                              <QuantityStepper
                                value={item.qty}
                                onChange={(newQty) => {
                                  const delta = newQty - item.qty;
                                  onUpdateQuantity(item.itemKey, delta);
                                }}
                                compact
                                ariaLabel={`Quantity for ${item.title}`}
                              />

                              <div className="line-item-price">
                                {item.compareAtPrice !== null && item.compareAtPrice !== undefined && (
                                  <span className="compare-at-price">
                                    ${(item.compareAtPrice * item.qty).toFixed(2)}
                                  </span>
                                )}
                                <span className={`active-price ${item.isFree ? 'free-price' : ''}`}>
                                  {item.isFree ? 'FREE' : `$${(item.price * item.qty).toFixed(2)}`}
                                  {item.billingFrequency ? `/${item.billingFrequency}` : ''}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              <div className="shipping-line-item">
                <div className="shipping-left">
                  <Truck size={18} className="shipping-icon" />
                  <span className="shipping-label">{shipping?.name || 'Fast Shipping'}</span>
                </div>
                <div className="shipping-price">
                  <span className="compare-at-price">${(shipping?.compareAtPrice || 5.99).toFixed(2)}</span>
                  <span className="free-price">FREE</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className='The-Right-Side'>

        <div className="satisfaction-badge">
          <div className="seal-container">
            <div className="seal-circle">
              <span className="seal-percentage">100%</span>
              <span className="seal-text">satisfaction guarantee</span>
            </div>
          </div>
          <div className="guarantee-info">
            <h4>30-day hassle-free returns</h4>
            <p>If you're not totally in love with the product, we will refund you 100%.</p>
          </div>
        </div>

        <div className="panel-footer">
          <div className="financing-row">
            <span>Or 0% APR as low as ${(totals.totalActive / 12).toFixed(2)}/mo</span>
          </div>

          <div className="total-pricing-row">
            <span className="total-label">Total</span>
            <div className="total-amounts">
              {parseFloat(totals.totalSavings) > 0 && (
                <span className="compare-at-total">${totals.totalOriginal}</span>
              )}
              <span className="active-total">${totals.totalActive}</span>
            </div>
          </div>

          {parseFloat(totals.totalSavings) > 0 && (
            <div className="savings-callout">
              Congrats! You're saving <strong>${totals.totalSavings}</strong> on your security bundle!
            </div>
          )}

          <button
            type="button"
            className="checkout-btn"
            onClick={onCheckout}
            disabled={!hasAnyItems}
          >
            Checkout
          </button>

          <button
            type="button"
            className="save-later-link"
            onClick={onSaveBundle}
          >
            <Bookmark size={14} />
            <span>Save my system for later</span>
          </button>
        </div>
      </div>


    </aside>
  );
}
