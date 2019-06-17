const express = require("express");

const server = express();

function logger(req, res, next) {
  console.log(req.method, req.url, new Date().toISOString());

  next();
}

server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
  res.send(`<h1>Hello!</h1>`);
});

module.exports = server;
