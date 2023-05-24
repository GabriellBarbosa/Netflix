import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Header from './index';
    
test("add active class on scroll if scrollY is greater than 60 or remove if it's not", () => {
    render(<Header/>);
    const headerElement = screen.getByTestId('header');

    window.scrollY = 61;
    fireEvent.scroll(window);
    expect(headerElement.classList).toContain('active');

    window.scrollY = 60;
    fireEvent.scroll(window);
    expect(headerElement.classList).not.toContain('active');
});