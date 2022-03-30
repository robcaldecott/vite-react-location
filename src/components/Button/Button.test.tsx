import { vi, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

test("click", () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Label</Button>);
  userEvent.click(screen.getByRole("button", { name: /label/i }));
  expect(handleClick).toHaveBeenCalled();
});

test("disabled", () => {
  const handleClick = vi.fn();
  render(
    <Button disabled onClick={handleClick}>
      Label
    </Button>
  );
  userEvent.click(screen.getByRole("button", { name: /label/i, hidden: true }));
  expect(handleClick).not.toHaveBeenCalled();
});
