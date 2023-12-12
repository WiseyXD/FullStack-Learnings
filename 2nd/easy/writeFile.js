const fs = require("fs");
fs.writeFile("./ari.txt","GOD Aryan",(err,data)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log("Success")
})