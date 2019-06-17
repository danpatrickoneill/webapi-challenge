require("dotenv").config();

const express = require("express");

const router = express.Router();

const server = require("./server");

const actionRoutes = require("./routers/actionRouter");
const projectRoutes = require("./routers/projectRouter");

server.use("/actions", actionRoutes);
server.use("/projects", projectRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server running on port ${port}`));
