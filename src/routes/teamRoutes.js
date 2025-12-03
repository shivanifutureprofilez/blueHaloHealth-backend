const { addTeamMember, listTeamMember, deleteTeamMember, editTeam } = require("../controller/teamController");
const { cacheByUrl } = require("../middleware/cache");

const router = require("express").Router();

router.post("/team/add", addTeamMember);
router.get("/team/list", cacheByUrl(300),  listTeamMember);
router.get('/team/delete/:id', deleteTeamMember);
router.post('/team/update/:id',editTeam);

module.exports = router;