import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroesList from "@/app/heroesList/page";
import { fetchHeroesList } from "@/app/lib/data";

// Mock the data fetching function
jest.mock("@/app/lib/data", () => ({
  fetchHeroesList: jest.fn(),
}));

// Mock components
jest.mock("@/app/ui/HeroItem/HeroItem", () => () => <div>Hero Item</div>);
jest.mock("@/app/ui/Pagination/Pagination", () => () => <div>Pagination</div>);
jest.mock("@/app/ui/NotFound/NotFound", () => () => <div>Not Found</div>);

describe("HeroesList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a list of heroes after fetching data", async () => {
    const mockData = {
      results: [
        { id: "1", name: "Hero 1" },
        { id: "2", name: "Hero 2" },
      ],
      next: true,
      previous: false,
      count: 2,
    };

    fetchHeroesList.mockResolvedValueOnce(mockData);

    // Render the component
    const ui = await HeroesList({ searchParams: { page: 1 } });
    render(ui);

    // Check if HeroItem is rendered for each hero
    expect(screen.getAllByText("Hero Item")).toHaveLength(2);

    // Check if Pagination is rendered
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });

  it("renders NotFound component when fetch fails", async () => {
    fetchHeroesList.mockRejectedValueOnce(new Error("Failed to fetch"));

    // Render the component
    const ui = await HeroesList({ searchParams: { page: 1 } });
    render(ui);

    // Check if NotFound component is rendered
    expect(screen.getByText("Not Found")).toBeInTheDocument();
  });

  it("handles cases where no heroes are returned", async () => {
    const mockData = {
      results: [],
      next: false,
      previous: false,
      count: 0,
    };

    fetchHeroesList.mockResolvedValueOnce(mockData);

    // Render the component
    const ui = await HeroesList({ searchParams: { page: 1 } });
    render(ui);

    // Check if Pagination is rendered
    expect(screen.getByText("Pagination")).toBeInTheDocument();
  });
});
