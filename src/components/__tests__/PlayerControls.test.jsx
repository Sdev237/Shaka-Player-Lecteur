import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PlayerControls from "../PlayerControls";

describe("PlayerControls Component", () => {
  const defaultProps = {
    avancer: jest.fn(),
    reculer: jest.fn(),
    handleGoLiveOrVod: jest.fn(),
    isCurrentlyLive: false,
    selectedQuality: "auto",
    handleQualityChange: jest.fn(),
    qualities: [
      { id: "1", height: 1080 },
      { id: "2", height: 720 },
    ],
    selectedAudio: "auto",
    handleAudioChange: jest.fn(),
    audioTracks: [{ language: "fr" }, { language: "en" }],
    selectedText: "off",
    handleTextChange: jest.fn(),
    textTracks: [{ language: "fr" }, { language: "en" }],
    handleOpenPlaylist: jest.fn(),
  };

  test("renders all controls", () => {
    const { getByText, getByRole } = render(
      <PlayerControls {...defaultProps} />
    );

    expect(getByText("⏪ 10s")).toBeInTheDocument();
    expect(getByText("10s ⏩")).toBeInTheDocument();
    expect(getByText("Passer en direct")).toBeInTheDocument();
    expect(getByText("Playlist")).toBeInTheDocument();

    const qualitySelect = getByRole("combobox", { name: /qualité/i });
    expect(qualitySelect).toBeInTheDocument();
  });

  test("handles forward button click", () => {
    const { getByText } = render(<PlayerControls {...defaultProps} />);
    fireEvent.click(getByText("10s ⏩"));
    expect(defaultProps.avancer).toHaveBeenCalledTimes(1);
  });

  test("handles backward button click", () => {
    const { getByText } = render(<PlayerControls {...defaultProps} />);
    fireEvent.click(getByText("⏪ 10s"));
    expect(defaultProps.reculer).toHaveBeenCalledTimes(1);
  });

  test("handles live button click", () => {
    const { getByText } = render(<PlayerControls {...defaultProps} />);
    fireEvent.click(getByText("Passer en direct"));
    expect(defaultProps.handleGoLiveOrVod).toHaveBeenCalledTimes(1);
  });

  test("shows correct live button text", () => {
    const { getByText, rerender } = render(
      <PlayerControls {...defaultProps} />
    );
    expect(getByText("Passer en direct")).toBeInTheDocument();

    rerender(<PlayerControls {...defaultProps} isCurrentlyLive={true} />);
    expect(getByText("Retour VOD")).toBeInTheDocument();
  });

  test("handles quality change", () => {
    const { getByRole } = render(<PlayerControls {...defaultProps} />);
    const qualitySelect = getByRole("combobox", { name: /qualité/i });
    fireEvent.change(qualitySelect, { target: { value: "1" } });
    expect(defaultProps.handleQualityChange).toHaveBeenCalled();
  });

  test("handles audio track change", () => {
    const { getByRole } = render(<PlayerControls {...defaultProps} />);
    const audioSelect = getByRole("combobox", { name: /audio/i });
    fireEvent.change(audioSelect, { target: { value: "fr" } });
    expect(defaultProps.handleAudioChange).toHaveBeenCalled();
  });

  test("handles text track change", () => {
    const { getByRole } = render(<PlayerControls {...defaultProps} />);
    const textSelect = getByRole("combobox", { name: /sous-titres/i });
    fireEvent.change(textSelect, { target: { value: "fr" } });
    expect(defaultProps.handleTextChange).toHaveBeenCalled();
  });

  test("handles playlist button click", () => {
    const { getByText } = render(<PlayerControls {...defaultProps} />);
    fireEvent.click(getByText("Playlist"));
    expect(defaultProps.handleOpenPlaylist).toHaveBeenCalledTimes(1);
  });
});
