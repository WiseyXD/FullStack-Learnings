const myPromise = new Promise((resolve , reject)=>{
    setTimeout(()=>{
        resolve("Success")
    },1000)

})

myPromise.then((value)=>{
    console.log(value)
},()=>{
    console.log("Rejected")
})