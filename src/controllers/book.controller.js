const prisma = require("../config/db");



exports.addBook = async (req, res) => {


    const book = await prisma.book.create({

        data: req.body

    });


    res.status(201).json(book);


}



exports.getBooks = async (req, res) => {


    const books = await prisma.book.findMany();


    res.json(books);


}




exports.getBook = async (req, res) => {


    const book = await prisma.book.findUnique({

        where: {
            id: req.params.id
        }

    });


    res.json(book);

}



exports.updateBook = async (req, res) => {


    const book = await prisma.book.update({

        where: {
            id: req.params.id
        },

        data: req.body

    });


    res.json(book);

}



exports.deleteBook = async (req, res) => {


    await prisma.book.delete({

        where: {
            id: req.params.id
        }

    });


    res.json({
        message: "Deleted"
    });

}




exports.borrow = async (req, res) => {


    const book = await prisma.book.findUnique({

        where: {
            id: req.params.id
        }

    });


    if (book.availableQuantity <= 0)
        return res.status(400).json({
            message: "Book unavailable"
        });



    await prisma.borrowing.create({

        data: {

            userId: req.user.id,

            bookId: book.id

        }

    });



    await prisma.book.update({

        where: {
            id: book.id
        },

        data: {

            availableQuantity: {
                decrement: 1
            }

        }

    });


    res.json({
        message: "Borrowed"
    });


}




exports.returnBook = async (req, res) => {


    const record = await prisma.borrowing.findFirst({

        where: {

            userId: req.user.id,

            bookId: req.params.id,

            returnedAt: null

        }

    });


    if (!record)
        return res.status(400).json({
            message: "Book not borrowed"
        });



    await prisma.borrowing.update({

        where: {
            id: record.id
        },

        data: {
            returnedAt: new Date()
        }

    });



    await prisma.book.update({

        where: {
            id: req.params.id
        },

        data: {
            availableQuantity: {
                increment: 1
            }
        }

    });


    res.json({
        message: "Returned"
    });

}