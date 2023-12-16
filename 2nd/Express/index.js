const express = require("express");
const bodyParser = require("body-parser");
const { ok } = require("assert");
const PORT = 3001;
const app = express();
app.use(express.json());

var users = [
    {
        name: "Jhon",
        kidneys: [
            {
                kidney: {
                    healthy: true,
                },
            },

            {
                kidney: {
                    healthy: false,
                },
            },
        ],
    },
];

app.get("/", (req, res) => {
    const user = users[0];
    const username = user.name;
    let numberOfHealthyKidneys = user.kidneys.filter((kidney)=> kidney[Object.keys(kidney)[0]].healthy == true).length;
    let numberOfUnhealthyKidneys = user.kidneys.length - numberOfHealthyKidneys;  
    console.log(numberOfHealthyKidneys , numberOfUnhealthyKidneys)
    res.status(200).json(
    {
        username,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys}
    )
});


// TODO : Convert all Unhealthy Kidney to Healthy Kidneys
app.put("/", (req, res) => {
    users[0].kidneys = users[0].kidneys.map((kidney)=> kidney.healthy = true);
    res.json({
        msg : "Done PUT"
    })
});

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        kidney : {
            healthy : isHealthy
        }
    })
    res.json({
        msg : "Done POST"
    })
});

// TODO : Delete all Unhealthy kidneys
app.delete("/", (req, res) => {
    if(users[0].kidneys.length === 0 )
    {
        res.json({
            msg : "No Kidneys Left"
        })
        return 
    }
    const onlyHealthyKidneys = users[0].kidneys.filter((kidney)=> kidney[Object.keys(kidney)[0]].healthy == true)
    users[0].kidneys = onlyHealthyKidneys;
    res.json({
        msg : "Done DELETE"
    })
});

app.listen(PORT, () => {
    console.log("Listening at" + PORT);
});
