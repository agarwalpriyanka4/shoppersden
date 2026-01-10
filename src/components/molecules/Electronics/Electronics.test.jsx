import { render, screen, fireEvent, within } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Electronics from './Electronics';
import axios from 'axios';

let addToCartMock = vi.fn();

vi.mock('../CartContext/CartContext.jsx', () => ({
	useCart: () => ({ addToCart: (...args) => addToCartMock(...args) })
}));

vi.mock('axios');

describe('Electronics component', () => {
	const mockResponse = {
		data: {
			data: [
				{ id: 1, name: 'Alpha', description: 'First item', price: 10, image: 'a.jpg', category: 'gadgets', inStock: true },
				{ id: 2, name: 'Beta', description: 'Second item', price: 20, image: 'b.jpg', category: 'gadgets', inStock: false },
				{ id: 3, name: 'Gamma', description: 'Third item', price: 30, image: 'c.jpg', category: 'gadgets', inStock: true }
			]
		}
	};

	beforeEach(() => {
		addToCartMock = vi.fn();
		axios.get.mockResolvedValue(mockResponse);
	});

	it('renders fetched electronics items', async () => {
		render(<Electronics />);
		expect(screen.getByText(/Loading electronics/i)).toBeInTheDocument();
		expect(await screen.findByText('Alpha')).toBeInTheDocument();
		expect(screen.getByText('Beta')).toBeInTheDocument();
	});

	it('filters results using the search input', async () => {
		render(<Electronics />);
		await screen.findByText('Alpha');
		const input = screen.getByLabelText(/Search Electronics/i);
		fireEvent.change(input, { target: { value: 'Gamma' } });
		expect(screen.queryByText('Alpha')).not.toBeInTheDocument();
		expect(screen.getByText('Gamma')).toBeInTheDocument();
	});

	it('opens a dialog with details when a card is clicked', async () => {
		render(<Electronics />);
		await screen.findByText('Alpha');
		fireEvent.click(screen.getByText('Alpha'));
		const dialog = await screen.findByRole('dialog');
		expect(within(dialog).getByText(/Category:/i)).toBeInTheDocument();
		expect(within(dialog).getByText('Price: $10')).toBeInTheDocument();
	});

	it('calls addToCart when Add to Cart button is clicked', async () => {
		render(<Electronics />);
		await screen.findByText('Alpha');
		const addButtons = screen.getAllByText('Add to Cart');
		fireEvent.click(addButtons[0]);
		expect(addToCartMock).toHaveBeenCalled();
	});
});

