import { DecoratorFn } from "@storybook/react";
import { IntlProvider } from "react-intl";
import { initialize, mswDecorator } from "msw-storybook-addon";
import "../src/main.css";

initialize({ onUnhandledRequest: "bypass" });

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  darkMode: {
    stylePreview: true,
  },
  options: {
    storySort: {
      order: ["App"],
    },
  },
};

export const decorators: DecoratorFn[] = [
  mswDecorator as DecoratorFn,
  (Story) => (
    <IntlProvider locale="en">
      <Story />
    </IntlProvider>
  ),
];
