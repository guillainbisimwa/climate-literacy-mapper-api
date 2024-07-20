const express = require("express");
const tribeCtrl = require("../controllers/tribe-controller");
const router = express.Router();

router.get("/", tribeCtrl.findAll);
router.get("/:id", tribeCtrl.findOne);


router.post("/", tribeCtrl.create);
router.put("/:id", tribeCtrl.update);
router.delete("/:id", tribeCtrl.delete);

module.exports = router;
