import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Header from './index';


describe(Header, () => {
    it('add active class to header when pageYOffset is greater than 60', async() => {
        const originalMethod = window.addEventListener;
        const spy = jest.spyOn(window, 'addEventListener');
        
        spy.mockImplementation((...args) => {
            // Because this custom implementation is created for the spy,
            // Jest will no longer automatically invoke the original.
            // It needs to be done manually:
            originalMethod(...args);
            const [eventType] = args;
        });
        
        window.pageYOffset = 61;

        render(<Header />);
    

        fireEvent.scroll(window);

        const headerElement = screen.getByTestId('header');
        expect(headerElement.classList.length).toBeGreaterThan(1);
    });
})