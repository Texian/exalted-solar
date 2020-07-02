const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const verifyToken = require('../middleware/verification');

router.get("/characters", /*verifyToken,*/ ctrl.characters.index);
router.get("/characters/:id", ctrl.characters.show);
router.post("/characters", ctrl.characters.create);
router.put("/characters/:id", ctrl.characters.update);
router.delete("/characters/:id", ctrl.characters.destroy);

module.exports = router;