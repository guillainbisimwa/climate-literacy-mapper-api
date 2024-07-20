const express = require("express");
const refCtrl = require("../controllers/ref-controller");
const router = express.Router();

router.get("/", refCtrl.findAll);
router.get("/:id", refCtrl.findOne);


router.post("/", refCtrl.create);
router.put("/:id", refCtrl.update);
router.delete("/:id", refCtrl.delete);

module.exports = router;
