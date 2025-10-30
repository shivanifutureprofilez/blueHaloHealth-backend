const { addNewService, showAllServices, updateService, deleteService, showServiceDetails, getServicebyId, featureService, showFeaturedServices } = require("../controller/serviceController");

const router = require("express").Router();

router.post("/service/add", addNewService);
router.get('/service/list/:id', getServicebyId);
router.get('/service/featured/list', showFeaturedServices);
router.get('/service/list', showAllServices);
router.post('/service/update/:id',updateService);
router.get('/service/delete/:id', deleteService);
router.get('/service/mark/featured/:id', featureService);
router.get("/service/:id", showServiceDetails);

module.exports = router;