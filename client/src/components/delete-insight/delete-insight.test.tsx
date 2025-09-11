import { beforeEach, describe, it, vi, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { DeleteInsight } from "./delete-insight.tsx";

describe("<DeleteInsight />", () => {
  const mockOnClose = vi.fn();
  const mockReloadInsights = vi.fn();

  beforeEach(() => {
    // Reset mocks
    mockOnClose.mockReset();
    mockReloadInsights.mockReset();

    // Mock fetch
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    cleanup();
  });

  it("renders as expected", () => {
    const { getByText, getByRole } = render(
      <DeleteInsight
        open
        onClose={mockOnClose}
        reloadInsights={mockReloadInsights}
        insightId={42}
        text="A test insight"
      />
    );

    expect(getByText("Are you sure ?")).toBeInTheDocument();
    expect(getByText(/A test insight/)).toBeInTheDocument();
    expect(getByRole("button", { name: /confirm/i })).toBeInTheDocument();
    expect(getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("calls DELETE, reloads and closes on confirm", async () => {
    const { getByRole } = render(
      <DeleteInsight
        open
        onClose={mockOnClose}
        reloadInsights={mockReloadInsights}
        insightId={42}
        text="A test insight"
      />
    );

    fireEvent.click(getByRole("button", { name: /confirm/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith("/api/insights/42", {
        method: "DELETE",
      });
      expect(mockReloadInsights).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it("closes without deleting on cancel", () => {
    const { getByRole } = render(
      <DeleteInsight
        open
        onClose={mockOnClose}
        reloadInsights={mockReloadInsights}
        insightId={42}
        text="A test insight"
      />
    );

    fireEvent.click(getByRole("button", { name: /cancel/i }));

    expect(mockOnClose).toHaveBeenCalled();
    expect(mockReloadInsights).not.toHaveBeenCalled();
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
