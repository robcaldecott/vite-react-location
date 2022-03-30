import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StarIcon } from "@heroicons/react/solid";
import { Fab } from ".";

test("icon", () => {
  render(<Fab aria-label="fab" icon={StarIcon} />);
  expect(screen.getByRole("button", { name: /fab/i })).toBeInTheDocument();
});

test("label", () => {
  render(<Fab aria-label="fab" icon={StarIcon} label="Label" />);
  expect(screen.getByRole("button", { name: /fab/i })).toBeInTheDocument();
  expect(screen.getByText(/label/i)).toBeInTheDocument();
});

test("anchor", () => {
  render(<Fab component="a" href="/" icon={StarIcon} aria-label="fab" />);
  expect(screen.getByRole("link", { name: /fab/i })).toBeInTheDocument();
});
