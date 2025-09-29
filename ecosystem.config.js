module.exports = {
  apps: [
    {
      name: "mm-smart-app",
      script: ".output/server/index.mjs",
      env: {
        NODE_ENV: "production",
        MAIL_USER: "matko.matus22@gmail.com",
        MAIL_PASS: "kdps ztyy bjxf hpdp",
        MAIL_TO: "matko.matus22@gmail.com"
      }
    }
  ]
}
