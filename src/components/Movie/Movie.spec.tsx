import React from "react";
import Movie from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import { media } from "../../utils/mock/Movie.mock";
import { translateX } from "../../utils/function/translateX";

describe('Movie Component', () => {
  let rightButton: HTMLElement;
  let movieList: HTMLElement;

  beforeEach(() => {
    render(<Movie item={media} />);
    rightButton = screen.getByTestId('slideRight');
    movieList = screen.getByTestId('movieList');
  });

  it('slide to right', () => {
    const oldTranslateX = translateX(movieList.style.transform);
    fireEvent.click(rightButton);
    const newTranslateX = translateX(movieList.style.transform);
    expect(newTranslateX).toBe( -((window.innerWidth / 2) - oldTranslateX));
  });

  it('slide to right till the max allowed', () => {
    const CARD_WIDTH = 302;
    const MOVIE_LIST_PADDING = 60;
    const numberOfMedias = media.items.response.results.length;

    const maxTranslateX = ((numberOfMedias * CARD_WIDTH) + MOVIE_LIST_PADDING) - window.innerWidth;

    let countClicks = 0;
    while(countClicks < 10) {
      fireEvent.click(rightButton);
      countClicks += 1;
    }
  
    expect(translateX(movieList.style.transform)).toBe( -(maxTranslateX) );
  });
});