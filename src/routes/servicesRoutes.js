const { addNewService, showServicesByAge, showAllServices, updateService, deleteService, showServiceDetails } = require("../controller/serviceController");

const router = require("express").Router();

router.post("/service/add", addNewService);
router.get('/service/list/:id', showServicesByAge);
router.get('/service/list', showAllServices);
router.post('/service/update',updateService);
router.get('/service/delete/:id', deleteService);
router.get("/service/:id", showServiceDetails);

module.exports = router;