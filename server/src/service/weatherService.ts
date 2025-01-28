import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
// interface Coordinates {
//   latitude: number;
//   longitude: number
// }

// TODO: Define a class for the Weather object

class Weather {
  city: string
  date: string
  icon: string
  iconDescription: string
  tempF: number
  windSpeed: number
  humidity: number

  constructor(city:string, date:string, icon:string, iconDescription:string, tempF:number, windSpeed:number, humidity:number){
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.tempF = tempF;
    this.windSpeed = windSpeed;
    this.humidity = humidity
  }
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL = process.env.API_BASE_URL;
  APIkey = process.env.API_KEY;

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {

  // }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {

  // }
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {

  // }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {

  // }
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {

  // }
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {

  // }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const weatherData = new Weather(
      response.city.name, 
      response.list[0].dt_txt, 
      response.list[0].weather[0].icon,
      response.list[0].weather[0].description,
      response.list[0].main.humidity,
      response.list[0].wind.speed,
      response.list[0].main.temp
    )
    return weatherData;
  }
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
  // }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    let data = [];
    try {
      // Make the API request
      const response = await fetch(this.baseURL + "/data/2.5/forecast?q=" + city + "&appid=" + this.APIkey);
  
      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON data
      data = await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    let forecastArray = [this.parseCurrentWeather(data)];
    for(let i = 1; i < data.list.length; i++){
      forecastArray.push(
        new Weather(
          data.city.name, 
          data.list[i].dt_txt, 
          data.list[i].weather[0].icon,
          data.list[i].weather[0].description,
          data.list[i].main.humidity,
          data.list[i].wind.speed,
          data.list[i].main.temp
        )
      )
    }
    return JSON.stringify(forecastArray);
  }
}

export default new WeatherService();
