export const getLocation = async (id, params) => {
    return {
        id: 1,
        name: "Test location",
        address: "Парголовская улица, 8",
        rating: 4,
        point: [30.347317, 59.985827],
        image: {
            id: 1,
            image: "/test/office.jpg",
        },
        images: [
            {
                id: 1,
                image: "/test/office.jpg",
            }
        ],
        floors: [
            {
                id: 1,
                name: "1-Этаж",
                count_rooms: 32,
            },
            {
                id: 2,
                name: "3-Этаж",
                count_rooms: 24,
            }
        ]
    }
}

export const getLocations = async (params) => {
    return {
        type: "FeatureCollection",
        features: [
            {
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [69.204664, 41.313296]
                },
                properties: await getLocation(),
            },
        ]
    }
}