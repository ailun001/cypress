const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    dev: 'http://localhost:3001/api',
    prod: 'http://cms.chtoma.com/api',

  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //https://cms-lyart.vercel.app/
      //http://localhost:3000
    },
    baseUrl: "http://localhost:3000",
  },
});
