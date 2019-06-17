const express = require("express");

const router = express.Router();

const actionDB = require("../data/helpers/actionModel");
const projectDB = require("../data/helpers/projectModel");

function validateActionId(req, res, next) {
  const { id } = req.params;
  actionDB
    .get(id)
    .then(action => {
      console.log("Valid ID detected");
    })
    .catch(err => {
      console.log("Invalid ID: " + id);
      res.status(400).json({ message: "Please use valid action ID." });
    });

  next();
}

router.get("/", (req, res) => {
  actionDB
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data." });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  actionDB
    .get(id)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data." });
    });
});

router.post("/", (req, res) => {
  actionDB
    .insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating action." });
    });
});

router.put("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  actionDB
    .update(id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating action." });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  actionDB
    .remove(id)
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted.` });
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting action." });
    });
});

module.exports = router;
