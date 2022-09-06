const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    dev: 'http://localhost:3001/api',
    prod: 'http://cms.chtoma.com/api',
    managerToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmFnZXJAYWRtaW4uY29tIiwicm9sZSI6Im1hbmFnZXIiLCJpZCI6MywiaWF0IjoxNjYyNDQ0Njc5LCJleHAiOjE2NzAyMjA2Nzl9.JjSm3CI3vcqGc0bleEIOiwKchrHwHkpubz27rwDrFbk",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      //https://cms-lyart.vercel.app/
      //http://localhost:3000
    },
    baseUrl: "https://cms-lyart.vercel.app/",
  },
});
