const z = require("zod");
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());
const kidneysSchema = z.array(z.number());

app.get("/checkup",(req,res)=>{
    const kidneys = req.body.kidneys;
    const resp = kidneysSchema.safeParse(kidneys);
    if(!resp.success)
    {
        res.status(411).json({
            msg : "Invalid Input",
            resp : resp,
        })
        return;
    }
    res.status(200).send(resp);
})

app.listen(PORT , ()=>{
    console.log("Server is listening at "+PORT);
})

