import { beforeEach, describe, it, vi, expect, afterEach } from "vitest";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { AddInsight } from "./add-insight.tsx";

describe("<AddInsight />", () => {
  let component: ReturnType<typeof render>;
  const mockOnClose = vi.fn();
  const mockReloadInsights = vi.fn();

  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(),
    })
  ) as unknown as typeof fetch;

  beforeEach(() => {
    mockOnClose.mockReset();
    mockReloadInsights.mockReset();

    component = render(
      <AddInsight
        onClose={mockOnClose}
        open
        reloadInsights={mockReloadInsights}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  it("renders as expected", () => {
    expect(component).toBeTruthy();
    expect(component.getByText("Add a new insight")).toBeTruthy();
    expect(component.getByRole("combobox", { name: "" })).toBeInTheDocument();
    expect(
      component.getByPlaceholderText("Something insightful...")
    ).toBeInTheDocument();
    expect(
      component.getByRole("button", { name: /add insight/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors if form is submitted empty", () => {
    fireEvent.click(component.getByRole("button", { name: /add insight/i }));
    expect(
      component.getByText("Please enter some insight")
    ).toBeInTheDocument();
  });

  it("submits, closes and reloads the form when valid data is provided", async () => {
    fireEvent.change(component.getByRole("combobox", { name: "" }), {
      target: { value: "1" },
    });
    fireEvent.change(
      component.getByPlaceholderText("Something insightful..."),
      {
        target: { value: "This is a test insight" },
      }
    );
    fireEvent.click(component.getByRole("button", { name: /add insight/i }));

    await waitFor(() => {
      expect(mockReloadInsights).toHaveBeenCalled();
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
