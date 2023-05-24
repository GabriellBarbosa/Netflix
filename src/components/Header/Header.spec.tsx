import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react';
import Header from './index';
    
test('toggle active class on scroll', () => {
    render(<Header/>);

    window.pageYOffset = 61;
    fireEvent.scroll(window);
    const headerElement1 = screen.getByTestId('header');
    expect(headerElement1.classList).toContain('active');

    window.pageYOffset = 60;
    fireEvent.scroll(window);
    const headerElement2 = screen.getByTestId('header');
    expect(headerElement2.classList).not.toContain('active');
});