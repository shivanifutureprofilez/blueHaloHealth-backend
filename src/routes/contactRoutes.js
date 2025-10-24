const { contactAdd  ,contactList } = require("../controller/contactController");
const router = require("./servicesRoutes");


router.post("/contact", contactAdd);
router.get("/contact/list", contactList);



module.exports = router;