const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
//baseUrl:"https://guest:welcome2qauto@qauto.forstudy.space/",
baseUrl: "https://qauto.forstudy.space/",
chromeWebSecurity: false
  },
  // env: {
  //   USERNAME: 'guest',
  //   PASSWORD: 'welcome2qauto',
  // },
});
