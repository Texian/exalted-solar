const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

router.get("/characters", verifyToken, ctrl.characters.index);
router.get("/characters/:id", ctrl.characters.show);
router.post("/characters", ctrl.characters.create);
router.put("/characters/:id", ctrl.characters.update);
router.delete("/characters/:id", ctrl.characters.destroy);

router.get("/users", verifyToken, ctrl.users.index);
router.get("users/:id", ctrl.users.show);
router.post("users", ctrl.users.create);
router.put("/users/:id", ctrl.users.update);
router.delete("/users/:id", ctrl.users.destroy);

module.exports = router;