import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock } from 'lucide-react';

export function CheckoutModal({ totals, reviewLineItems, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => `WYZE-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content checkout-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className="checkout-success-state">
            <CheckCircle2 size={64} className="success-icon" />
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for customizing your Wyze security system.</p>
            <div className="order-number">Order #{orderNumber}</div>
            <button type="button" className="modal-done-btn" onClick={onClose}>
              Back to Store
            </button>
          </div>
        ) : (
          <div className="checkout-body">
            <div className="checkout-header">
              <ShieldCheck size={28} className="checkout-logo-icon" />
              <div>
                <h2>Checkout Summary</h2>
                <p>Complete your custom Wyze bundle order</p>
              </div>
            </div>

            <div className="checkout-summary-box">
              <h3>Order Receipt ({totals.totalItems} Items)</h3>
              <div className="checkout-items-mini">
                {Object.values(reviewLineItems).flatMap((items) => items).map((item) => (
                  <div key={item.itemKey} className="checkout-item-row">
                    <span>{item.title} × {item.qty}</span>
                    <span className="bold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="checkout-totals-breakdown">
                <div className="breakdown-row">
                  <span>Subtotal</span>
                  <span>${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="breakdown-row">
                  <span>Fast Shipping</span>
                  <span className="free-text">FREE</span>
                </div>
                {parseFloat(totals.totalSavings) > 0 && (
                  <div className="breakdown-row discount-row">
                    <span>Bundle Discount</span>
                    <span>-${totals.totalSavings}</span>
                  </div>
                )}
                <div className="breakdown-row final-total-row">
                  <span>Total Due Today</span>
                  <span className="total-highlight">${totals.totalActive}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" required placeholder="shopper@example.com" defaultValue="customer@wyze.com" />
              </div>
              <div className="form-group">
                <label>Shipping Address</label>
                <input type="text" required placeholder="123 Security Blvd" defaultValue="100 Technology Way, Suite 400" />
              </div>

              <button type="submit" className="submit-checkout-btn">
                <Lock size={16} />
                <span>Pay ${totals.totalActive} & Place Order</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
