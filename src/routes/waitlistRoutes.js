const { addToWaitlist, getWaitlist } = require("../controller/waitlistController");


const router = require("express").Router();

router.post("/waitlist/add", addToWaitlist);
router.get("/waitlist/list", getWaitlist);

module.exports = router;