import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "./App";

vi.mock("@/lib/api-client", () => ({
  apiClient: {
    get: vi.fn().mockResolvedValue({
      status: "ok",
      info: { memory_heap: { status: "up" } },
    }),
  },
}));

vi.mock("@/config/env", () => ({
  env: { VITE_API_URL: "http://localhost:3000" },
}));

describe("App", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the heading", () => {
    render(<App />);
    expect(screen.getByText("AWS Nest React Starter")).toBeInTheDocument();
  });

  it("renders the health check description", () => {
    render(<App />);
    expect(screen.getByText("API Health Check")).toBeInTheDocument();
  });
});
