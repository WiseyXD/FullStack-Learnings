
let dayOrNight
setInterval(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    if(hours>12)
    {
        dayOrNight = "PM"
    }
    else{
        dayOrNight = "AM"
    }
    console.log(hours+" : "+minutes+" : "+seconds+" " +dayOrNight);
}, 1000);


