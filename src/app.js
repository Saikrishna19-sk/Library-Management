const express = require("express");
const cors = require("cors");
require("dotenv").config();


const authRoutes = require("./routes/auth.routes");
const bookRoutes = require("./routes/book.routes");
const memberRoutes = require("./routes/member.routes");


const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "Library API running"
    });
});


app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/members", memberRoutes);



app.listen(process.env.PORT, () => {
    console.log("Server running");
});