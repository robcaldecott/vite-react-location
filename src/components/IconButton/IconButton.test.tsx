import { vi, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HeartIcon } from "@heroicons/react/solid";
import { IconButton } from ".";

it("renders", () => {
  const handleClick = vi.fn();
  render(
    <IconButton icon={HeartIcon} aria-label="Label" onClick={handleClick} />
  );
  userEvent.click(screen.getByRole("button", { name: /label/i }));
  expect(handleClick).toHaveBeenCalled();
});
