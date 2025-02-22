const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  e2e: {
    baseUrl:"https://guest:welcome2qauto@qauto.forstudy.space/",
//baseUrl: "https://qauto.forstudy.space/",
    chromeWebSecurity: false,


    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    video: true,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false,

  },

  env: {
    USERNAME: '123qwer@qwerty6.qwe',
    PASSWORD: '123Qazwsx',
  } 

});
