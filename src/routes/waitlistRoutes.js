const { addToWaitlist, getWaitlist, deleteWaitlist } = require("../controller/waitlistController");

const router = require("express").Router();

router.post("/waitlist/add", addToWaitlist);
router.get("/waitlist/list", getWaitlist);
router.get('/waitlist/delete/:id', deleteWaitlist);

module.exports = router;