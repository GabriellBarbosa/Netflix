import React from "react";
import FeaturedTvSeries from "./index";
import { render, screen } from "@testing-library/react";
import { aTvSeries } from "./FeaturedTvSeries.mock";

test("vote average", () => {
  render(<FeaturedTvSeries aTvSeries={aTvSeries} />);
  const voteAverageElement = screen.getByTestId('voteAverage');

  expect(aTvSeries.vote_average).toBe(8.275);
  expect(voteAverageElement.innerHTML).toBe('83% Relevant');
});

test("release year", () => {
  render(<FeaturedTvSeries aTvSeries={aTvSeries} />);
  const releaseYearElement = screen.getByTestId('releaseYear');

  expect(aTvSeries.first_air_date).toBe('2005-09-13');
  expect(releaseYearElement.innerHTML).toBe('2005');
});
