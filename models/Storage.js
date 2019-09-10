import lineReader from 'line-reader';
import readline from 'readline';
import fs from 'fs';
import City from './City';

class Storage{
    constructor(){
        this.cities = [];
    }
    
    addCity(city){
        this.cities.push(city);
    }
    getCities(){
        return this.cities;
    }

//      //Perfect Match
    matchCityName(suggestedCityName,cityName,altNames){
//    const minMatch = 3;
//    for(let index = 0 ; index < minMatch ; index++){
//      if(suggestedCityName.charAt(index) != cityName.charAt(index))
//        return false;
//    }
//    const arrAltNames = altNames.split(',');
//    // console.log(`suggestedName : ${suggestedCityName}  \ncityName : ${cityName}  \naltNames : ${arrAltNames}`);
//    if(suggestedCityName === cityName)
//      return cityName;
 
//    arrAltNames.forEach(altName => {
//      if(altName === suggestedCityName)
//        return cityName;
//    });
 }
 //calculate confidence level
  calculateScore(suggestedCityName,suggestedLatitude,suggestedLongitude,cityName,latitude,longitude){
//    let requestedOutcome;
//    let possibleOutcome;
//    if(latitude && longitude){
//       possibleOutcome = cityName.length * latitude * longitude;
//       requestedOutcome = suggestedCityName.length * suggestedLatitude * suggestedLongitude;
//    }else {
//         possibleOutcome = cityName.length;
//         requestedOutcome = suggestedCityName.length;
//    }
//    return requestedOutcome/possibleOutcome;
 }  

getCity(reqCity,reqLat,reqLong){
  return new Promise (resolve => {
   reqCity = reqCity.toLowerCase();
    const cityInfo = {
        indexOfCityName : 1,
        indexOfAsciiName : 2,
        indexOfAltNames : 3,
        indexOfLat : 4,
        indexOfLong : 5,
        indexOfTimeZone : 17
     }
    const filePath = './models/cities15000.txt';
const readerStream = fs.createReadStream(filePath);
readerStream.setEncoding('UTF8');

// create instance of readline
// each instance is associated with single input stream
let rl = readline.createInterface({
  input: fs.createReadStream(filePath)
});
// event is emitted after each line

rl.on('line', (line) => {
  const currentCityName = line.split('	')[cityInfo.indexOfCityName].toLowerCase();
  // console.log(`currentCityName: ${currentCityName}`);
  const currentAltNames = line.split('	')[cityInfo.indexOfAltNames].toLowerCase();
  // console.log(`currentAltNames: ${currentAltNames}`);
  const currentLatitude = line.split('	')[cityInfo.indexOfLat];
  const currentLongitude = line.split('	')[cityInfo.indexOfLong];
  const currentTimeZone = line.split('	')[cityInfo.indexOfTimeZone];

  // const cityNameMatches = ((reqCity,currentCityName,currentAltNames) =>{

//--------------------------------------------FIRST 3 MATCHES------------------------------------------------------
  const minMatch = 3;
   for(let index = 0 ; index < minMatch ; index++){
     if(reqCity.charAt(index) != currentCityName.charAt(index))
       return null;
   }
   const arrAltNames = currentAltNames.split(',');
//-------------------------------------------------------------------------------------------------------------------
   //-------------------------------------------PERFECT MATCHES-------------------------------------------------------------------
   // console.log(`suggestedName : ${reqCity}  \ncurrentCityName: ${currentCityName}  \ncurrentAltNames : ${arrAltNames}`);
   if(reqCity === currentCityName){
          return currentCityName;
   }
   arrAltNames.forEach(altName => {
     if(altName === reqCity)
       return currentCityName;
   });
   //------------------------------------------------------------------------------------------------------------------
  // });
  //------------------------------------------------ PARTIAL MATCHES -----------------------------------------------
  // console.log(`cityNameMatches: ${currentCityName}`);
  if(currentCityName){
      //calculate score
    // const score = ((reqCity,reqLat,reqLong,currentCityName,currentLatitude,currentLongitude) => {
      let requestedOutcome;
   let possibleOutcome;
   if(reqLat && reqLong){
      possibleOutcome = currentCityName.length * currentLatitude * currentLongitude;
      requestedOutcome = reqCity.length * reqLat * reqLong;
   }else {
        possibleOutcome = currentCityName.length;
        requestedOutcome = reqCity.length;
   }
   let score = requestedOutcome/possibleOutcome;
   score = score >= 0 ? score : (score * -1);
  const arrTimeZone = currentTimeZone.split('/');
  const country = arrTimeZone[1];
  const continent = arrTimeZone[0];
  const newCity = new City(currentCityName,country,currentLatitude,currentLongitude,score);
  const retrievedCity = newCity.getCity();
  this.cities[this.cities.length] = retrievedCity;
}
return false;
});

// end

rl.on('close',() => {
  console.log('reading filee closed!');
  console.log(`cities inside the reading:${JSON.stringify(this.cities)} `);
  resolve(this.cities.sort((city1,city2)=>{
                  if(city1.name > city2.name)
                    return 1;
                  else if(city1.name < city2.name)
                    return -1;
                  else return 0;
                        })
                  );
                
    

  // return this.cities;
});

});
}
}
export default Storage;
// const storage = new Storage();

// let reqCity = 'Cui';
// let reqLat = '';
// let reqLong = '';
// storage.getCity(reqCity,reqLat,reqLong);

// storage.cities.forEach(element => {
//   console.log(`\n\nafffffffffffffffffffay : ${Object.keys(element)}`);
// });
// console.log(`\n\nsuggested cities : ${storage.cities}`);

/**
 * 
import fs from 'fs';
import lineReader from 'line-reader';
const filePath = './cities15000.txt';

function main(){
  // start stream
var readerStream = fs.createReadStream(filePath);
readerStream.setEncoding('UTF8');

//check each line
lineReader.eachLine(readerStream,function(line){
  const cityInfo = {
     indexOfCityName : 1,
     indexOfAsciiName : 2,
     indexOfAltNames : 3,
     indexOfLat : 4,
     indexOfLong : 5,
     indexOfTimeZone : 17
  }
  console.log(matchCityName('les Escaldes',line.split('	')[cityInfo.indexOfCityName],line.split('	')[cityInfo.indexOfAltNames])
);

  return false;
});

}

//Perfect Match
function matchCityName(suggestedCityName,cityName,altNames){
  const minMatch = 3;
  for(let index = 0 ; index < minMatch ; index++){
    if(suggestedCityName.charAt(index) != cityName.charAt(index))
      return false;
  }
  const arrAltNames = altNames.split(',');
  // console.log(`suggestedName : ${suggestedCityName}  \ncityName : ${cityName}  \naltNames : ${arrAltNames}`);
  if(suggestedCityName === cityName)
    return true;

  arrAltNames.forEach(altName => {
    if(altName === suggestedCityName)
      return true;
  });
}
//calculate confidence level
function calculateScore(suggestedCityName,suggestedLatitude,suggestedLongitude,cityName,latitude,longitude){
  let requestedOutcome;
  let possibleOutcome;
  if(latitude && longitude){
     possibleOutcome = cityName.length * latitude * longitude;
     requestedOutcome = suggestedCityName.length * suggestedLatitude * suggestedLongitude;
  }else {
       possibleOutcome = cityName.length;
       requestedOutcome = suggestedCityName.length;
  }
 

let score = requestedOutcome/possibleOutcome;

  return score;
}
// main();
console.log(calculateScore('les escalde',35,68,'les Escaldes',36.72895,68.857)
);
 */