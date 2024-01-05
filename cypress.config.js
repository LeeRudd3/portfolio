const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    api: 'http://localhost:3001',
    adminUsername: 'leerudd3@gmail.com',
    adminPassword: 'Black@berry1',
  },
});
