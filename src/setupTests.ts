import { expect, afterEach, afterAll } from "vitest";
import "whatwg-fetch";
import matchers from "@testing-library/jest-dom/matchers";
import { setGlobalConfig } from "@storybook/testing-react";
import { cleanup } from "@testing-library/react";
import { getWorker } from "msw-storybook-addon";
import * as globalStorybookConfig from "../.storybook/preview";

Object.defineProperty(window, "scrollTo", { value: () => {}, writable: true });

setGlobalConfig(globalStorybookConfig);

expect.extend(matchers);

afterEach(cleanup);

// @ts-ignore
afterAll(() => getWorker().close());
