import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProductCard } from '../components/ProductCard';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: 'wyze-cam-v4',
    name: 'Wyze Cam v4',
    description: 'The clearest Wyze Cam ever made.',
    badge: 'Save 22%',
    price: 27.98,
    compareAtPrice: 35.98,
    hasVariants: true,
    defaultVariantId: 'white',
    variants: [
      { id: 'white', name: 'White', colorHex: '#FFFFFF' },
      { id: 'black', name: 'Black', colorHex: '#1E1E1E' }
    ]
  };

  const mockQuantities = {
    'wyze-cam-v4:white': 1,
    'wyze-cam-v4:black': 0
  };

  it('renders product title, description, and discount badge', () => {
    render(
      <ProductCard
        product={mockProduct}
        selectedVariantId="white"
        quantities={mockQuantities}
        onSelectVariant={() => {}}
        onUpdateQuantity={() => {}}
        onOpenLearnMore={() => {}}
      />
    );

    expect(screen.getByText('Wyze Cam v4')).toBeInTheDocument();
    expect(screen.getByText('The clearest Wyze Cam ever made.')).toBeInTheDocument();
    expect(screen.getByText('Save 22%')).toBeInTheDocument();
    expect(screen.getByText('$27.98')).toBeInTheDocument();
  });

  it('switches variant when a swatch chip is clicked', () => {
    const handleSelectVariant = vi.fn();
    render(
      <ProductCard
        product={mockProduct}
        selectedVariantId="white"
        quantities={mockQuantities}
        onSelectVariant={handleSelectVariant}
        onUpdateQuantity={() => {}}
        onOpenLearnMore={() => {}}
      />
    );

    const blackChip = screen.getByText('Black');
    fireEvent.click(blackChip);
    expect(handleSelectVariant).toHaveBeenCalledWith('wyze-cam-v4', 'black');
  });

  it('applies selected-card class when product has quantity > 0', () => {
    const { container } = render(
      <ProductCard
        product={mockProduct}
        selectedVariantId="white"
        quantities={mockQuantities}
        onSelectVariant={() => {}}
        onUpdateQuantity={() => {}}
        onOpenLearnMore={() => {}}
      />
    );

    const cardElement = container.querySelector('.product-card');
    expect(cardElement).toHaveClass('selected-card');
  });
});
