import React, { useContext } from 'react';
import { View, Text, Switch } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const SettingsScreen: React.FC = () => {
    const { isCelsius, toggleUnit } = useContext(ThemeContext);

    return (
        <View className="flex-1 p-4">
            <View className="flex-row items-center justify-between">
                <Text className="text-lg">Temperature Unit</Text>
                <View className="flex-row items-center">
                    <Text>Celsius</Text>
                    <Switch value={!isCelsius} onValueChange={toggleUnit} />
                    <Text>Fahrenheit</Text>
                </View>
            </View>
        </View>
    );
};

export default SettingsScreen;
