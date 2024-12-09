import React from 'react';
import { View, Text, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

interface DetailsScreenProps {
    route: DetailsScreenRouteProp;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
    const { weather } = route.params;

    return (
        <View className="flex-1 p-4">
            <Text className="text-2xl font-bold">{weather.name}</Text>
            <Image
                source={{ uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }}
                style={{ width: 100, height: 100 }}
            />
            <Text className="text-lg">
                Temperature: {weather.main.temp}°{weather.main.temp >= 0 ? 'C' : 'F'}
            </Text>
            <Text className="text-lg">Humidity: {weather.main.humidity}%</Text>
            <Text className="text-lg">Wind Speed: {weather.wind.speed} m/s</Text>
            <Text className="text-lg">
                Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </Text>
            <Text className="text-lg">
                Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </Text>
        </View>
    );
};

export default DetailsScreen;
