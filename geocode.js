const request=require('request');

var geocodeAddress= (address,callback) =>{
    var encodedAddress = encodeURIComponent(address);

  request({
    url:  `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
    json :true
  }, (error , response , body)  =>{
     if(error)
     {callback('Unable to connect to google servers..');}
     else if(body.status ==='ZERO_RESULTS')
     {callback('Unable to find that address');}
     else if (body.status==='OK')
     {
       var info={
        Address : body.results[0].formatted_address,
      Latitude : body.results[0].geometry.location.lat,
      Longitude : body.results[0].geometry.location.lng   }
       getweather(info.Latitude,info.Longitude);
       callback(undefined,info);
     }

  })
}
var getweather=(latitude,longitude) => {
   var key='d398c2d66a3483235fd9e171c492fd9a';
   request({
     url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
     json: true
   },(error,response,body) =>{
     if(!error && response.statusCode===200)
     {
      console.log(`Current weather is: ${body.currently.summary}`);
      console.log(`Current temperature is: ${body.currently.temperature}`);
      console.log(`But it feels like : ${body.currently.apparentTemperature}`);
      console.log(`Humidity is: ${body.currently.humidity}`);
      console.log(`Pressure is: ${body.currently.pressure}`);
    }
    else
    {
      console.log('Weather not fetched....some error is there.....');
    }

   }
 )


}
module.exports.geocodeAddress=geocodeAddress;
