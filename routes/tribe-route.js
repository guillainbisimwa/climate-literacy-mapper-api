const express = require("express");
const tribeCtrl = require("../controllers/tribe-controller");
const router = express.Router();

router.get("/", tribeCtrl.findAll);
router.get("/:id", tribeCtrl.findOne);
router.get("/tribe/:tribe", tribeCtrl.findOneByName);
router.get('/belongs/:id', tribeCtrl.findTribeByBelongsId);

router.post("/", tribeCtrl.create);
router.put("/:id", tribeCtrl.update);
router.delete("/:id", tribeCtrl.delete);

router.patch("/update-tribe/:tribeId", tribeCtrl.patchTribe);

module.exports = router;
