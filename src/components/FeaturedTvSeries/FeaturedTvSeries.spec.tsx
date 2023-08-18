import React from "react";
import FeaturedTvSeries from "./index";
import { render, screen } from "@testing-library/react";
import { aTvSeries } from "../../utils/mock/FeaturedTvSeries.mock";
import { cloneDeep } from "../../utils/function/cloneDeep";

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

test("number of seasons singular", () => {
  const aTvSeriesClone = cloneDeep(aTvSeries);
  aTvSeriesClone.number_of_seasons = 0;

  render(<FeaturedTvSeries aTvSeries={aTvSeriesClone} />);
  const numberOfSeasonsElement = screen.getByTestId('numberOfSeasons');

  expect(aTvSeries.number_of_seasons).toBe(12);
  expect(aTvSeriesClone.number_of_seasons).toBe(0);
  expect(numberOfSeasonsElement.innerHTML).toBe('0 season');
});

test("number of seasons plural", () => {
  render(<FeaturedTvSeries aTvSeries={aTvSeries} />);
  const numberOfSeasonsElement = screen.getByTestId('numberOfSeasons');

  expect(aTvSeries.number_of_seasons).toBe(12);
  expect(numberOfSeasonsElement.innerHTML).toBe('12 seasons');
});