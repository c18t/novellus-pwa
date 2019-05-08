const path = require("path");

const handlerCb = ({ url, event, params }) => {
  return fetch(event.request)
    .then(response => {
      return response.text();
    })
    .then(responseBody => {
      return new Response(`${responseBody} <!-- Look Ma. Added Content. -->`);
    });
};

module.exports = {
  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      swDest: "service-worker.js",
      globDirectory: path.join(__dirname, "/dist/"),
      globPatterns: ["*.{js,css,html}"],
      runtimeCaching: [
        {
          urlPattern: /.*\bbook\.html$/,
          handler: handlerCb,
          options: {
            cacheName: "book"
          }
        }
      ]
    }
  }
}