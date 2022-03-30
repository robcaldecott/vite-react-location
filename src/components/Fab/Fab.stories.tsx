import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PlusIcon } from "@heroicons/react/solid";
import {
  ReactLocation,
  Router,
  createMemoryHistory,
  Link,
} from "@tanstack/react-location";
import { Fab } from "./Fab";

export default {
  title: "Components/Fab",
  component: Fab,
} as ComponentMeta<typeof Fab>;

const Template: ComponentStory<typeof Fab> = (args) => <Fab {...args} />;

export const Icon = Template.bind({});
Icon.args = {
  icon: PlusIcon,
};

export const Label = Template.bind({});
Label.args = {
  icon: PlusIcon,
  label: "Create Vehicle",
};

export const Fixed = Template.bind({});
Fixed.args = {
  className: "fixed bottom-8 right-8",
  icon: PlusIcon,
};

export const AsLink = Template.bind({});
AsLink.args = {
  icon: PlusIcon,
  component: Link,
  to: "/",
};
AsLink.decorators = [
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
];
