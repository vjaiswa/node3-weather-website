console.log("Testing...113")
/*fetch('http://localhost:3000/weather?address=!').then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error)
        }else{
            console.log(data.forecast)
            console.log(data.location)
        }
    })
})*/ 


const weatherForm = document.getElementById('weatherform')

 weatherForm.addEventListener('submit',(e) =>{
     e.preventDefault()
     const search = document.getElementById("location").value
     const url = '/weather?address='+search
     const messageOne = document.getElementById("messageOne")
     
     messageOne.textContent = "Loading......."
     fetch(url).then((response) =>{
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = data.error
            }else{
                messageOne.textContent = "Temprature is "+data.forecast+" degree celcious in "+data.location
            }
        })
    })

 })
 
    
        
