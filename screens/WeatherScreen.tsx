import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Image, ScrollView, Text, TextInput, View, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton.tsx';

const API_KEY = 'aed43d01ba699a7e61ce578cb448eb65';

interface WeatherItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
    };
    dt_txt: string;
    weather: {
        description: string;
        icon: string;
    }[];
}

interface Coordinates {
    lon: number;
    lat: number;
}

interface WeatherData {
    city: {
        name: string;
    };
    list: WeatherItem[];
}

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

    const getCoordinates = useCallback(async () => {
        try {
            const response = await axios.get(
                'https://api.openweathermap.org/geo/1.0/direct',
                {
                    params: {
                        q: city,
                        appid: API_KEY,
                        limit: 1,
                    },
                }
            );
            if (response.data.length > 0) {
                const { lat, lon } = response.data[0];
                setCoordinates({ lat, lon });
            } else {
                Alert.alert('Error', 'City not found');
            }
        } catch (error) {
            console.error('Error fetching coordinates:', error);
            Alert.alert('Error', 'Failed to fetch coordinates');
        }
    }, [city]);

    const fetchWeatherData = useCallback(async () => {
        if (!coordinates) {return;}
        try {
            const response = await axios.get(
                'https://api.openweathermap.org/data/2.5/forecast',
                {
                    params: {
                        lat: coordinates.lat,
                        lon: coordinates.lon,
                        appid: API_KEY,
                        units: 'metric',
                    },
                }
            );
            setWeatherData(response.data);
        } catch (error: any) {
            console.error('Error fetching 5-day weather data:', error.response?.data || error.message);
        }
    }, [coordinates]);

    useEffect(() => {
        getCoordinates();
    }, [city, getCoordinates]);

    useEffect(() => {
        if (coordinates) {
            fetchWeatherData();
        }
    }, [coordinates, fetchWeatherData]);

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

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        marginBottom: 20,
    },
    buttonContainer:{
        alignItems:'center',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    weatherContainer: {
        marginTop: 10,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    weatherCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    weatherHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    weatherIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    weatherIcon: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    descriptionText: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    weatherDetails: {
        marginTop: 10,
    },
    tempText: {
        fontSize: 16,
        color: '#444',
        marginBottom: 5,
    },
    feelsLikeText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    minMaxText: {
        fontSize: 14,
        color: '#666',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    noDataText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#f44336',
    },
});

export default WeatherScreen;
