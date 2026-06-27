const prisma = require("../config/db");


exports.getMembers = async (req, res) => {


    const users = await prisma.user.findMany({

        where: {
            role: "MEMBER"
        }

    });


    res.json(users);

}



exports.deleteMember = async (req, res) => {


    await prisma.user.delete({

        where: {
            id: req.params.id
        }

    });


    res.json({
        message: "Member deleted"
    });


}




exports.myBooks = async (req, res) => {


    const books = await prisma.borrowing.findMany({

        where: {
            userId: req.user.id
        },

        include: {
            book: true
        }

    });


    res.json(books);

}