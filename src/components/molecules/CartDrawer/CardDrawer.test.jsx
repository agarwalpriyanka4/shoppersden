import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CartDrawer from './CartDrawer';

let updateQuantityMock = vi.fn();
let removeFromCartMock = vi.fn();
let onCloseMock = vi.fn();

vi.mock('../CartContext/CartContext.jsx', () => ({
  useCart: () => ({
    cartItems: [],
    updateQuantity: (...args) => updateQuantityMock(...args),
    removeFromCart: (...args) => removeFromCartMock(...args)
  })
}));

describe('CartDrawer component', () => {
  beforeEach(() => {
    updateQuantityMock = vi.fn();
    removeFromCartMock = vi.fn();
    onCloseMock = vi.fn();
  });

  it('shows empty state and disables checkout', () => {
    // default mock returns empty cart
    render(<CartDrawer open={true} onClose={onCloseMock} />);
    expect(screen.getByText(/Your Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/No items in cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Total: \$0.00/)).toBeInTheDocument();
    const checkout = screen.getByRole('button', { name: /Checkout/i });
    expect(checkout).toBeDisabled();

    const closeBtn = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('renders items, updates quantity, removes item and shows total', async () => {
    // override mock to provide items
    const cart = [
      { id: 1, name: 'Item One', price: 5.0, quantity: 2 },
      { id: 2, name: 'Item Two', price: 3.5, quantity: 1 }
    ];

    vi.resetModules();
    vi.doMock('../CartContext/CartContext.jsx', () => ({
      useCart: () => ({
        cartItems: cart,
        updateQuantity: (...args) => updateQuantityMock(...args),
        removeFromCart: (...args) => removeFromCartMock(...args)
      })
    }));

    // Need to re-import component so it picks up the updated mock
    const { default: CartDrawerReloaded } = await import('./CartDrawer');

    render(<CartDrawerReloaded open={true} onClose={onCloseMock} />);

    // Item names and prices
    expect(screen.getByText('Item One')).toBeInTheDocument();
    expect(screen.getByText('$5')).toBeInTheDocument();
    expect(screen.getByText('Item Two')).toBeInTheDocument();

    // Quantities displayed correctly
    const itemOneBox = screen.getByText('Item One').parentElement;
    expect(within(itemOneBox).getByText('2')).toBeInTheDocument();
    const itemTwoBox = screen.getByText('Item Two').parentElement;
    expect(within(itemTwoBox).getByText('1')).toBeInTheDocument();

    // Scoped interactions for first item
    const itemButtons = within(itemOneBox).getAllByRole('button');
    // button order: remove, add, delete (IconButtons)
    fireEvent.click(itemButtons[1]); // click Add
    expect(updateQuantityMock).toHaveBeenCalledWith(1, 1);

    fireEvent.click(itemButtons[0]); // click Remove
    expect(updateQuantityMock).toHaveBeenCalledWith(1, -1);

    // Delete button
    fireEvent.click(itemButtons[2]);
    expect(removeFromCartMock).toHaveBeenCalledWith(1);

    // Delete was called once
    expect(removeFromCartMock).toHaveBeenCalledTimes(1);

    // Total calculation: (5*2)+(3.5*1) = 13.5
    expect(screen.getByText(/Total: \$13.50/)).toBeInTheDocument();

    // Checkout should be enabled when cart has items
    const checkout = screen.getByRole('button', { name: /Checkout/i });
    expect(checkout).not.toBeDisabled();
  });
});
