import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CartProvider, useCart } from './CartContext';
import React from 'react';

function TestConsumer() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, totalQuantity } = useCart();

  return (
    <div>
      <div data-testid="total">{totalQuantity}</div>
      <div data-testid="items">
        {cartItems.map((i) => (
          <div key={i.id} data-testid={`item-${i.id}`}>
            {i.name}-{i.quantity}
          </div>
        ))}
      </div>

      <button onClick={() => addToCart({ id: 1, name: 'A', price: 1 })}>addA</button>
      <button onClick={() => addToCart({ id: 2, name: 'B', price: 2 })}>addB</button>
      <button onClick={() => removeFromCart(1)}>remove1</button>
      <button onClick={() => updateQuantity(1, -1)}>dec1</button>
      <button onClick={() => updateQuantity(1, 1)}>inc1</button>
    </div>
  );
}

describe('CartContext (CartProvider + useCart)', () => {
  it('adds items and computes totalQuantity', () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // initially empty
    expect(screen.getByTestId('total').textContent).toBe('0');

    // add one A
    fireEvent.click(screen.getByText('addA'));
    expect(screen.getByTestId('item-1')).toHaveTextContent('A-1');
    expect(screen.getByTestId('total').textContent).toBe('1');

    // add another A -> quantity increments
    fireEvent.click(screen.getByText('addA'));
    expect(screen.getByTestId('item-1')).toHaveTextContent('A-2');
    expect(screen.getByTestId('total').textContent).toBe('2');

    // add B
    fireEvent.click(screen.getByText('addB'));
    expect(screen.getByTestId('item-2')).toHaveTextContent('B-1');
    expect(screen.getByTestId('total').textContent).toBe('3');
  });

  it('updateQuantity decrements and removes when zero, removeFromCart removes item', () => {
    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    // add A once
    fireEvent.click(screen.getByText('addA'));
    expect(screen.getByTestId('item-1')).toHaveTextContent('A-1');

    // decrement -> should remove item
    fireEvent.click(screen.getByText('dec1'));
    expect(screen.queryByTestId('item-1')).toBeNull();
    expect(screen.getByTestId('total').textContent).toBe('0');

    // add twice and then remove via removeFromCart
    fireEvent.click(screen.getByText('addA'));
    fireEvent.click(screen.getByText('addA'));
    expect(screen.getByTestId('item-1')).toHaveTextContent('A-2');
    fireEvent.click(screen.getByText('remove1'));
    expect(screen.queryByTestId('item-1')).toBeNull();
    expect(screen.getByTestId('total').textContent).toBe('0');
  });
});
