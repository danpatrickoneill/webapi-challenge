const express = require("express");

const server = express();

function logger(req, res, next) {
  console.log(req.method, req.url, new Date().toISOString());

  next();
}

server.use(express.json());
server.use(logger);

module.exports = server;
