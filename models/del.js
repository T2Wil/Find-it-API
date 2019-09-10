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