const router = require("express").Router();


const auth = require("../middleware/auth.middleware");

const role = require("../middleware/role.middleware");


const controller = require("../controllers/book.controller");



router.get("/", auth, controller.getBooks);


router.post("/",
    auth,
    role("LIBRARIAN"),
    controller.addBook);



router.get("/:id",
    auth,
    controller.getBook);



router.put("/:id",
    auth,
    role("LIBRARIAN"),
    controller.updateBook);



router.delete("/:id",
    auth,
    role("LIBRARIAN"),
    controller.deleteBook);



router.post("/:id/borrow",
    auth,
    role("MEMBER"),
    controller.borrow);



router.post("/:id/return",
    auth,
    role("MEMBER"),
    controller.returnBook);



module.exports = router;