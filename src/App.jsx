import { useState } from 'react';
import { useBundleState } from './hooks/useBundleState';
import { Header } from './components/Header';
import { AccordionStep } from './components/AccordionStep';
import { ReviewPanel } from './components/ReviewPanel';
import { LearnMoreModal } from './components/LearnMoreModal';
import { CheckoutModal } from './components/CheckoutModal';
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
      {/* Top Navigation Header */}
      <Header 
        onReset={resetBundle} 
        onSave={saveBundle} 
      />

      <main className="main-wrapper container-fluid px-3 px-md-4">
        <div className="row g-4 align-items-start max-container mx-auto">
          {/* Left Column: 4-Step Accordion (col-12 on Mobile, col-lg-8 on Desktop/Laptops) */}
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

          {/* Right Column: Live Review Panel (col-12 on Mobile, col-lg-3 offset-lg-1 on Desktop with 1 column gap) */}
          <div className="col-12 col-lg-3 offset-lg-1 builder-review-column">
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

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="toast-banner" role="alert">
          {toastMessage}
        </div>
      )}

      {/* Learn More Details Modal */}
      {activeLearnMoreProduct && (
        <LearnMoreModal
          product={activeLearnMoreProduct}
          onClose={() => setActiveLearnMoreProduct(null)}
        />
      )}

      {/* Checkout Order Summary Modal */}
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
