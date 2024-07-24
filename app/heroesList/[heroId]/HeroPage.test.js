import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroPage from "./page";
import { getHero, getFilms, getStarships } from "@/services/fetchData";

jest.mock("@/services/fetchData", () => ({
  getHero: jest.fn(),
  getFilms: jest.fn(),
  getStarships: jest.fn(),
}));

jest.mock(
  "@/components/HeroGraph/HeroGraph",
  () =>
    ({ hero, films, starships }) =>
      (
        <div>
          <div>{hero.name}</div>
          <div>{films.map((film) => film.title).join(", ")}</div>
          <div>{starships.map((ship) => ship.name).join(", ")}</div>
        </div>
      )
);

jest.mock("@/components/Loader/Loader", () => () => <div>Loading...</div>);

describe("HeroPage Component", () => {
  const mockParams = { heroId: "1" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Loader while fetching data", async () => {
    getHero.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({}), 100))
    );
    getFilms.mockResolvedValue([]);
    getStarships.mockResolvedValue([]);

    await act(async () => {
      render(<HeroPage params={mockParams} />);
    });

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
    });
  });

  it("renders hero data and HeroGraph after fetching data", async () => {
    const mockHero = { name: "Luke Skywalker", films: [], starships: [] };
    const mockFilms = [{ title: "A New Hope" }];
    const mockStarships = [{ name: "X-wing" }];

    getHero.mockResolvedValue(mockHero);
    getFilms.mockResolvedValue(mockFilms);
    getStarships.mockResolvedValue(mockStarships);

    await act(async () => {
      render(<HeroPage params={mockParams} />);
    });

    await waitFor(() =>
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument()
    );

    expect(screen.getByText("Hero name: Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("X-wing")).toBeInTheDocument();
  });

  it("handles errors gracefully", async () => {
    getHero.mockRejectedValue(new Error("Failed to fetch hero data"));
    getFilms.mockResolvedValue([]);
    getStarships.mockResolvedValue([]);

    await act(async () => {
      render(<HeroPage params={mockParams} />);
    });

    await waitFor(() => {
      // Ensure Loading... is no longer in the document
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
      // Ensure error message is displayed
      expect(screen.getByText("Error loading data")).toBeInTheDocument();
    });
  });
});
