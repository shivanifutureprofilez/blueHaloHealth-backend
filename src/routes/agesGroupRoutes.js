const { addAgesGroup, listAgeGroups, deleteAgeGroup, updateAgeGroup } = require("../controller/ageController");
const { cacheByUrl } = require("../middleware/cache");

const router = require("express").Router();
router.post("/agegroup/add", addAgesGroup);
router.get('/agegroup/list', cacheByUrl(300), listAgeGroups);
router.get('/agegroup/delete/:id', deleteAgeGroup);
router.post('/agegroup/update',updateAgeGroup);



module.exports = router;