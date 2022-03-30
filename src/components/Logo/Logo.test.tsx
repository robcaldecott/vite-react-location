import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Logo } from ".";

it("renders", () => {
  render(<Logo />);
  expect(screen.getByRole("img", { name: /vite logo/i })).toBeInTheDocument();
});
