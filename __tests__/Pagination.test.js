import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "@/app/ui/Pagination/Pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

// Mock the next/navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

describe("Pagination Component", () => {
  let replace;
  let mockSearchParams;

  beforeEach(() => {
    replace = jest.fn();
    mockSearchParams = new URLSearchParams();

    // Mock implementations of the hooks
    useRouter.mockReturnValue({ replace });
    useSearchParams.mockReturnValue(mockSearchParams);
    usePathname.mockReturnValue("/current-page");
  });

  it("renders pagination buttons correctly", () => {
    render(<Pagination hasNext={true} hasPrevious={true} totalHeroes={30} />);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    for (let i = 1; i <= 3; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("changes page when clicking Next button", () => {
    render(<Pagination hasNext={true} hasPrevious={true} totalHeroes={30} />);

    fireEvent.click(screen.getByText("Next"));

    expect(replace).toHaveBeenCalledWith("/current-page?page=2");
  });

  it("changes page when clicking Previous button", () => {
    mockSearchParams.set("page", "2");

    render(<Pagination hasNext={true} hasPrevious={true} totalHeroes={30} />);

    fireEvent.click(screen.getByText("Previous"));

    expect(replace).toHaveBeenCalledWith("/current-page?page=1");
  });

  it("changes page when clicking on page number", () => {
    render(<Pagination hasNext={true} hasPrevious={true} totalHeroes={30} />);

    fireEvent.click(screen.getByText("2"));

    expect(replace).toHaveBeenCalledWith("/current-page?page=2");
  });

  it("does not render Previous button when hasPrevious is false", () => {
    render(<Pagination hasNext={true} hasPrevious={false} totalHeroes={30} />);

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("does not render Next button when hasNext is false", () => {
    render(<Pagination hasNext={false} hasPrevious={true} totalHeroes={30} />);

    expect(screen.getByText("Next")).toBeDisabled();
  });
});
