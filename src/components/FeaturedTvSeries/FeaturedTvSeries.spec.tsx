import React from "react";
import FeaturedTvSeries from "./index";
import { fireEvent, render, screen } from "@testing-library/react";
import { aTvSeries } from "./FeaturedTvSeries.mock";

test("set", () => {
  render(<FeaturedTvSeries aTvSeries={aTvSeries} />);
  const headerElement = screen.getByTestId("header");

  window.scrollY = 61;
  fireEvent.scroll(window);
  expect(headerElement.classList).toContain("active");

  window.scrollY = 60;
  fireEvent.scroll(window);
  expect(headerElement.classList).not.toContain("active");
});
