const fs = require("fs");
fs.readFile("./ari.txt" , "utf-8" , (err,data)=>{
    if(err)
    {
        console.log(err);
        return;
    }

    const cleanContent =  data.replace(/[^\S\r\n]+/g, ' ');


    fs.writeFile("./ari.txt" , cleanContent,(err)=>{
        if(err)
        {
            console.log(err);
            return;
        }
        console.log("success");
    });
});