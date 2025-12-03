const { addResource, listResource, deleteResource, updateResource } = require("../controller/resourceController");
const { cacheByUrl } = require("../middleware/cache");

const router = require("express").Router();

router.post("/resource/add", addResource);
router.get("/resource/list", cacheByUrl(300), listResource);
router.get('/resource/delete/:id', deleteResource);
router.post('/resource/update/:id',updateResource);

module.exports = router;
