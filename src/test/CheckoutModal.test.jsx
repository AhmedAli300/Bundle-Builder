import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CheckoutModal } from '../components/CheckoutModal';

describe('CheckoutModal Component', () => {
  const mockTotals = {
    subtotal: 188.91,
    totalOriginal: '239.83',
    totalActive: '188.91',
    totalSavings: '50.92',
    totalItems: 8
  };

  const mockReviewLineItems = {
    CAMERAS: [
      { itemKey: 'wyze-cam-v4:white', title: 'Wyze Cam v4 (White)', qty: 1, price: 27.98 }
    ]
  };

  it('renders checkout summary title, total price, and receipt items', () => {
    render(
      <CheckoutModal
        totals={mockTotals}
        reviewLineItems={mockReviewLineItems}
        onClose={() => {}}
      />
    );

    expect(screen.getByRole('heading', { name: /checkout summary/i })).toBeInTheDocument();
    expect(screen.getByText('Order Receipt')).toBeInTheDocument();
    expect(screen.getByText('Pay $188.91 & Place Order')).toBeInTheDocument();
  });

  it('transitions to order confirmation state on form submit', () => {
    render(
      <CheckoutModal
        totals={mockTotals}
        reviewLineItems={mockReviewLineItems}
        onClose={() => {}}
      />
    );

    const submitBtn = screen.getByRole('button', { name: /pay \$188\.91 & place order/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Order Placed Successfully!')).toBeInTheDocument();
    expect(screen.getByText('Return to Store')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <CheckoutModal
        totals={mockTotals}
        reviewLineItems={mockReviewLineItems}
        onClose={handleClose}
      />
    );

    const closeBtn = screen.getByLabelText('Close modal');
    fireEvent.click(closeBtn);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
