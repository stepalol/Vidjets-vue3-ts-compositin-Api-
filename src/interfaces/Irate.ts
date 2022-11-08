export interface city {
    name:string,
    cords: {
      lat: string,
      lon: string
    }
}

export interface FilterCity {
    index: {name: string, city:string}
}

export interface PropsFilter {
    filteredList: Array<{city: string, name: string}>
}

export interface Course {
    CharCode: string
    ID: string
    Name: string
    Nominal: number
    NumCode: string
    Previous: number
    Value: number
}
