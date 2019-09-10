class City{
    constructor(city,country,latitude,longitude,score){
        this.name = `${city},${country}`;
        this.latitude = latitude;
        this.longitude = longitude;
        this.score = score;
        // console.log(`getCity from City : ${JSON.stringify(this.getCity())}`);
    }
    getCity(){
        return {
            name: this.name,
            latitude: this.latitude,
            longitude: this.longitude,
            score: this.score
        }
    }
}
export default City;