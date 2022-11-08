export interface WeatherData {
    name: string,
    sys: {
        country: string,
    },
    main: {
        temp: number,
        tempMax: number,
        tempMin: number,
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
