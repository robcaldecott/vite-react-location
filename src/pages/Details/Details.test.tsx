import { test, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Details.stories";

const { Success, HomeBreadcrumb } = composeStories(stories);

test("success", async () => {
  render(<Success />);
  // Wait for the user to load
  expect(await screen.findByLabelText(/vehicle details/i)).toBeInTheDocument();
  // We should have new breadcrumbs
  const breadcrumbs = within(screen.getByRole("navigation"));
  expect(breadcrumbs.getByRole("link", { name: /home/i })).toBeInTheDocument();
  expect(breadcrumbs.getByText(/te52 hww/i)).toBeInTheDocument();
  // Get the card
  const card = within(screen.getByLabelText(/vehicle details/i));
  expect(card.getByText(/volkswagen explorer cargo van/i)).toBeInTheDocument();
  expect(card.getByText(/te52 hww/i)).toBeInTheDocument();
  // Check the colour
  expect(card.getByLabelText(/colour/i)).toHaveTextContent(/teal/i);
  // Check the fuel
  expect(card.getByLabelText(/fuel/i)).toHaveTextContent(/gasoline/i);
  // Check the VIN
  expect(card.getByLabelText(/vin/i)).toHaveTextContent(/1ustan9z5mnt86399/i);
  // Check the mileage
  expect(card.getByLabelText(/mileage/i)).toHaveTextContent(/70,609/i);
  // Check the registration date
  expect(card.getByLabelText(/registration date/i)).toHaveTextContent(
    /friday, july 8, 2005/i
  );
  // Check for a delete button
  expect(
    card.getByRole("button", { name: /delete vehicle/i })
  ).toBeInTheDocument();
});

test("delete vehicle", async () => {
  render(<Success />);
  // Click on the Delete User button when it loads
  userEvent.click(
    await screen.findByRole("button", { name: /delete vehicle/i })
  );
  // Wait for the dialog to appear
  const dialog = within(
    await screen.findByRole("dialog", { name: /delete vehicle/i })
  );
  // Click the Delete button
  userEvent.click(dialog.getByRole("button", { name: /delete/i }));
  // We should end up on the home page
  expect(
    await screen.findByRole("heading", { name: /home/i, level: 1 })
  ).toBeInTheDocument();
});

test("cancels the delete dialog", async () => {
  render(<Success />);
  // Click on the Delete User button when it loads
  userEvent.click(
    await screen.findByRole("button", { name: /delete vehicle/i })
  );
  // Wait for the dialog to appear
  const dialog = within(
    screen.getByRole("dialog", { name: /delete vehicle/i })
  );
  // Click the Cancel button
  userEvent.click(dialog.getByRole("button", { name: /cancel/i }));
  // The dialog should be gone
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("home breadcrumb", async () => {
  const { container } = render(<HomeBreadcrumb />);
  await HomeBreadcrumb.play({ canvasElement: container });
});
