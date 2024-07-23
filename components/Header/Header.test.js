import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Header from "./Header"; // Adjust the import path as needed

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

jest.mock('next/link', () => {
  return ({ children, href }) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

jest.mock('next/image', () => {
  return ({ src, alt }) => (
    <img src={src} alt={alt} data-testid="image" />
  );
});

describe("Header Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Star Wars logo", () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/');

    render(<Header />);
    const logo = screen.getByAltText("Starwars logo");
    expect(logo).toBeInTheDocument();
  });

  it("does not show the 'GO TO LIST' button on the '/' path", () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/');

    render(<Header />);
    const button = screen.queryByText("GO TO LIST");
    expect(button).not.toBeInTheDocument();
  });

  it("shows the 'GO TO LIST' button on a path other than '/' and '/heroesList'", () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/otherpath');

    render(<Header />);
    const button = screen.getByText("GO TO LIST");
    expect(button).toBeInTheDocument();
  });

  it("does not show the 'GO TO LIST' button on the '/heroesList' path", () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/heroesList');

    render(<Header />);
    const button = screen.queryByText("GO TO LIST");
    expect(button).not.toBeInTheDocument();
  });

  it("contains a link to the home page", () => {
    const { usePathname } = require('next/navigation');
    usePathname.mockReturnValue('/');

    render(<Header />);
    const homeLink = screen.getByTestId("link");
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
