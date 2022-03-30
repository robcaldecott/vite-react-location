import { it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { composeStories } from "@storybook/testing-react";
import * as stories from "./Vehicles.stories";

const { Success } = composeStories(stories);

it("renders with data", async () => {
  render(<Success />);
  // Wait for the heading to appear
  expect(
    await screen.findByRole("heading", { name: /vehicles/i })
  ).toBeInTheDocument();
  // Create Fab should be present
  expect(
    screen.getByRole("link", { name: /create vehicle/i })
  ).toBeInTheDocument();
  // We should have 2 users
  expect(screen.getByText("2")).toBeInTheDocument();
  // We should have a search field
  expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  // Get the list
  const list = within(screen.getByRole("list"));
  // We should have two items
  expect(list.getAllByRole("link")).toHaveLength(2);
  // Find the anchor
  let item1 = within(list.getByRole("link", { name: /te52 hww/i }));
  expect(
    item1.getByText(/volkswagen explorer cargo van gasoline/i)
  ).toBeInTheDocument();
  expect(item1.getByText(/te52 hww/i)).toBeInTheDocument();
  // Find the anchor
  let item2 = within(list.getByRole("link", { name: /wy24 dge/i }));
  expect(
    item2.getByText(/ferrari challenger passenger van hybrid/i)
  ).toBeInTheDocument();
  expect(item2.getByText(/wy24 dge/i)).toBeInTheDocument();
});

it("searches", async () => {
  render(<Success />);
  // Filter on "jane"
  userEvent.type(await screen.findByRole("textbox"), "volk");
  // Wait for the count to update
  expect(await screen.findByText("1")).toBeInTheDocument();
  // There should only be one item in the list
  const list = within(screen.getByRole("list"));
  expect(list.getAllByRole("link")).toHaveLength(1);
  expect(
    list.getByRole("link", {
      name: /volkswagen explorer cargo van gasoline/i,
    })
  ).toBeInTheDocument();
});

it("handles no results found", async () => {
  render(<Success />);
  // Filter on "test"
  userEvent.type(await screen.findByRole("textbox"), "test");
  expect(
    await screen.findByRole("heading", {
      name: /no matching vehicles found\./i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(/please try a different filter\./i)
  ).toBeInTheDocument();
});
