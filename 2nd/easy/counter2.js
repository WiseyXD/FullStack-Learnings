let count = 0;

function increment(count)
{
    console.log(count);

    if(count < 10)
    {
        setTimeout(()=>{
           increment(count+1)
        },1000)
    }
 
}

increment(count);