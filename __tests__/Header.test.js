import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "@/app/ui/Header/Header";
import { usePathname } from "next/navigation";

// Mock the usePathname hook from next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and GO TO LIST button for paths other than "/" and "/heroesList"', () => {
    usePathname.mockReturnValue("/some-other-path");

    render(<Header />);

    // Check if the logo is present
    expect(screen.getByAltText("Starwars logo")).toBeInTheDocument();

    // Check if the GO TO LIST button is present
    expect(screen.getByText("GO TO LIST")).toBeInTheDocument();
  });

  it('renders logo but not GO TO LIST button for the path "/"', () => {
    usePathname.mockReturnValue("/");

    render(<Header />);

    // Check if the logo is present
    expect(screen.getByAltText("Starwars logo")).toBeInTheDocument();

    // Check if the GO TO LIST button is not present
    expect(screen.queryByText("GO TO LIST")).not.toBeInTheDocument();
  });

  it('renders logo but not GO TO LIST button for the path "/heroesList"', () => {
    usePathname.mockReturnValue("/heroesList");

    render(<Header />);

    // Check if the logo is present
    expect(screen.getByAltText("Starwars logo")).toBeInTheDocument();

    // Check if the GO TO LIST button is not present
    expect(screen.queryByText("GO TO LIST")).not.toBeInTheDocument();
  });
});
