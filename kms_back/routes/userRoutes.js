const router = require("express").Router();

const authController = require("../controllers/authController");

router.post("/login",authController.login);
router.post("/signup",authController.signUp);
router.get('/logout', authController.logout);

router.get("/check",authController.checkUser);
module.exports = router;