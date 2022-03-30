import React from "react";
import ReactDOM from "react-dom";
import { IntlProvider } from "react-intl";
import { ThemeProvider } from "@/providers";
import { App } from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./main.css";

import("./mocks/browser").then(({ worker }) => {
  worker.start({ onUnhandledRequest: "bypass" });
  // Render the app
  ReactDOM.render(
    <React.StrictMode>
      <IntlProvider locale="en-GB" defaultLocale="en-GB">
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </IntlProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
});
