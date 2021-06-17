const request = require('request')


const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=c33cc4ae8d7657781029abbdb5a1f84d&query=' + encodeURIComponent(address) + '&limit=1'
 
    request({ url, json: true }, (error, {body}) => {
       if (error){
          callback('Unable to connect to location services!', undefined)
       } else if (body.error){
         callback('Unable to find location. Try another search', undefined)  
       } else if (body.data.length === 0){
          callback('Unable to find location. Try another search', undefined)
       } else {
          callback(undefined, {
             latitude: body.data[0].latitude,
             longitude: body.data[0].longitude,
             location: body.data[0].name,
             number: body.data[0]. number,
             postal_code: body.data[0].postal_code,
             street: body.data[0].street,
             region: body.data[0].region
          })
       }
    })
 }
 
 module.exports = geocode