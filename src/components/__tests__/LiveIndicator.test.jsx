import React from "react";
import { render, fireEvent } from "@testing-library/react";
import LiveIndicator from "../LiveIndicator";

describe("LiveIndicator Component", () => {
  const defaultProps = {
    isLive: true,
    isAtLiveEdge: true,
    goToLiveEdge: jest.fn(),
  };

  test("renders nothing when not live", () => {
    const { container } = render(
      <LiveIndicator {...defaultProps} isLive={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renders live indicator when live and at live edge", () => {
    const { getByText } = render(<LiveIndicator {...defaultProps} />);
    expect(getByText("EN DIRECT")).toBeInTheDocument();
  });

  test("renders delay indicator when live but not at live edge", () => {
    const { getByText } = render(
      <LiveIndicator {...defaultProps} isAtLiveEdge={false} />
    );
    expect(getByText("EN RETARD")).toBeInTheDocument();
  });

  test("renders go to live button when not at live edge", () => {
    const { getByText } = render(
      <LiveIndicator {...defaultProps} isAtLiveEdge={false} />
    );
    const button = getByText("Revenir au direct");
    expect(button).toBeInTheDocument();
  });

  test("handles go to live button click", () => {
    const { getByText } = render(
      <LiveIndicator {...defaultProps} isAtLiveEdge={false} />
    );
    fireEvent.click(getByText("Revenir au direct"));
    expect(defaultProps.goToLiveEdge).toHaveBeenCalledTimes(1);
  });

  test("applies correct classes based on live edge status", () => {
    const { getByText, rerender } = render(<LiveIndicator {...defaultProps} />);
    let indicator = getByText("EN DIRECT");
    expect(indicator).not.toHaveClass("lecteur-live-retard");

    rerender(<LiveIndicator {...defaultProps} isAtLiveEdge={false} />);
    indicator = getByText("EN RETARD");
    expect(indicator).toHaveClass("lecteur-live-retard");
  });
});
