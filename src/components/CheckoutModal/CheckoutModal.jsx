import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import './CheckoutModal.css';

export function CheckoutModal({ totals, reviewLineItems, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber] = useState(() => `WYZE-${Math.floor(100000 + Math.random() * 900000)}`);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay d-flex align-items-center justify-content-center p-3 position-fixed top-0 start-0 end-0 bottom-0" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="checkout-modal-title">
      <div className="modal-content checkout-modal d-flex flex-column w-100 position-relative" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {submitted ? (
          <div className="checkout-success-state">
            <div className="success-icon-badge">
              <CheckCircle2 size={48} className="success-icon" />
            </div>
            <h2 className="success-title">Order Placed Successfully!</h2>
            <p className="success-desc">Thank you for customizing your Wyze security system.</p>
            <div className="order-number-pill">
              <span className="label">Order Reference:</span>
              <span className="code">#{orderNumber}</span>
            </div>
            <button type="button" className="modal-done-btn success-done-btn" onClick={onClose}>
              Return to Store
            </button>
          </div>
        ) : (
          <div className="checkout-body">
            <div className="checkout-header">
              <div className="checkout-icon-badge">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 id="checkout-modal-title" className="checkout-title">Checkout Summary</h2>
                <p className="checkout-subtitle">Complete your custom Wyze bundle order</p>
              </div>
            </div>

            <div className="checkout-summary-box">
              <div className="receipt-header-row">
                <span className="receipt-title">Order Receipt</span>
                <span className="items-badge">{totals.totalItems} Items</span>
              </div>
              
              <div className="checkout-items-mini">
                {Object.values(reviewLineItems).flatMap((items) => items).map((item) => (
                  <div key={item.itemKey} className="checkout-item-row">
                    <span className="item-name">{item.title} <span className="item-qty">× {item.qty}</span></span>
                    <span className="item-price">${(item.price * item.qty).toFixed(2)}</span>
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
                <label htmlFor="checkout-email">Email Address</label>
                <input 
                  id="checkout-email"
                  type="email" 
                  required 
                  placeholder="shopper@example.com" 
                  defaultValue="customer@wyze.com" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-address">Shipping Address</label>
                <input 
                  id="checkout-address"
                  type="text" 
                  required 
                  placeholder="123 Security Blvd" 
                  defaultValue="100 Technology Way, Suite 400" 
                />
              </div>

              <div className="form-group">
                <label htmlFor="checkout-card">Payment Method</label>
                <div className="payment-input-wrapper">
                  <CreditCard size={18} className="payment-icon" />
                  <input 
                    id="checkout-card"
                    type="text" 
                    required 
                    placeholder="•••• •••• •••• 4242" 
                    defaultValue="•••• •••• •••• 4242" 
                  />
                </div>
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
