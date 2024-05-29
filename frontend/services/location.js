import { getFloor } from "./floor"

export const getLocation = async (id, params) => {
    return {
        id: 1,
        name: "Test location",
        address: "Парголовская улица, 8",
        desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
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
            await getFloor()
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