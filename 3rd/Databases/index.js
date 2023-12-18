const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect("mongodb+srv://WiseyXD:Qwerty88**@testcluster.hbkxnkx.mongodb.net/");

const User = mongoose.model("User", {
    name: String,
    username: String,
    pasword: String,
});

const app = express();
app.use(express.json());

function userExists(username, password) {
    let exists = false;
    if(User.findOne({username : username}))
    {   
        exists = true;
        return exists;
    }
    return exists;
}

app.post("/signin", async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    const newUser = new User({
        name : "Aryan",
        username,
        password,
    })
    await newUser.save();

    var token = jwt.sign({ username: username }, jwtPassword);
    return res.json({
        token,
        msg : "User created"
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return a list of users other than this username from the database
    } catch (err) {
        return res.status(403).json({
            msg: "Invalid token",
        });
    }
});

app.listen(3000 , ()=>{
    console.log("Serve is Listening at 3000");
});
