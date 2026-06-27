const prisma = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.register = async (req, res) => {


    try {


        const {
            name,
            email,
            password
        } = req.body;



        const exists = await prisma.user.findUnique({
            where: { email }
        });


        if (exists)
            return res.status(409).json({
                message: "Email already exists"
            });



        const hash = await bcrypt.hash(password, 10);



        const user = await prisma.user.create({

            data: {
                name,
                email,
                password: hash,
                role: "MEMBER"
            }

        });


        res.status(201).json({

            success: true,
            user

        });


    } catch (e) {

        res.status(500).json({
            message: e.message
        });

    }

}




exports.login = async (req, res) => {


    const {
        email,
        password
    } = req.body;


    const user = await prisma.user.findUnique({
        where: { email }
    });


    if (!user)
        return res.status(404).json({
            message: "User not found"
        });



    const match = await bcrypt.compare(
        password,
        user.password
    );



    if (!match)
        return res.status(401).json({
            message: "Wrong password"
        });



    const token = jwt.sign({

        id: user.id,
        role: user.role

    },
        process.env.JWT_SECRET
    );



    res.json({

        success: true,
        token

    });


}