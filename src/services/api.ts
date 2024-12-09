import axios from 'axios';

export const googleApi = axios.create({
    baseURL: 'https://maps.googleapis.com/maps/api',
    headers: {
        'Content-Type': 'application/json',
        'Custom-Header': 'YourCustomHeaderValue',
    },
});

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    headers: {
        'Content-Type': 'application/json',
    },
});
