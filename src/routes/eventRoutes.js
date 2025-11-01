const { addEvent, listEvent, deleteEvent, updateEvent } = require("../controller/eventController");

const router = require("express").Router();

router.post("/event/add", addEvent);
router.get("/event/list", listEvent);
router.get('/event/delete/:id', deleteEvent);
router.post('/event/update/:id',updateEvent);

module.exports = router;