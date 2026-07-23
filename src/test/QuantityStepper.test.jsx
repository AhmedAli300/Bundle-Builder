import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { QuantityStepper } from '../components/QuantityStepper';

describe('QuantityStepper Component', () => {
  it('renders initial value correctly', () => {
    render(<QuantityStepper value={2} onChange={() => {}} />);
    const input = screen.getByRole('spinbutton');
    expect(input).toHaveValue(2);
  });

  it('disables minus button when value is 0 or min', () => {
    render(<QuantityStepper value={0} min={0} onChange={() => {}} />);
    const minusBtn = screen.getByLabelText('Decrease quantity');
    expect(minusBtn).toBeDisabled();
  });

  it('calls onChange with incremented value when plus button is clicked', () => {
    const handleChange = vi.fn();
    render(<QuantityStepper value={1} onChange={handleChange} />);
    const plusBtn = screen.getByLabelText('Increase quantity');
    fireEvent.click(plusBtn);
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange with decremented value when minus button is clicked', () => {
    const handleChange = vi.fn();
    render(<QuantityStepper value={3} onChange={handleChange} />);
    const minusBtn = screen.getByLabelText('Decrease quantity');
    fireEvent.click(minusBtn);
    expect(handleChange).toHaveBeenCalledWith(2);
  });
});
