export const getRoom = async (location_id, floor_id, id) => {
    return {
        id: 1,
        name: "Room 1",
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