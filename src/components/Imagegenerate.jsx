import React from 'react'


function Imagegenerate() {


  
  async function fetchd(){
       console.log("clicked")
        try{
          const response = await fetch("https://api.openai.com/v1/images/generations",
            {
              method: "POST",
              headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer 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` 
              },
              body:JSON.stringify({
                  prompt: "cat and dog",
                  n:1,
                  size:"512x512"    
              })
            }
           
          )
          const result = await response.json();
          console.log(result)
        }catch(e){
          console.log(e)
        }
  }
  return (
    <div>
      Imagegenerate <button onClick={fetchd}> Generate </button>
      
    </div>
  )
}

export default Imagegenerate