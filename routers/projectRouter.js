const express = require("express");

const router = express.Router();

const projectDB = require("../data/helpers/projectModel");
const actionDB = require("../data/helpers/actionModel");

function validateProjectId(req, res, next) {
  const { id } = req.params;
  projectDB
    .get(id)
    .then(project => {
      if (project === null) {
        console.log("Invalid ID: " + id);
        res.status(400).json({ message: "Please use valid project ID." });
      } else {
        console.log("Valid ID detected");
        next();
      }
    })
    .catch(err => {
      console.log("Invalid ID: " + id);
      res.status(400).json({ message: "Please use valid project ID." });
    });
}

router.get("/", (req, res) => {
  projectDB
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data." });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  projectDB
    .get(id)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data." });
    });
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const { id } = req.params;
  projectDB
    .getProjectActions(id)
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      res.status(500).json({ message: "Error retrieving data." });
    });
});

router.post("/", (req, res) => {
  projectDB
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating project." });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  projectDB
    .update(id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error updating project." });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  projectDB
    .remove(id)
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted.` });
    })
    .catch(err => {
      res.status(500).json({ message: "Error deleting project." });
    });
});

module.exports = router;
