// src/screens/HomeScreen/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useWeather } from '../../hooks/useWeather';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { fetchCitySuggestions } from '../../services/googleService'; // Import the function from googleService

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface GoogleAutocompletePrediction {
    description: string;
    place_id: string;
}

const HomeScreen: React.FC = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<GoogleAutocompletePrediction[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const { fetchWeatherByCity, fetchWeatherByCoords } = useWeather();

    useEffect(() => {
        if (query.length < 3) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        const timeoutId = setTimeout(() => {
            fetchCitySuggestions(query)
                .then(predictions => {
                    setSuggestions(predictions);
                })
                .catch(error => {
                    console.error('Error fetching city suggestions:', error);
                    setSuggestions([]);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, 500); // Debounce to avoid excessive API calls

        return () => clearTimeout(timeoutId);
    }, [query]);

    const handleSelectCity = async (cityDescription: string) => {
        const weatherData = await fetchWeatherByCity(cityDescription);
        if (weatherData) {
            navigation.navigate('Details', { weather: weatherData });
        }
    };

    const handleCurrentLocation = async () => {
        const weatherData = await fetchWeatherByCoords();
        if (weatherData) {
            navigation.navigate('Details', { weather: weatherData });
        }
    };

    return (
        <View className="flex-1 p-4 bg-white">
            <TextInput
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="Search for a city"
                value={query}
                onChangeText={setQuery}
            />

            {loading && <ActivityIndicator size="small" color="#000" />}

            {!loading && suggestions.length > 0 && (
                <FlatList
                    data={suggestions}
                    keyExtractor={(item) => item.place_id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="p-2 border-b border-gray-200"
                            onPress={() => handleSelectCity(item.description)}
                        >
                            <Text className="text-lg">{item.description}</Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {!loading && query && suggestions.length === 0 && query.length >= 3 && (
                <Text className="text-gray-500 mt-2">No matching cities found.</Text>
            )}

            <View className="mt-4">
                <Button title="Use Current Location" onPress={handleCurrentLocation} />
            </View>
        </View>
    );
};

export default HomeScreen;
