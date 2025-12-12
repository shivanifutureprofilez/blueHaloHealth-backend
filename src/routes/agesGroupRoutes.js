const { addAgesGroup, listAgeGroups, deleteAgeGroup, updateAgeGroup, singleCategoryDetail } = require("../controller/ageController");
const { cacheByUrl } = require("../middleware/cache");
const upload = require("../middleware/uploadMiddleware");

const router = require("express").Router();
router.post("/agegroup/add", upload.single("coverImg") , addAgesGroup);
router.get('/agegroup/list', cacheByUrl(300), listAgeGroups);
router.get('/categoryDetails/:id',singleCategoryDetail);
router.get('/agegroup/delete/:id', deleteAgeGroup);
router.post('/agegroup/update',upload.single("coverImg"), updateAgeGroup);

module.exports = router;