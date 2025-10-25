const { addAgesGroup, listAgeGroups, deleteAgeGroup, updateAgeGroup, showAgeGroupDetails } = require("../controller/ageController");

const router = require("express").Router();
router.post("/agegroup/add", addAgesGroup);
router.get('/agegroup/list', listAgeGroups);
router.get('/agegroup/delete/:id', deleteAgeGroup);
router.post('/agegroup/update',updateAgeGroup);
router.get('/agegroup/:id',showAgeGroupDetails);



module.exports = router;