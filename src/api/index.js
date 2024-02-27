const PublicRouter = require("./routers/public.router");
const InternalRouter = require("./routers/internal.router");

const express = require("express");
const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/public", [], PublicRouter);
app.use("/api/internal", [], InternalRouter);

module.exports = app;