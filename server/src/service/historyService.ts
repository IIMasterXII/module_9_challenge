import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

// TODO: Define a City class with name and id properties
interface City {
  name: string;
  id: string;
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {
    return JSON.parse(fs.readFileSync('db/searchHistory.json', 'utf8'));
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    const jsonData = JSON.stringify(cities);
    fs.writeFileSync('db/searchHistory.json', jsonData, "utf8");
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities() {
    const searchHistory: City[] = await this.read();
    return searchHistory;
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const searchHistory = await this.getCities();
    searchHistory.push({name: city, id: uuidv4()});
    this.write(searchHistory);
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {

  // }
}

export default new HistoryService();
