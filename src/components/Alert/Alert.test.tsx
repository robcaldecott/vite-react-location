import { it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert } from ".";

it("renders without an action", () => {
  render(<Alert label="Label" />);
  expect(screen.getByText(/label/i)).toBeInTheDocument();
});

it("renders with an action", () => {
  render(<Alert label="Label" action={<button>Button</button>} />);
  expect(screen.getByText(/label/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /button/i })).toBeInTheDocument();
});
