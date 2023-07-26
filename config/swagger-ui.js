const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Wallet app API",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "https://wallet-backend-efx6.onrender.com",
      },
    ],
  },
  apis: ["./service/swagger.js"],
};

const specs = swaggerJsdoc(options);
module.exports = {
  swaggerSpecs: specs,
  swaggerUi,
};
