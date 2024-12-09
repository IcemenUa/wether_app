import { googleApi } from './api';

interface GoogleAutocompletePrediction {
    description: string;
    place_id: string;
}

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || 'YOUR_GOOGLE_API_KEY_HERE'; // Consider using environment variable

export async function fetchCitySuggestions(query: string): Promise<GoogleAutocompletePrediction[]> {
    console.log(`[fetchCitySuggestions] Query: ${query}`);
    try {
        const response = await googleApi.get('/place/autocomplete/json', {
            params: {
                input: query,
                types: '(cities)',
                key: GOOGLE_API_KEY,
            },
        });

        console.log('[fetchCitySuggestions] Axios response:', response);
        const data = response.data;
        if (data.status === 'OK') {
            return data.predictions;
        } else {
            console.log(
                `[fetchCitySuggestions] Places API Error: ${data.status}`,
                data.error_message ? `Message: ${data.error_message}` : ''
            );
            return [];
        }
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
        return [];
    }
}
