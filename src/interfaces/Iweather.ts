export interface WeatherData {
    name: string,
    sys: {
        country: string,
    },
    main: {
        temp: number,
        'temp_max': number,
        'temp_min': number,
    },
    weather: [
        {
        description: string,
        icon: string,
        }
    ]
}

export interface WeatherState {
    currentWeather: WeatherData
}

export interface Coords {
    lat:number,
    lon:number
}
