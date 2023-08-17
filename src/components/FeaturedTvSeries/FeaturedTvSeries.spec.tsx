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
