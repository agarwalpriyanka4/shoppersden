import {render, screen} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import Title from './Title';    

describe('Title Component', () => {

    beforeEach(() => {
        render(<Title text="Shopper's Den" />);        
    }); 
    it('should render the Title component with correct text', () => {              
        expect(screen.getByText("Shopper's Den")).toBeInTheDocument();
    });

    it('should apply css class', () => {               
        expect(screen.getByText("Shopper's Den")).toHaveClass('title');
    }); 
});