const { addResource, listResource } = require("../controller/resourceController");

const router = require("express").Router();

router.post("/resource/add", addResource);
router.get("/resource/list", listResource);


module.exports = router;
