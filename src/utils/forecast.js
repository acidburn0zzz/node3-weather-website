const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=839fd3259ae127e8304ddca7b585ab90&query=' + longitude + ',' +  latitude + '&units=f'
    


    request({url, json: true}, (error, {body}) => {
        if (error){
              callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
              callback('Unable to find location', undefined)
        } else {
           callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. Current visibility is a ' + body.current.visibility + '. Also, your wind speed is ' + body.current.wind_speed + ' and its direction is ' + body.current.wind_dir + '.' )
        }
        
     })
}

 
 module.exports = forecast




