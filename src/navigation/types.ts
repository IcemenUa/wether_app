import { WeatherData } from '../types';

export type RootStackParamList = {
    Home: undefined;
    Details: { weather: WeatherData };
    Settings: undefined;
};
