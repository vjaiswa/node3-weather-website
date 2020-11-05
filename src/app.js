const geoCodeObject = require('./utils/geocode')
const forecastObject = require('./utils/forecast')

const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT

//Define Path for express config
const publicDirectory = path.join(__dirname,'../public')
//const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partial')

//Setup static folder to server
app.use(express.static(publicDirectory))

//setup handlebars views and engine location 
app.set('view engine','hbs')
app.set('views','template/views')
hbs.registerPartials(partialsPath)
 
app.get('',(req,res) =>{
    res.render('index',{
        title:'Home Page',
        name:'Vijay Jaiswal'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title:'Help Message',
        name:'Vijay Jaiswal',
        message:'fhkjsdh fkjshkj fhskj fhkjshfkjshkjfhsdkjf hksjdhfkjs hkj'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:'About Me',
        name:'Vijay Jaiswal'
    })
})

app.get('/weather',(req,res) =>{
    const address = req.query.address
    if(!address){
        return res.send({
            error:'address not provided'
        })
    }
 
    
    geoCodeObject.geoCode(address,(error,{latitude,longitude,place}={}) =>{
        if(error){
            return res.send({
                error:error
            })
        }else{
            forecastObject.forecast(latitude,longitude,(error,{temperature,feelsLike,description}) =>{
                if(error){
                    return res.send({
                        error:error
                    })
                }else{
                    res.send({
                        forecast:temperature,
                        location:place,
                        feelsLike:feelsLike,
                        description:description
                    })
                }
            })        
        }
    })
    
    



    
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title:"Error Page",
        name:"Vijay Jaiswal",
        errorMessage:"Help artical not found"
    })
})

app.get('*',(req,res) =>{
    res.render('404',{
        title:"Error Page",
        name:"Vijay Jaiswal",
        errorMessage:"404-Page Not Found"
    })
})


/*
app.listen(3000,() =>{
    console.log('Server listening on port 3000.')
})*/

app.listen(port,() =>{
    console.log('Server listening on port '+port)
})


