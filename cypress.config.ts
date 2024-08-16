import { defineConfig } from "cypress";

export default defineConfig({
  //component: {
  //   devServer: {
  //     framework: "react",
  //      bundler: "webpack",
  //   },
  //  },
  e2e: {
    baseUrl: "http://localhost:4000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000
  },
});
