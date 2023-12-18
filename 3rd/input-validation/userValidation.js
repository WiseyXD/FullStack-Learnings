const express = require ("express");
const z = require("zod");
const app = express();
const PORT = 3000;

app.use(express.json());

const User = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(8),
})

app.get("/sign-in",(req,res)=>{
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    const response = User.safeParse({
        username : username,
        email : email,
        password : password
    })

    if(!response.success)
    {
        res.status(411).json({
            msg : "Invalid Inputs",
            response,
        })
        return;
    }

    res.status(200).send(response);
})

app.listen(PORT , ()=>{
    console.log("Server is Listening at "+PORT)
})