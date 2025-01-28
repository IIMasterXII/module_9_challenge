import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  HistoryService.addCity(req.body.cityName)
  const response = WeatherService.getWeatherForCity(req.body.cityName);
  console.log(response)
  return res.status(200).json();
});

// TODO: GET search history
router.get('/history', async (_, res) => {
  try {
    const cities = await HistoryService.getCities();
    return res.status(200).json(cities);
  } catch (error) {
    console.error('Error getting cities:', error);
    return res.status(500).json({ message: 'Error getting cities', error });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  console.log(req)
  console.log(res)
});

export default router;
