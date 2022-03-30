import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { DefaultRequestBody, PathParams, rest } from "msw";
import {
  ReactLocation,
  Router,
  Link,
  createMemoryHistory,
} from "@tanstack/react-location";
import { Text, Button } from "@/components";
import { Vehicle } from "@/types";
import { Details } from ".";

let vehicle: Vehicle = {
  id: "5e0562c5-a50b-42ff-83e5-4c004c5b639a",
  manufacturer: "Volkswagen",
  model: "Explorer",
  type: "Cargo Van",
  fuel: "Gasoline",
  vin: "1USTAN9Z5MNT86399",
  color: "teal",
  mileage: 70609,
  registrationDate: "2005-07-08T16:58:36.380Z",
  registrationNumber: "TE52 HWW",
};

export default {
  title: "Pages/Details",
  component: Details,
  decorators: [
    (Story) => (
      <Router
        location={
          new ReactLocation({
            history: createMemoryHistory({
              initialEntries: ["/", "/vehicles/123"],
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
                <Button variant="primary" component={Link} to="/vehicles/123">
                  Details
                </Button>
              </div>
            ),
          },
          {
            path: "/vehicles/:vehicleId",
            element: <Story />,
            loader: () => ({ vehicle }),
          },
        ]}
      />
    ),
  ],
} as ComponentMeta<typeof Details>;

const Template: ComponentStory<typeof Details> = () => <Details />;

export const Success = Template.bind({});
Success.parameters = {
  msw: {
    handlers: [
      rest.delete<DefaultRequestBody, PathParams, { id: string }>(
        "/api/vehicles/:vehicleId",
        (req, res, ctx) => res(ctx.json({ id: "123" }))
      ),
    ],
  },
};

export const Delete = Template.bind({});
Delete.parameters = Success.parameters;
Delete.play = async (context) => {
  const canvas = within(context.canvasElement);
  await userEvent.click(
    await canvas.findByRole("button", { name: /delete vehicle/i })
  );
};

export const HomeBreadcrumb = Template.bind({});
HomeBreadcrumb.parameters = {
  msw: {
    handlers: [
      rest.get<DefaultRequestBody, PathParams, Vehicle>(
        "/api/vehicles/:vehicleId",
        (req, res, ctx) => res(ctx.json(vehicle))
      ),
    ],
  },
};
HomeBreadcrumb.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  // Wait for the card to load
  await canvas.findByLabelText(/vehicle details/i);
  // Click the Home button
  await userEvent.click(canvas.getByRole("link", { name: /home/i }));
  // Wait for the home page
  await canvas.findByRole("heading", { name: /home/i, level: 1 });
};
