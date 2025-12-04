// const { addNewService, showAllServices, updateService, deleteService, showServiceDetails, getServicebyId, featureService, showFeaturedServices, servicesListOfGroup } = require("../controller/serviceController");
const { addNewSubService, singleSubServiceDetails, allSubService } = require("../controller/subServiceController");
const { cacheByUrl } = require("../middleware/cache");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();

router.post("/subservice/add", upload.single("bannerImg"), addNewSubService);
router.get("/subservice/:id",  cacheByUrl(300),  singleSubServiceDetails);
router.get('/subservice/list/:serviceid',  cacheByUrl(300), allSubService);



module.exports = router;