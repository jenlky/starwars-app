import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("SearchBar", () => {
  it("should display a search bar", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    expect(getByPlaceholderText("Enter person name")).toBeInTheDocument();
  });
});
