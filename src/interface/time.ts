interface Time {
    time:string,
    name:string,
    gmt:number,
}

interface FilterCity {
    index: {name: string, city:string}
}

interface PropsFilter {
    filteredList: Array<{city: string, name: string}>
}
