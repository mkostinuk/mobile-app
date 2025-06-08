export interface WeatherItem {
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

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherData {
    city: {
        name: string;
    };
    list: WeatherItem[];
}
