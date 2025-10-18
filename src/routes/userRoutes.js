const { login, register, validateToken, myprofile } = require("../controller/userController");
const router = require("express").Router();
router.post("/admin/login", login);
router.get("/admin/register", register);
router.get("/admin/myprofile", validateToken, myprofile);

module.exports = router;