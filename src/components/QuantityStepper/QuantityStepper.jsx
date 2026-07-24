import { Minus, Plus } from 'lucide-react';
import './QuantityStepper.css';

export function QuantityStepper({ 
  value = 0, 
  onChange, 
  min = 0, 
  max = 99, 
  compact = false,
  ariaLabel = "Quantity stepper" 
}) {
  const handleDecrement = (e) => {
    e.stopPropagation();
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      onChange(min);
    } else {
      const clamped = Math.max(min, Math.min(max, val));
      onChange(clamped);
    }
  };

  return (
    <div className={`stepper-container ${compact ? 'compact' : ''}`} aria-label={ariaLabel}>
      <button
        type="button"
        className="stepper-btn stepper-minus"
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={compact ? 12 : 14} strokeWidth={2.5} />
      </button>
      
      <input
        type="number"
        className="stepper-input"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        aria-label="Quantity value"
      />
      
      <button
        type="button"
        className="stepper-btn stepper-plus"
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        <Plus size={compact ? 12 : 14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
