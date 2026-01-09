import {render,screen,act} from '@testing-library/react';
import {describe, it, expect, vi, beforeEach, afterEach} from 'vitest';
import Timer from './Timer';
describe('Timer Component', () => {

    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2024-01-01T00:00:00Z'));     
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders the currret time correctly', () => {              
        render(<Timer />);        
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });
    

    it('updates the time every second', () => {              
        render(<Timer />);        
       const initialTime = screen.getByRole('heading').textContent;

       act(() => {
        vi.advanceTimersByTime(1000); // Advance time by 1 second
       });
         const updatedTime = screen.getByRole('heading').textContent;
         expect(initialTime).not.toBe(updatedTime);
    });

    it('cleans up the interval on unmount', () => { 
        const clearIntervalSpy = vi.spyOn(global, 'clearInterval');
        const { unmount } = render(<Timer />);
        unmount();
        expect(clearIntervalSpy).toHaveBeenCalled();
    });
});