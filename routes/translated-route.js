const express = require("express");
const translatedCtrl = require("../controllers/translated-controller")
const router = express.Router();

router.get("/", translatedCtrl.findAll);
router.get("/:id", translatedCtrl.findOne);


router.post("/", translatedCtrl.create);
router.put("/:id", translatedCtrl.update);
router.delete("/:id", translatedCtrl.delete);

module.exports = router;
