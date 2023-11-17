/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from "@storybook/react-native";

global.STORIES = [
  {
    titlePrefix: "",
    directory: "./src",
    files: "**/*.stories.?(ts|tsx|js|jsx)",
    importPathMatcher:
      "^\\.[\\\\/](?:src(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$",
  },
];

import "@storybook/addon-ondevice-notes/register";
import "@storybook/addon-ondevice-controls/register";
import "@storybook/addon-ondevice-backgrounds/register";
import "@storybook/addon-ondevice-actions/register";

import { argsEnhancers } from "@storybook/addon-actions/dist/modern/preset/addArgs";

import { decorators, parameters } from "./preview";

if (decorators) {
  if (__DEV__) {
    // stops the warning from showing on every HMR
    require("react-native").LogBox.ignoreLogs([
      "`clearDecorators` is deprecated and will be removed in Storybook 7.0",
    ]);
  }
  // workaround for global decorators getting infinitely applied on HMR, see https://github.com/storybookjs/react-native/issues/185
  clearDecorators();
  decorators.forEach((decorator) => addDecorator(decorator));
}

if (parameters) {
  addParameters(parameters);
}

try {
  argsEnhancers.forEach((enhancer) => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    "./src/stories/Accordion.stories.tsx": require("../src/stories/Accordion.stories.tsx"),
    "./src/stories/Button.stories.tsx": require("../src/stories/Button.stories.tsx"),
    "./src/stories/Card.stories.tsx": require("../src/stories/Card.stories.tsx"),
    "./src/stories/Checkbox.stories.tsx": require("../src/stories/Checkbox.stories.tsx"),
    "./src/stories/CodeInput.stories.tsx": require("../src/stories/CodeInput.stories.tsx"),
    "./src/stories/CountDown.stories.tsx": require("../src/stories/CountDown.stories.tsx"),
    "./src/stories/Progress.stories.tsx": require("../src/stories/Progress.stories.tsx"),
    "./src/stories/RadioButton.stories.tsx": require("../src/stories/RadioButton.stories.tsx"),
    "./src/stories/Slider.stories.tsx": require("../src/stories/Slider.stories.tsx"),
    "./src/stories/Text.stories.tsx": require("../src/stories/Text.stories.tsx"),
    "./src/stories/TextInput.stories.tsx": require("../src/stories/TextInput.stories.tsx"),
  };
};

configure(getStories, module, false);
