import {render, screen} from '@testing-library/react';
import {describe, it,expect,vi, beforeEach} from 'vitest';
import Banner from './Banner';

vi.mock('../../../assets/shopperbanner.jpeg', () => ({
    default: 'shopperbanner.jpeg',
}));

describe('Banner Component', () => {

    beforeEach(() => {
        render(<Banner />);        
    });

    it('should render the Banner component', () => {
              
        expect(screen.getByAltText('Shoppers Banner')).toBeInTheDocument();
    });

    it('should have the correct src attribute', () => {
         
        expect(screen.getByAltText('Shoppers Banner')).toHaveAttribute('src', 'shopperbanner.jpeg');
    });
    it('should apply css class', () => {
               
        expect(screen.getByAltText('Shoppers Banner')).toHaveClass('banner');
    });
});