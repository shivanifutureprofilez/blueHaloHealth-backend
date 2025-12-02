const { addAgesGroup, listAgeGroups, deleteAgeGroup, updateAgeGroup } = require("../controller/ageController");

const router = require("express").Router();
router.post("/agegroup/add", addAgesGroup);
router.get('/agegroup/list', listAgeGroups);
router.get('/agegroup/delete/:id', deleteAgeGroup);
router.post('/agegroup/update',updateAgeGroup);



module.exports = router;