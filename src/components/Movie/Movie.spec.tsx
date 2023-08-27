import React from "react";
import Movie from "./index";
import { render, screen, fireEvent } from "@testing-library/react";
import { media } from "../../utils/mock/Movie.mock";

test("slide to right", () => {
  render(<Movie item={media} />);
  const rightButton = screen.getByTestId('slideRight');
  const movieList = screen.getByTestId('movieList');

  const oldTranslateX = getTranslateX(movieList.style.transform);
  fireEvent.click(rightButton);
  const newTranslateX = getTranslateX(movieList.style.transform);

  expect(newTranslateX).toBe( -(window.innerWidth / 2) + oldTranslateX );
});

test("slide to right untill the max allowed", () => {
  render(<Movie item={media} />);
  const slideRightButton = screen.getByTestId('slideRight');
  const movieList = screen.getByTestId('movieList');

  const transform = movieList.style.transform;
  const translateX = transform.replace('matrix', '').replace('(', '').replace(')', '').split(', ')[4] || 0;

  const CARD_WIDTH = 302;
  const MOVIE_LIST_PADDING = 60;
  const WINDOW_INNER_WIDTH = window.innerWidth;

  const numberOfMedias = media.items.response.results.length;
  const maxTranslateX = (numberOfMedias * CARD_WIDTH) - (WINDOW_INNER_WIDTH + MOVIE_LIST_PADDING);
  
  const translateXBeforeClick = getTranslateX(movieList.style.transform);
  expect(translateXBeforeClick).toBe(0);

  fireEvent.click(slideRightButton);

  const translateXAfterClick = getTranslateX(movieList.style.transform);
  expect(translateXAfterClick).toBe( -(WINDOW_INNER_WIDTH / 2 - translateXBeforeClick) );
});

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