const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { swaggerUi, swaggerSpecs } = require("./config/swagger-ui");

require("./config/config-passport");

const usersRouter = require("./routes/users");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use((req, res) => {
  res.status(404).json({
    status: "Not found",
    code: 404,
    message: "Use api on routes: /users",
  });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({
    status: "Internal Server Error",
    code: 500,
    message: err.message,
  });
});
module.exports = app;
