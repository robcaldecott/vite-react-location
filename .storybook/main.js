const path = require("path");

module.exports = {
  addons: [
    {
      name: "@storybook/addon-essentials",
      options: { backgrounds: false },
    },
    "storybook-dark-mode",
    "@storybook/addon-interactions",
  ],
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  features: {
    interactionsDebugger: true,
    storyStoreV7: true,
  },
  staticDirs: ["../public"],
  framework: "@storybook/react",
  core: {
    builder: "storybook-builder-vite",
  },
  async viteFinal(config, { configType }) {
    config.optimizeDeps = {
      ...(config.optimizeDeps || {}),
      include: [
        ...(config?.optimizeDeps?.include || []),
        // Imports from preview.tsx
        "msw-storybook-addon",
        "storybook-dark-mode",
        "react-intl",
      ],
    };
    config.resolve = {
      ...config.resolve,
      alias: {
        "@": path.resolve(__dirname, "../src"),
      },
    };
    return config;
  },
};
