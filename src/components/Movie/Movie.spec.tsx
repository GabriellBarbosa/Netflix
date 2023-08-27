import React from "react";
import Movie from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import { media } from "../../utils/mock/Movie.mock";

describe('Movie Component', () => {
  let rightButton: HTMLElement;
  let movieList: HTMLElement;

  beforeEach(() => {
    render(<Movie item={media} />);
    rightButton = screen.getByTestId('slideRight');
    movieList = screen.getByTestId('movieList');
  });

  it('slide to right', () => {
    const oldTranslateX = getTranslateX(movieList.style.transform);
    fireEvent.click(rightButton);
    const newTranslateX = getTranslateX(movieList.style.transform);
    expect(newTranslateX).toBe( -(window.innerWidth / 2) + oldTranslateX );
  });

  it('slide to right untill the max allowed', () => {
    const CARD_WIDTH = 302;
    const MOVIE_LIST_PADDING = 60;
    const WINDOW_INNER_WIDTH = window.innerWidth;
  
    const numberOfMedias = media.items.response.results.length;
    const maxTranslateX = (numberOfMedias * CARD_WIDTH) - (WINDOW_INNER_WIDTH + MOVIE_LIST_PADDING);
    
    const translateXBeforeClick = getTranslateX(movieList.style.transform);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
    fireEvent.click(rightButton);
  
  
    const translateXAfterClick = getTranslateX(movieList.style.transform);
    expect(translateXAfterClick).toBe( -(WINDOW_INNER_WIDTH / 2 - translateXBeforeClick) );
  });
})

function getTranslateX(value: string) {
  if (value) {
    const translateX = value
      .replace('translate3d', '')
      .replace('(', '')
      .replace(')', '')
      .split(', ')[0]
      .replace('px', '');
    return Number(translateX);
  } else {
    return 0;
  }
}