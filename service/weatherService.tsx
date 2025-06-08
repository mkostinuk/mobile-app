import axios from 'axios';
import {Coordinates, WeatherData} from '../type/weatherTypes.ts';
import Config from 'react-native-config';

export const getCoordinates = async (city:string) : Promise<Coordinates | null> => {
    try {
        const response = await axios.get(Config.WEATHER_API_CITY as string,
            {
                params: {
                    q: city,
                    appid: Config.WEATHER_API_KEY,
                    limit: 1,
                },
            }
        );
        if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

export const fetchWeatherData = async (coordinates: Coordinates): Promise<WeatherData|null> => {
    if (!coordinates) {return null;}
    try {
        const response = await axios.get(
            Config.WEATHER_API_DATA as string,
            {
                params: {
                    lat: coordinates.lat,
                    lon: coordinates.lon,
                    appid: Config.WEATHER_API_KEY,
                    units: 'metric',
                },
            }
        );
        return response.data;
    } catch (error: any) {
        console.error('Error fetching 5-day weather data:', error.response?.data || error.message);
        throw error;
    }
};
