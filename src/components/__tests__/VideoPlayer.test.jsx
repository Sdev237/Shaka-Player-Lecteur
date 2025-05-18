import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import VideoPlayer from "../VideoPlayer";

// Mock shaka player
jest.mock("shaka-player", () => {
  return {
    Player: jest.fn().mockImplementation(() => ({
      load: jest.fn().mockResolvedValue(undefined),
      destroy: jest.fn(),
      configure: jest.fn(),
      getVariantTracks: jest.fn().mockReturnValue([
        { id: "1", height: 1080 },
        { id: "2", height: 720 },
      ]),
      getTextTracks: jest
        .fn()
        .mockReturnValue([{ language: "fr" }, { language: "en" }]),
      isLive: jest.fn().mockReturnValue(false),
      seekRange: jest.fn().mockReturnValue({ end: 100 }),
      selectVariantTrack: jest.fn(),
      selectTextLanguage: jest.fn(),
      selectAudioLanguage: jest.fn(),
      setTextTrackVisibility: jest.fn(),
    })),
  };
});

describe("VideoPlayer Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test("renders video player with initial state", () => {
    const { getByTestId } = render(<VideoPlayer />);
    const video = getByTestId("video-player");
    expect(video).toBeInTheDocument();
  });

  test("initializes with first VOD video", () => {
    const { getByText } = render(<VideoPlayer />);
    expect(getByText("Captain Luck (Angel One)")).toBeInTheDocument();
  });

  test("handles quality change", async () => {
    const { getByRole } = render(<VideoPlayer />);
    const qualitySelect = getByRole("combobox", { name: /qualité/i });

    await act(async () => {
      fireEvent.change(qualitySelect, { target: { value: "1" } });
    });
  });

  test("handles audio track change", async () => {
    const { getByRole } = render(<VideoPlayer />);
    const audioSelect = getByRole("combobox", { name: /audio/i });

    await act(async () => {
      fireEvent.change(audioSelect, { target: { value: "fr" } });
    });
  });

  test("handles text track change", async () => {
    const { getByRole } = render(<VideoPlayer />);
    const textSelect = getByRole("combobox", { name: /sous-titres/i });

    await act(async () => {
      fireEvent.change(textSelect, { target: { value: "fr" } });
    });
  });

  test("handles forward button click", () => {
    const { getByText } = render(<VideoPlayer />);
    const forwardButton = getByText("10s ⏩");
    fireEvent.click(forwardButton);
  });

  test("handles backward button click", () => {
    const { getByText } = render(<VideoPlayer />);
    const backwardButton = getByText("⏪ 10s");
    fireEvent.click(backwardButton);
  });

  test("handles live button click", async () => {
    const { getByText } = render(<VideoPlayer />);
    const liveButton = getByText("Passer en direct");

    await act(async () => {
      fireEvent.click(liveButton);
    });
  });

  test("handles playlist button click", () => {
    const { getByText } = render(<VideoPlayer />);
    const playlistButton = getByText("Playlist");
    fireEvent.click(playlistButton);
  });

  test("cleans up on unmount", () => {
    const { unmount } = render(<VideoPlayer />);
    unmount();
  });
});