import { useToast } from './useToast';
import { getWeatherByCity, getWeatherByCoords } from '../services/weatherService';
import { WeatherData } from '../types';

export const useWeather = () => {
    const { showToast } = useToast();

    const fetchWeatherByCity = async (city: string): Promise<WeatherData | null> => {
        try {
            const data = await getWeatherByCity(city);
            return data;
        } catch (error: any) {
            showToast('error', 'Error fetching weather data', error.message || 'Something went wrong.');
            return null;
        }
    };

    const fetchWeatherByCoords = async (): Promise<WeatherData | null> => {
        try {
            const data = await getWeatherByCoords();
            return data;
        } catch (error: any) {
            showToast('error', 'Error fetching weather data', error.message || 'Something went wrong.');
            return null;
        }
    };

    return {
        fetchWeatherByCity,
        fetchWeatherByCoords,
    };
};
