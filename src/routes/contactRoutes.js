const { contact } = require("../controller/contactController");


router.get("/contact", contact);


module.exports = router;