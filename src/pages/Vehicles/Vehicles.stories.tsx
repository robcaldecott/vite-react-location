import {
  ComponentMeta,
  ComponentStory,
  ReactFramework,
} from "@storybook/react";
import { DecoratorFunction } from "@storybook/csf";
import { userEvent, within } from "@storybook/testing-library";
import {
  ReactLocation,
  Router,
  createMemoryHistory,
} from "@tanstack/react-location";
import { Vehicle } from "@/types";
import { FilterProvider } from "@/providers";
import { Vehicles } from ".";

export default {
  title: "Pages/Vehicles",
  component: Vehicles,
  decorators: [
    (Story) => (
      <FilterProvider>
        <Story />
      </FilterProvider>
    ),
  ],
} as ComponentMeta<typeof Vehicles>;

const Template: ComponentStory<typeof Vehicles> = () => <Vehicles />;

const vehicles: Vehicle[] = [
  {
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
  },
  {
    id: "76156b22-516e-44e7-b38b-3bacd47e34fa",
    manufacturer: "Ferrari",
    model: "Challenger",
    type: "Passenger Van",
    fuel: "Hybrid",
    vin: "8PE1CGGMU9G882341",
    color: "orchid",
    mileage: 48410,
    registrationDate: "2004-05-15T23:10:44.873Z",
    registrationNumber: "WY24 DGE",
  },
];

const makeDecorators = (
  vehicles: Vehicle[]
): DecoratorFunction<ReactFramework, unknown>[] => [
  (Story) => (
    <Router
      location={
        new ReactLocation({
          history: createMemoryHistory(),
        })
      }
      routes={[
        {
          path: "/",
          element: <Story />,
          loader: () => ({ vehicles }),
        },
      ]}
    />
  ),
];

export const Success = Template.bind({});
Success.decorators = makeDecorators(vehicles);

export const Empty = Template.bind({});
Empty.decorators = makeDecorators([]);

export const Filtered = Template.bind({});
Filtered.decorators = makeDecorators(vehicles);
Filtered.play = async (context) => {
  const canvas = within(context.canvasElement);
  const input = await canvas.findByRole("textbox");
  await userEvent.type(input, "volk");
};
