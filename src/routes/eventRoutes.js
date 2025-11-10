const { addEvent, listEvent, deleteEvent, updateEvent } = require("../controller/eventController");
const { addTesting } = require("../controller/testingController");

const router = require("express").Router();

router.post("/event/add", addEvent);
router.post("/testing/add", addTesting);
router.get("/event/list", listEvent);
router.get('/event/delete/:id', deleteEvent);
router.post('/event/update/:id',updateEvent);


module.exports = router;