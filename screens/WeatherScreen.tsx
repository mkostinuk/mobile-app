import React, {useCallback, useEffect, useState} from 'react';
import { Alert, Image, ScrollView, Text, TextInput, View} from 'react-native';
import CustomButton from '../components/CustomButton';
import { Coordinates, WeatherData } from '../type/weatherTypes';
import {styles} from '../styles/weatherStyles';
import {getCoordinates, fetchWeatherData} from '../service/weatherService.tsx';

const WeatherScreen = () => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [city, setCity] = useState<string>('Zhytomyr');
    const [inputCity, setInputCity] = useState<string>('');

    const handleCityChange = () => {
        if (inputCity.trim()) {
            setCity(inputCity.trim());
            setWeatherData(null);
        }
    };

    const loadCoordinates = useCallback(async () => {
        try {
            const coords = await getCoordinates(city);
            setCoordinates(coords);
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            Alert.alert('Error fetching coordinates', 'Please check the city name and try again.');
        }
    }, [city]);

    const loadWeatherData = useCallback( async () => {
        try{
            const data = await fetchWeatherData(coordinates as Coordinates);
            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            Alert.alert('Error fetching weather data', 'Please try again later.');
        }
    },[coordinates]);

    useEffect(() => {
        loadCoordinates().then(() => {});
    }, [city, loadCoordinates]);

    useEffect(() => {
        if (coordinates) {
            loadWeatherData().then(() => {});
        }
    }, [coordinates, loadWeatherData]);

    const renderWeatherData = () => {
        if (!weatherData) {
            return <Text style={styles.loadingText}>Loading...</Text>;
        }

        if (weatherData.list.length === 0) {
            return <Text style={styles.noDataText}>No forecast data available</Text>;
        }

        const filtered = weatherData.list.filter((_, index) => index % 8 === 0);

        return filtered.map((item, index) => (
            <View key={index} style={styles.weatherCard}>
                <View style={styles.weatherHeader}>
                    <Text style={styles.dateText}>{new Date(item.dt_txt).toLocaleDateString()}</Text>
                    <View style={styles.weatherIconContainer}>
                        <Image
                            source={{
                                uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                            }}
                            style={styles.weatherIcon}
                        />
                        <Text style={styles.descriptionText}>{item.weather[0].description}</Text>
                    </View>
                </View>
                <View style={styles.weatherDetails}>
                    <Text style={styles.tempText}>Temp: {item.main.temp.toFixed(1)}°C</Text>
                    <Text style={styles.feelsLikeText}>Feels like: {item.main.feels_like.toFixed(1)}°C</Text>
                    <Text style={styles.minMaxText}>Min: {item.main.temp_min.toFixed(1)}°C / Max: {item.main.temp_max.toFixed(1)}°C</Text>
                </View>
            </View>
        ));
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city name"
                    placeholderTextColor="#999"
                    value={inputCity}
                    onChangeText={setInputCity}
                />
                <View style={styles.buttonContainer}>
                <CustomButton
                    title="Get Weather"
                    onPress={handleCityChange}
                />
                </View>
            </View>

            {weatherData && (
                <View style={styles.weatherContainer}>
                    <Text style={styles.cityName}>{weatherData.city.name}</Text>
                    {renderWeatherData()}
                </View>
            )}
        </ScrollView>
    );
};


export default WeatherScreen;
