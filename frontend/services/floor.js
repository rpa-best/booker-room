export const getRoom = async (location, room) => {
    return {
        id: 1,
        name: `${Math.floor(Math.random() * 100)}`,
        type: {
            id: 1,
            name: "Хранение для интернет магазинов"
        },
        size: "xl",
        images: [
            {
                id: 1,
                image: "/test/office.jpg",
            },
            {
                id: 1,
                image: "/test/office.jpg",
            },
            {
                id: 1,
                image: "/test/office.jpg",
            },
        ]
    }
}

export const getFloor = async (location_id, id, params) => {
    const rooms = []
    for (let i = 0; i < 32; i++) {
        rooms.push(await getRoom())
    }
    return {
        id: 1,
        name: "1-Этаж",
        count_rooms: 32,
        rooms,
    }
}