const request = require('request')


const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ab088e158f6760a6af3dc21cafec16d9&query='+latitude+','+longitude
    const data = {
        temperature:'',
        feelsLike:'',
        description:''
    }
    
    request({url,json:true},(error,{body} = {}) =>{
        data.temperature = body.current.temperature
        data.feelsLike = body.current.feelslike
        data.description = body.current.weather_descriptions[0]   
        if(error){
            callback('Something went wrong',undefined)
        }else if(body.error){
            callback('Unable to find the location, Please try again',undefined)
        }else{
            callback(undefined,data)
        }
    })
}

module.exports = {
    forecast:forecast
}