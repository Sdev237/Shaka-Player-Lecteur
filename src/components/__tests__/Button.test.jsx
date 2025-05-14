import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../Button";

describe("Button Component", () => {
  test("renders button with default props", () => {
    const { getByRole } = render(<Button>Test Button</Button>);
    const button = getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("lecteur-button");
    expect(button).toHaveClass("lecteur-button-default");
  });

  test("renders button with live variant", () => {
    const { getByRole } = render(<Button variant="live">Live Button</Button>);
    const button = getByRole("button");
    expect(button).toHaveClass("lecteur-button-live");
  });

  test("renders button with playlist variant", () => {
    const { getByRole } = render(
      <Button variant="playlist">Playlist Button</Button>
    );
    const button = getByRole("button");
    expect(button).toHaveClass("lecteur-button-playlist");
  });

  test("handles click events", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    const button = getByRole("button");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("renders disabled button", () => {
    const { getByRole } = render(<Button disabled>Disabled Button</Button>);
    const button = getByRole("button");
    expect(button).toBeDisabled();
  });

  test("applies custom className", () => {
    const { getByRole } = render(
      <Button className="custom-class">Custom Button</Button>
    );
    const button = getByRole("button");
    expect(button).toHaveClass("custom-class");
  });
});
