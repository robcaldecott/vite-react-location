import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  ReactLocation,
  Router,
  createMemoryHistory,
} from "@tanstack/react-location";
import { Breadcrumbs } from ".";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
  decorators: [
    (Story) => (
      <Router
        location={
          new ReactLocation({
            history: createMemoryHistory(),
          })
        }
        routes={[]}
      >
        <Story />
      </Router>
    ),
  ],
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const HomeOnly = Template.bind({});

export const RegistrationNumber = Template.bind({});
RegistrationNumber.args = {
  registrationNumber: "ABC 123",
};
