import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PlaylistMenu from "../PlaylistMenu";

describe("PlaylistMenu Component", () => {
  const defaultProps = {
    show: true,
    onClose: jest.fn(),
    playlist: [
      { url: "1", titre: "Video 1", sousTitre: "Sub 1" },
      { url: "2", titre: "Video 2", sousTitre: "Sub 2" },
    ],
    currentIndex: 0,
    onSelect: jest.fn(),
  };

  test("renders nothing when show is false", () => {
    const { container } = render(
      <PlaylistMenu {...defaultProps} show={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test("renders playlist items", () => {
    const { getByText } = render(<PlaylistMenu {...defaultProps} />);
    expect(getByText("Video 1")).toBeInTheDocument();
    expect(getByText("Video 2")).toBeInTheDocument();
    expect(getByText("(Sub 1)")).toBeInTheDocument();
    expect(getByText("(Sub 2)")).toBeInTheDocument();
  });

  test("handles close button click", () => {
    const { getByText } = render(<PlaylistMenu {...defaultProps} />);
    fireEvent.click(getByText("X"));
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test("handles playlist item click", () => {
    const { getByText } = render(<PlaylistMenu {...defaultProps} />);
    fireEvent.click(getByText("Video 2"));
    expect(defaultProps.onSelect).toHaveBeenCalledWith(1);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(2);
  });

  test("applies active class to current item", () => {
    const { getByText } = render(<PlaylistMenu {...defaultProps} />);
    const activeItem = getByText("Video 1").closest("button");
    expect(activeItem).toHaveClass("active");
  });

  test("renders close button", () => {
    const { getByText } = render(<PlaylistMenu {...defaultProps} />);
    const closeButton = getByText("X");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass("lecteur-playlist-close");
  });

  test("renders playlist items with correct structure", () => {
    const { getByText } = render(<PlaylistMenu {...defaultProps} />);
    const item = getByText("Video 1").closest("button");
    expect(item).toHaveClass("lecteur-playlist-item");
    expect(item).toHaveTextContent("Video 1");
    expect(item).toHaveTextContent("(Sub 1)");
  });
});
