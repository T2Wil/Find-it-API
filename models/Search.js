/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import readline from 'readline';
import fs from 'fs';
import City from './City';

class Search {
  constructor() {
    this.cities = [];
  }

  addCity(city) {
    this.cities.push(city);
  }

  getCities() {
    return this.cities;
  }

  filterCityName(suggestedCityName, cityName) {
    for (let index = 0; index < suggestedCityName.length; index++) {
      if (suggestedCityName.charAt(index) !== cityName.charAt(index)) {
        return false;
      }
    }
    return true;
  }

  calculateScore(suggestedCityName, cityName) {
    return suggestedCityName.length / cityName.length;
  }

  retrieveMatchingCities(reqCity, reqLat, reqLong) {
    return new Promise((resolve) => {
      reqCity = reqCity.toLowerCase();
      const cityInfo = {
        indexOfCityName: 1,
        indexOfAsciiName: 2,
        indexOfAltNames: 3,
        indexOfLat: 4,
        indexOfLong: 5,
        indexOfTimeZone: 17,
      };
      const filePath = './models/cities15000.txt';
      const readerStream = fs.createReadStream(filePath);
      readerStream.setEncoding('UTF8');

      const rl = readline.createInterface({
        input: fs.createReadStream(filePath),
      });
      rl.on('line', (line) => {
        const currentCityName = line.split('	')[cityInfo.indexOfCityName].toLowerCase();
        const currentAltNames = line.split('	')[cityInfo.indexOfAltNames].toLowerCase();
        const currentLatitude = line.split('	')[cityInfo.indexOfLat];
        const currentLongitude = line.split('	')[cityInfo.indexOfLong];
        const currentTimeZone = line.split('	')[cityInfo.indexOfTimeZone];

        const hasAMatch = this.filterCityName(reqCity, currentCityName);
        if (hasAMatch) {
          const score = this.calculateScore(reqCity, currentCityName);
          const arrTimeZone = currentTimeZone.split('/');
          const country = arrTimeZone[1];
          const newCity = new City(currentCityName, country, currentLatitude, currentLongitude, score);
          const retrievedCity = newCity.getCity();
          this.cities[this.cities.length] = retrievedCity;
        }
      });
      rl.on('close', () => {
        resolve(this.cities.sort((city1, city2) => city2.score - city1.score));
        this.cities = [];
      });
    });
  }
}
export default Search;
