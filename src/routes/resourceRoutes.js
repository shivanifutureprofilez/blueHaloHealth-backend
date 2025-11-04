const { addResource, listResource, deleteResource, updateResource } = require("../controller/resourceController");

const router = require("express").Router();

router.post("/resource/add", addResource);
router.get("/resource/list", listResource);
router.get('/resource/delete/:id', deleteResource);
router.post('/resource/update/:id',updateResource);

module.exports = router;
