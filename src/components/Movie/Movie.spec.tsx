import React from "react";
import Movie from "./index";
import { render, screen } from "@testing-library/react";
import { media } from "../../utils/mock/Movie.mock";

test("vote average", () => {
  render(<Movie item={media} />);
  const voteAverageElement = screen.getByTestId('voteAverage');
});
