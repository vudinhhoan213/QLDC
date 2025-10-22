const express = require("express");
const { citizenController } = require("../controllers");
const { authenticate, isLeader } = require("../middleware/auth");

const router = express.Router();

// Stats route must come before /:id
router.get("/stats", authenticate, citizenController.getStats);
router.get("/", authenticate, citizenController.getAll);
router.get("/:id", authenticate, citizenController.getById);
router.post("/", authenticate, isLeader, citizenController.create);
router.patch("/:id", authenticate, isLeader, citizenController.update);
router.delete("/:id", authenticate, isLeader, citizenController.delete);

module.exports = router;
