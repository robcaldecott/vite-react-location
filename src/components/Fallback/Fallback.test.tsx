import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fallback } from ".";

it("renders", () => {
  render(<Fallback />);
  expect(screen.getByRole("img", { name: /vite logo/i })).toBeInTheDocument();
});
