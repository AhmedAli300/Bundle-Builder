export function VariantSelector({ 
  variants = [], 
  selectedVariantId, 
  onSelectVariant 
}) {
  if (!variants || variants.length === 0) return null;

  return (
    <div className="variant-selector-container">
      <div className="variant-chips-row" role="radiogroup" aria-label="Color options">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          const isWhite = variant.colorHex?.toUpperCase() === '#FFFFFF';
          
          return (
            <button
              key={variant.id}
              type="button"
              className={`variant-chip ${isSelected ? 'selected' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectVariant(variant.id);
              }}
              role="radio"
              aria-checked={isSelected}
            >
              <span
                className={`variant-swatch ${isWhite ? 'white-swatch' : ''}`}
                style={{ backgroundColor: variant.colorHex }}
              />
              <span className="variant-label">{variant.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
