const { addToWaitlist, getWaitlist, deleteWaitlist } = require("../controller/waitlistController");
const { cacheByUrl } = require("../middleware/cache");

const router = require("express").Router();

router.post("/waitlist/add", addToWaitlist);
router.get("/waitlist/list", getWaitlist);
router.get('/waitlist/delete/:id', deleteWaitlist);

module.exports = router;