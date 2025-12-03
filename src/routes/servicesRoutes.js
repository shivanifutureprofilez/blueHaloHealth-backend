const { addNewService, showAllServices, updateService, deleteService, showServiceDetails, getServicebyId, featureService, showFeaturedServices, servicesListOfGroup } = require("../controller/serviceController");
const { cacheByUrl } = require("../middleware/cache");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();

router.post("/service/add", upload.single("bannerImg"), addNewService);
// router.post("/service/add",   addNewService);
router.get('/service/list/:id', getServicebyId);
router.get('/service/featured/list', cacheByUrl(300), showFeaturedServices);
router.get('/service/list', cacheByUrl(300), showAllServices);
router.post('/service/update/:id',updateService);
router.get('/service/delete/:id', deleteService);
router.get('/service/mark/featured/:id', featureService);
router.get("/service/:id", cacheByUrl(120), showServiceDetails);
router.get('/service/by/group/:id', servicesListOfGroup);

module.exports = router;