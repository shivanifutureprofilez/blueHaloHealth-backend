const { addTeamMember, listTeamMember, deleteTeamMember, editTeam } = require("../controller/teamController");

const router = require("express").Router();

router.post("/team/add", addTeamMember);
router.get("/team/list", listTeamMember);
router.get('/team/delete/:id', deleteTeamMember);
router.post('/team/update/:id',editTeam);

module.exports = router;