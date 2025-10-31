const { addEvent, listEvent } = require("../controller/eventController");

const router = require("express").Router();

router.post("/event/add", addEvent);
router.get("/event/list", listEvent);

module.exports = router;