import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const mockOnNextClick = jest.fn();
  const mockOnPreviousClick = jest.fn();
  const mockOnNumberClick = jest.fn();

  const renderComponent = (currentPage, pages) => {
    render(
      <Pagination
        pages={pages}
        currentPage={currentPage}
        onNextClick={mockOnNextClick}
        onPreviousClick={mockOnPreviousClick}
        onNumberClick={mockOnNumberClick}
      />
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders pagination buttons correctly", () => {
    renderComponent(1, 5);

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(i)).toBeInTheDocument();
    }
  });

  it("disables the Previous button on the first page", () => {
    renderComponent(1, 5);

    expect(screen.getByText("Previous")).toBeDisabled();
  });

  it("disables the Next button on the last page", () => {
    renderComponent(5, 5);

    expect(screen.getByText("Next")).toBeDisabled();
  });

  it("calls onPreviousClick when the Previous button is clicked", () => {
    renderComponent(2, 5);

    const previousButton = screen.getByText("Previous");
    fireEvent.click(previousButton);

    expect(mockOnPreviousClick).toHaveBeenCalled();
  });

  it("calls onNextClick when the Next button is clicked", () => {
    renderComponent(2, 5);

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(mockOnNextClick).toHaveBeenCalled();
  });

  it("calls onNumberClick when a page number is clicked", () => {
    renderComponent(2, 5);

    const pageNumberButton = screen.getByText("3");
    fireEvent.click(pageNumberButton);

    expect(mockOnNumberClick).toHaveBeenCalledWith(3);
  });

  it('highlights the current page number', () => {
    renderComponent(2, 5);
  
    const currentPageButton = screen.getByRole('button', { name: '2' });
    expect(currentPageButton).toHaveClass('bg-black text-white');
  });
});
