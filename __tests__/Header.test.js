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

  it('renders logo and Go to list button for paths other than "/" and "/heroesList"', () => {
    usePathname.mockReturnValue("/some-other-path");

    render(<Header />);

    // Check if the logo is present
    expect(screen.getByAltText("Starwars logo")).toBeInTheDocument();

    // Check if the Go to list button is present
    expect(screen.getByText("Go to list")).toBeInTheDocument();
  });

  it('renders logo but not Go to list button for the path "/"', () => {
    usePathname.mockReturnValue("/");

    render(<Header />);

    // Check if the logo is present
    expect(screen.getByAltText("Starwars logo")).toBeInTheDocument();

    // Check if the Go to list button is not present
    expect(screen.queryByText("Go to list")).not.toBeInTheDocument();
  });

  it('renders logo but not Go to list button for the path "/heroesList"', () => {
    usePathname.mockReturnValue("/heroesList");

    render(<Header />);

    // Check if the logo is present
    expect(screen.getByAltText("Starwars logo")).toBeInTheDocument();

    // Check if the Go to list button is not present
    expect(screen.queryByText("Go to list")).not.toBeInTheDocument();
  });
});
