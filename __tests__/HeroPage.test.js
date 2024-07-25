import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroPage from "../app/heroesList/[heroId]/page.jsx";
import { getHero, getFilms, getStarships } from "@/services/fetchData";

// Mock the necessary functions and components
jest.mock("@/services/fetchData", () => ({
  getHero: jest.fn(),
  getFilms: jest.fn(),
  getStarships: jest.fn(),
}));

jest.mock("@/components/HeroGraph/HeroGraph", () =>
  jest.fn(({ nodes, edges }) => <div data-testid="hero-graph">HeroGraph</div>)
);

jest.mock("@/components/HeroGraph/HeroGraph", () => (props) => (
  <div data-testid="hero-graph">
    {props.nodes.length} nodes, {props.edges.length} edges
  </div>
));

jest.mock("@/components/Loader/Loader", () => () => <div>Loading...</div>);

describe("HeroPage Component", () => {
  const mockHero = {
    id: "1",
    name: "Luke Skywalker",
    films: ["1"],
    starships: ["1"],
  };
  const mockFilms = [{ id: "1", title: "A New Hope", starships: ["1"] }];
  const mockStarships = [{ id: "1", name: "X-wing" }];

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("renders Loader while fetching data", async () => {
    getHero.mockResolvedValueOnce(mockHero);
    getFilms.mockResolvedValueOnce(mockFilms);
    getStarships.mockResolvedValueOnce(mockStarships);

    render(<HeroPage params={{ heroId: "1" }} />);

    // Check if Loader is rendered initially
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for the loading to finish
    await waitFor(() => {
      // Ensure Loader is no longer in the document
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("renders HeroGraph with nodes and edges after fetching data", async () => {
    getHero.mockResolvedValue(mockHero);
    getFilms.mockResolvedValue(mockFilms);
    getStarships.mockResolvedValue(mockStarships);

    render(<HeroPage params={{ heroId: "1" }} />);

    await waitFor(() => {
      expect(screen.getByTestId("hero-graph")).toBeInTheDocument();
    });
  });

  it("handles errors gracefully", async () => {
    getHero.mockRejectedValue(new Error("Failed to fetch hero data"));

    render(<HeroPage params={{ heroId: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText("Error loading data")).toBeInTheDocument();
    });
  });
});
