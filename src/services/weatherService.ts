import { Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { WeatherData } from '../types';
import { weatherApi } from './api';

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

if (!API_KEY) {
    console.warn('Warning: OPENWEATHERMAP_API_KEY is not set. Weather requests will fail.');
}

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
    try {
        const response = await weatherApi.get('/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather by city:', error);
        throw error;
    }
};

export const getWeatherByCoords = async (): Promise<WeatherData> => {
    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await weatherApi.get('/weather', {
                        params: {
                            lat: latitude,
                            lon: longitude,
                            appid: API_KEY,
                            units: 'metric',
                        },
                    });
                    resolve(response.data);
                } catch (error) {
                    console.error('Error fetching weather by coordinates:', error);
                    reject(error);
                }
            },
            (error) => {
                Alert.alert('Location Error', `Unable to fetch your location. ${error.message}`);
                console.error('Location Error:', error);
                reject(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    });
};
