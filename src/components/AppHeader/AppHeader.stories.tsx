import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "@/components";
import { ThemeProvider } from "@/providers";
import { AppHeader } from ".";

export default {
  title: "Components/AppHeader",
  component: AppHeader,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof AppHeader>;

const Template: ComponentStory<typeof AppHeader> = (args) => (
  <AppHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Application Title",
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  title: "The quick brown fox jumps over the lazy dog",
};

export const PageContent = Template.bind({});
PageContent.args = {
  title: "Scrollable Content Example",
};
PageContent.decorators = [
  (Story) => (
    <>
      <Story />
      {[...Array(100).keys()].map((key) => (
        <Text key={key}>This is line {key + 1}</Text>
      ))}
    </>
  ),
];
