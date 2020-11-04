const request = require('request')

const geoCode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiamFpcy1teXZpamF5IiwiYSI6ImNrZ3NsdG5rcTAxM2kyeHB0a2U3bDdiZW8ifQ.BOmlOu4v3D9vuIJj7bUKzA&limit=1'   
    const data = {
        latitude:0,
        longitude:0,
        place:''
    }
    

    request({url,json:true},(error,{body} = {}) =>{
        if(error){
            callback('Unable to connect to the service',undefined)
        }else if(body.features.length == 0){
            callback('Location '+address+' not found. Please try another search.',undefined)
        }else{
            data.latitude = body.features[0].center[1]
            data.longitude = body.features[0].center[0]
            data.place = body.features[0].place_name
            callback('',data)
        }
    })
}

module.exports = {
    geoCode:geoCode,
}