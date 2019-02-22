const yargs = require('yargs');

const geocode=require('./geocode/geocode.js')

const argv=yargs
.options(
  {
    a:{
      demand: true,
      alias : 'address',
      describe : 'Address to fetch weather for',
      string :true
    }
  }
)
.help()
.argv;
geocode.geocodeAddress(argv.address,(errormessage,results)=>
{
  if(errormessage)
  console.log(errormessage);
  else {
    console.log(JSON.stringify(results,undefined ,2));
    
  }

});
