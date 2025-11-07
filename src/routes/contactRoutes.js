const { contactAdd  ,contactList, deleteEnquiry } = require("../controller/contactController");
const router = require("./servicesRoutes");


router.post("/contact", contactAdd);
router.get("/contact/list", contactList);
router.get('/contact/delete/:id', deleteEnquiry);


module.exports = router;