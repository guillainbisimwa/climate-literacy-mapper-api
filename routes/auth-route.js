const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth-controller");

router.post("/signup", authCtrl.signup);
router.post("/login", authCtrl.login);
router.post("/login-phone", authCtrl.loginByPhone);
router.post("/forgot-details", authCtrl.forgotDetails);
router.put("/update-user/:userId", authCtrl.editUser);
router.put("/change-password/:id", authCtrl.changePassword);
router.put("/reset-password/:id", authCtrl.resetPassword);

router.get("/", authCtrl.findAll);
router.get("/:id", authCtrl.findOne);
router.get("/mobile/:mobile", authCtrl.findByMobile);

module.exports = router;
