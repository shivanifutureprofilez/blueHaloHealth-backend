const { addEvent, listEvent, deleteEvent, updateEvent } = require("../controller/eventController");
const { cacheByUrl } = require("../middleware/cache");
// const { addTesting } = require("../controller/testingController");

const router = require("express").Router();

router.post("/event/add", addEvent);
router.get("/event/list", cacheByUrl(300), listEvent);
router.get('/event/delete/:id', deleteEvent);
router.post('/event/update/:id',updateEvent);


module.exports = router;
