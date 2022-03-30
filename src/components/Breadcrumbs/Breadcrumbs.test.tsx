import { it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { ReactLocation, Router } from "@tanstack/react-location";
import { Breadcrumbs } from ".";

it("renders with a home link only", () => {
  render(
    <Router location={new ReactLocation()} routes={[]}>
      <IntlProvider locale="en">
        <Breadcrumbs />
      </IntlProvider>
    </Router>
  );
  const nav = within(screen.getByRole("navigation"));
  const list = within(nav.getByRole("list"));
  const item = within(list.getByRole("listitem"));
  expect(item.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
});

it("renders with a registration number", () => {
  render(
    <Router location={new ReactLocation()} routes={[]}>
      <IntlProvider locale="en">
        <Breadcrumbs registrationNumber="ABC 123" />
      </IntlProvider>
    </Router>
  );
  const nav = within(screen.getByRole("navigation"));
  const list = within(nav.getByRole("list"));
  // We should have two items (the separator is hidden)
  const items = list.getAllByRole("listitem");
  expect(items).toHaveLength(2);
  // Home link
  const home = within(items[0]);
  expect(home.getByRole("link", { name: /home/i })).toHaveAttribute(
    "href",
    "/"
  );
  // Reg
  expect(items[1]).toHaveTextContent(/abc 123/i);
});
