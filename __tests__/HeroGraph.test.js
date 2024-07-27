import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HeroGraph from "@/app/ui/HeroGraph/HeroGraph";

// Mock the @xyflow/react module
jest.mock("@xyflow/react", () => ({
  ReactFlow: jest.fn(({ children }) => <div>{children}</div>),
  Controls: jest.fn(() => <div>Controls Component</div>),
  Background: jest.fn(() => <div>Background Component</div>),
}));

describe("HeroGraph Component", () => {
  it("renders ReactFlow with nodes and edges", () => {
    const mockNodes = [
      { id: "1", data: { label: "Node 1" }, position: { x: 0, y: 0 } },
    ];
    const mockEdges = [{ id: "e1", source: "1", target: "2" }];

    render(<HeroGraph nodes={mockNodes} edges={mockEdges} />);

    // Check if the ReactFlow component is rendered with children
    expect(screen.getByText("Controls Component")).toBeInTheDocument();
    expect(screen.getByText("Background Component")).toBeInTheDocument();
  });

  it("renders Controls and Background components", () => {
    const mockNodes = [];
    const mockEdges = [];

    render(<HeroGraph nodes={mockNodes} edges={mockEdges} />);

    // Verify that Controls and Background components are rendered
    expect(screen.getByText("Controls Component")).toBeInTheDocument();
    expect(screen.getByText("Background Component")).toBeInTheDocument();
  });

  it("renders without crashing", () => {
    render(<HeroGraph nodes={[]} edges={[]} />);
    // Test that no unexpected errors occur during rendering
    expect(screen.getByText("Controls Component")).toBeInTheDocument();
    expect(screen.getByText("Background Component")).toBeInTheDocument();
  });
});
