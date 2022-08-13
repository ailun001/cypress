const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //https://cms-lyart.vercel.app/
      //http://localhost:3000
    },
    baseUrl: "https://cms-lyart.vercel.app/",
  },
});
