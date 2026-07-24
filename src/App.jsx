import { useState } from 'react';
import { useBundleState } from './hooks/useBundleState';
import { Header } from './components/Header/Header';
import { AccordionStep } from './components/AccordionStep/AccordionStep';
import { ReviewPanel } from './components/ReviewPanel/ReviewPanel';
import { LearnMoreModal } from './components/LearnMoreModal/LearnMoreModal';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import './App.css';

function App() {
  const {
    data,
    loading,
    openStepId,
    quantities,
    selectedVariants,
    stepSelectedCounts,
    reviewLineItems,
    totals,
    toastMessage,
    toggleStep,
    nextStep,
    selectVariant,
    updateQuantity,
    saveBundle,
    resetBundle
  } = useBundleState();

  const [activeLearnMoreProduct, setActiveLearnMoreProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (loading && !data) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading security bundle options...</p>
      </div>
    );
  }

  return (
    <div className="bundle-builder-app">
      {/* <Header 
        onReset={resetBundle} 
        onSave={saveBundle} 
      /> */}

      <main className="main-wrapper container-fluid px-1 px-md-1">
        <div className="row g-1 align-items-start max-container mx-auto">
          <div className="col-12 col-lg-8 builder-accordion-column">
            {data?.steps?.map((step) => (
              <AccordionStep
                key={step.id}
                step={step}
                isOpen={openStepId === step.id}
                selectedCount={stepSelectedCounts[step.id] || 0}
                selectedVariants={selectedVariants}
                quantities={quantities}
                onToggle={() => toggleStep(step.id)}
                onNext={() => nextStep(step.stepNumber)}
                onSelectVariant={selectVariant}
                onUpdateQuantity={updateQuantity}
                onOpenLearnMore={(product) => setActiveLearnMoreProduct(product)}
              />
            ))}
          </div>

          <div className="col-12 col-lg-3 offset-lg-1">
            <ReviewPanel
              reviewLineItems={reviewLineItems}
              totals={totals}
              shipping={data?.shipping}
              onUpdateQuantity={updateQuantity}
              onSaveBundle={saveBundle}
              onCheckout={() => setIsCheckoutOpen(true)}
            />
          </div>
        </div>
      </main>

      {toastMessage && (
        <div className="toast-banner" role="alert">
          {toastMessage}
        </div>
      )}

      {activeLearnMoreProduct && (
        <LearnMoreModal
          product={activeLearnMoreProduct}
          onClose={() => setActiveLearnMoreProduct(null)}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          totals={totals}
          reviewLineItems={reviewLineItems}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
