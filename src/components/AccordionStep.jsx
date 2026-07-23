import { Camera, Shield, Radio, PlusCircle, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';

export function AccordionStep({
  step,
  isOpen,
  selectedCount = 0,
  selectedVariants,
  quantities,
  onToggle,
  onNext,
  onSelectVariant,
  onUpdateQuantity,
  onOpenLearnMore
}) {
  const getStepIcon = (iconName) => {
    switch (iconName) {
      case 'camera':
        return <Camera size={20} className="step-icon-svg" />;
      case 'shield':
        return <Shield size={20} className="step-icon-svg" />;
      case 'sensors':
        return <Radio size={20} className="step-icon-svg" />;
      case 'plus-shield':
        return <PlusCircle size={20} className="step-icon-svg" />;
      default:
        return <Shield size={20} className="step-icon-svg" />;
    }
  };

  return (
    <div className={`accordion-step ${isOpen ? 'step-open' : 'step-collapsed'}`}>
      {/* Step Header Bar */}
      <button 
        type="button" 
        className="step-header-btn" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="step-header-left">
          <div className="step-number-meta">STEP {step.stepNumber} OF 4</div>
          <div className="step-title-row">
            <span className="step-icon-wrapper">{getStepIcon(step.icon)}</span>
            <h2 className="step-title">{step.title}</h2>
          </div>
        </div>

        <div className="step-header-right">
          <span className={`selected-counter ${selectedCount > 0 ? 'active' : ''}`}>
            {selectedCount} selected
          </span>
          <span className="chevron-icon">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>
      </button>

      {/* Accordion Body */}
      {isOpen && (
        <div className="step-body">
          <div className="products-grid">
            {step.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                selectedVariantId={selectedVariants[product.id]}
                quantities={quantities}
                onSelectVariant={onSelectVariant}
                onUpdateQuantity={onUpdateQuantity}
                onOpenLearnMore={onOpenLearnMore}
              />
            ))}
          </div>

          {/* Bottom Next Button */}
          {step.nextStepTitle && (
            <div className="step-next-row">
              <button
                type="button"
                className="next-step-btn"
                onClick={onNext}
              >
                <span>Next: {step.nextStepTitle}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
