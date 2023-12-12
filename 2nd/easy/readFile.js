const fs = require("fs");
fs.readFile("./ari.txt","utf-8",(err,data)=>{
    if(err)
    {
        console.log(err);
        return;
    }
    console.log(data)
})
console.log("I Know reading flie is an expensive operation")