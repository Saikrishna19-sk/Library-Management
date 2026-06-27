const router = require("express").Router();

const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");


const controller = require("../controllers/member.controller");



router.get("/",
    auth,
    role("LIBRARIAN"),
    controller.getMembers);



router.delete("/:id",
    auth,
    role("LIBRARIAN"),
    controller.deleteMember);



router.get("/me/books",
    auth,
    role("MEMBER"),
    controller.myBooks);



module.exports = router;