import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroesList from "./page.jsx";
import { getHeroes } from "@/services/fetchData";

jest.mock("@/services/fetchData", () => ({
  getHeroes: jest.fn(),
}));

jest.mock("@/components/HeroItem/HeroItem", () => ({ data }) => (
  <div>{data.name}</div>
));
jest.mock("@/components/Loader/Loader", () => () => <div>Loading...</div>);
jest.mock("@/components/Pagination/Pagination", () => (props) => (
  <div>
    <button onClick={props.onPreviousClick} disabled={props.currentPage === 1}>
      Previous
    </button>
    <button
      onClick={props.onNextClick}
      disabled={props.currentPage === props.pages}
    >
      Next
    </button>
    {Array.from({ length: props.pages }, (_, i) => (
      <button key={i + 1} onClick={() => props.onNumberClick(i + 1)}>
        {i + 1}
      </button>
    ))}
  </div>
));

describe("HeroesList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loader while fetching data", async () => {
    getHeroes.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ results: [], count: 0 }), 100)
        )
    );

    await act(async () => {
      render(<HeroesList />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
  });

  it("renders heroes list after fetching data", async () => {
    const mockData = {
      results: [
        { id: 1, name: "Hero 1" },
        { id: 2, name: "Hero 2" },
      ],
      count: 2,
    };
    getHeroes.mockResolvedValue(mockData);

    await act(async () => {
      render(<HeroesList />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    mockData.results.forEach((hero) => {
      expect(screen.getByText(hero.name)).toBeInTheDocument();
    });
  });

  it("handles pagination clicks", async () => {
    const mockData = {
      results: [
        { id: 1, name: "Hero 1" },
        { id: 2, name: "Hero 2" },
      ],
      count: 20,
      next: "next",
      previous: "previous",
    };
    getHeroes.mockResolvedValue(mockData);

    await act(async () => {
      render(<HeroesList />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    const nextButton = screen.getByText("Next");
    const previousButton = screen.getByText("Previous");
    const pageNumberButton = screen.getByText("2");

    await act(async () => {
      fireEvent.click(nextButton);
    });

    await waitFor(() => expect(getHeroes).toHaveBeenCalledWith(2));

    await act(async () => {
      fireEvent.click(previousButton);
    });

    await waitFor(() => expect(getHeroes).toHaveBeenCalledWith(1));

    await act(async () => {
      fireEvent.click(pageNumberButton);
    });

    await waitFor(() => expect(getHeroes).toHaveBeenCalledWith(2));
  });
});
