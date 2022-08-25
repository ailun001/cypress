const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    dev: 'http://localhost:3001/api',
    prod: 'http://cms.chtoma.com/api',
    managerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjYxMTc4ODc4LCJleHAiOjE2Njg5NTQ4Nzh9.2rFHkmvCLA_wVX5mU2eGjdNzdr0C19gcEX6tIX6YQI4",
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
