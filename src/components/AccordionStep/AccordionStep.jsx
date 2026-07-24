import { Camera, Shield, Radio, PlusCircle, ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';
import { ProductCard } from '../ProductCard/ProductCard';
import './AccordionStep.css';

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
      <button 
        type="button" 
        className="step-header-btn d-flex justify-content-between align-items-center text-start w-100" 
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="step-header-left d-flex flex-column gap-1">
          <div className="step-number-meta">STEP {step.stepNumber} OF 4</div>
          <div className="step-title-row d-flex align-items-center gap-2">
            <span className="step-icon-wrapper d-flex align-items-center">{getStepIcon(step.icon)}</span>
            <h2 className="step-title m-0">{step.title}</h2>
          </div>
        </div>

        <div className="step-header-right d-flex align-items-center gap-2">
          <span className={`selected-counter ${selectedCount > 0 ? 'active' : ''}`}>
            {selectedCount} selected
          </span>
          <span className="chevron-icon d-flex align-items-center">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>
      </button>


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

          {step.nextStepTitle && (
            <div className="step-next-row d-flex align-items-center mt-3">
              <button
                type="button"
                className="next-step-btn d-inline-flex align-items-center gap-2 py-2 px-3"
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
