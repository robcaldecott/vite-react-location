import { ComponentMeta, ComponentStory } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";
import { rest } from "msw";
import {
  ReactLocation,
  Router,
  Link,
  createMemoryHistory,
} from "@tanstack/react-location";
import { Button, Text } from "@/components";
import { Create } from ".";

export default {
  title: "Pages/Create",
  component: Create,
  decorators: [
    (Story) => (
      <Router
        location={
          new ReactLocation({
            history: createMemoryHistory({
              initialEntries: ["/", "/create"],
              initialIndex: 1,
            }),
          })
        }
        routes={[
          {
            path: "/",
            element: (
              <div className="flex flex-col space-y-2 items-start">
                <Text variant="h1" component="h1">
                  Home
                </Text>
                <Button variant="primary" component={Link} to="/create">
                  Create
                </Button>
              </div>
            ),
          },
          {
            path: "/create",
            element: <Story />,
          },
        ]}
      />
    ),
  ],
} as ComponentMeta<typeof Create>;

const Template: ComponentStory<typeof Create> = () => <Create />;

export const Empty = Template.bind({});
Empty.parameters = {
  msw: {
    handlers: [
      rest.post("/api/vehicles", (req, res, ctx) => res(ctx.json({}))),
    ],
  },
};

const fillForm = async (canvasElement: HTMLElement) => {
  const canvas = within(canvasElement);
  await userEvent.selectOptions(
    canvas.getByRole("combobox", { name: /make/i }),
    ["Audi"]
  );
  await userEvent.type(canvas.getByRole("textbox", { name: /model/i }), "A4");
  await userEvent.type(
    canvas.getByRole("textbox", { name: /variant/i }),
    "Saloon"
  );
  await userEvent.selectOptions(
    canvas.getByRole("combobox", { name: /fuel/i }),
    ["Gasoline"]
  );
  await userEvent.selectOptions(
    canvas.getByRole("combobox", { name: /colour/i }),
    ["Black"]
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /registration number/i }),
    "ABC 123"
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /vin/i }),
    "ABCDEF1234567890"
  );
  await userEvent.type(
    canvas.getByRole("textbox", { name: /mileage/i }),
    "12345"
  );
  await userEvent.type(
    canvas.getByLabelText(/registration date/i),
    "2000-01-01"
  );
};

export const Filled = Template.bind({});
Filled.parameters = Empty.parameters;
Filled.play = async ({ canvasElement }) => {
  await fillForm(canvasElement);
};

export const Submit = Template.bind({});
Submit.parameters = {
  msw: {
    handlers: [
      rest.post("/api/vehicles", (req, res, ctx) => res(ctx.delay("infinite"))),
    ],
  },
};
Submit.play = async ({ canvasElement }) => {
  await fillForm(canvasElement);
  // Submit
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button", { name: /create/i }));
};

export const InvalidMileage = Template.bind({});
InvalidMileage.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.type(
    canvas.getByRole("textbox", { name: /mileage/i }),
    "abc"
  );
  await userEvent.tab();
  await canvas.findByText(/please enter a valid mileage/i);
};
