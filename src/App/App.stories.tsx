import { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { ReactLocation, createMemoryHistory } from "@tanstack/react-location";
import { handlers } from "@/mocks/handlers";
import { ThemeProvider } from "@/providers";
import type { LocationGenerics } from "@/types";
import { App } from "./App";

export default {
  title: "App",
  component: App,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    msw: {
      handlers,
    },
  },
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = () => (
  <App
    location={
      new ReactLocation<LocationGenerics>({ history: createMemoryHistory() })
    }
  />
);

export const Home = Template.bind({});

export const Create = Template.bind({});
Create.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.click(await canvas.findByRole("link", { name: /create/i }));
  await canvas.findByRole("heading", { name: /create new vehicle/i });
};

export const Details = Template.bind({});
Details.play = async (context) => {
  const canvas = within(context.canvasElement);
  // Wait for the vehicles to load
  await canvas.findByRole("heading", { name: /vehicles/i });
  // Select a user
  const list = within(canvas.getByRole("list"));
  // Click on the first user
  await userEvent.click(list.getAllByRole("link")[0]);
  // Wait for the page to load
  await canvas.findByLabelText(/vehicle details/i);
};
