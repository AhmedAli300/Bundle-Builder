import { ProductImage } from '../ProductImage/ProductImage';
import { VariantSelector } from '../VariantSelector/VariantSelector';
import { QuantityStepper } from '../QuantityStepper/QuantityStepper';
import './ProductCard.css';

export function ProductCard({
  product,
  selectedVariantId,
  quantities,
  onSelectVariant,
  onUpdateQuantity,
  onOpenLearnMore
}) {
  const activeVariantId = product.hasVariants
    ? (selectedVariantId || product.defaultVariantId || product.variants[0]?.id)
    : null;

  const currentItemKey = product.hasVariants
    ? `${product.id}:${activeVariantId}`
    : product.id;

  const currentQuantity = quantities[currentItemKey] || 0;

  const isAnyVariantSelected = product.hasVariants
    ? product.variants.some(v => (quantities[`${product.id}:${v.id}`] || 0) > 0)
    : (quantities[product.id] || 0) > 0;

  const handleStepperChange = (newQty) => {
    const delta = newQty - currentQuantity;
    onUpdateQuantity(currentItemKey, delta);
  };

  return (
    <div className={`product-card ${isAnyVariantSelected ? 'selected-card' : ''}`}>
      {product.badge && (
        <div className={`product-badge ${product.badge === 'Required' ? 'badge-required' : product.badge === 'Popular' ? 'badge-popular' : 'badge-discount'}`}>
          {product.badge}
        </div>
      )}

      <div className="card-inner d-flex flex-column h-100">
        <div className="product-image-container d-flex align-items-center justify-content-center">
          <ProductImage 
            productId={product.id} 
            variantId={activeVariantId || 'white'} 
          />
        </div>

        <div className="product-info d-flex flex-column flex-grow-1">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <button 
            type="button" 
            className="learn-more-link"
            onClick={() => onOpenLearnMore(product)}
          >
            Learn More
          </button>

          {product.hasVariants && (
            <VariantSelector
              variants={product.variants}
              selectedVariantId={activeVariantId}
              onSelectVariant={(varId) => onSelectVariant(product.id, varId)}
            />
          )}

          <div className="card-footer-row d-flex align-items-center justify-content-between mt-auto pt-3">
            <QuantityStepper
              value={currentQuantity}
              onChange={handleStepperChange}
              ariaLabel={`Quantity for ${product.name}`}
            />

            <div className="product-pricing d-flex align-items-baseline gap-2">
              {product.compareAtPrice !== null && product.compareAtPrice !== undefined && (
                <span className="compare-at-price">
                  ${product.compareAtPrice.toFixed(2)}
                  {product.billingFrequency ? `/${product.billingFrequency}` : ''}
                </span>
              )}
              <span className={`active-price ${product.isFree ? 'free-price' : ''}`}>
                {product.isFree ? 'FREE' : `$${product.price.toFixed(2)}`}
                {product.billingFrequency ? `/${product.billingFrequency}` : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
