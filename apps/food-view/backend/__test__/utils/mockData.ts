export const mockRealPlaces = [
    {
        "name": "Playful Pet Park",
        "category": "park",
        "address": {
            "street": "1213 Maple Street",
            "city": "Pawville",
            "district": "West side",
            "postalCode": "78901"
        },
        "location": {
            "type": "Point",
            "coordinates": [-118.78901, 41.78901]
        },
        "openingHours": {
            "start": "06:00AM",
            "end": "10:00PM",
            "closedOnTuesdays": true
        },
        "amenities": ["fenced area", "water fountains", "obstacle course", "dog waste disposal bins"],
        "createdAt": "2023-12-15T20:00:00.000Z",
        "updatedAt": "2023-12-15T20:00:00.000Z"
    },
    {
        "name": "Lively Art Studio",
        "category": "art",
        "address": {
            "street": "456 Elm Street",
            "city": "Hopeville",
            "district": "East side",
            "postalCode": "56789"
        },
        "location": {
            "type": "Point",
            "coordinates": [-121.56789, 38.56789]
        },
        "openingHours": {
            "start": "10:00AM",
            "end": "06:00PM",
            "closedOnMondays": true
        },
        "createdAt": "2023-12-18T10:00:00.000Z",
        "updatedAt": "2023-12-18T10:00:00.000Z"
    },
    {
        "name": "Hidden Book Nook",
        "category": "bookstore",
        "address": {
            "street": "789 Oak Street",
            "city": "Bookhaven",
            "district": "Old Town",
            "postalCode": "90123"
        },
        "location": {
            "type": "Point",
            "coordinates": [-120.90123, 39.90123]
        },
        "openingHours": {
            "start": "11:00AM",
            "end": "09:00PM",
            "extendedHoursOnFridays": true
        },
        "createdAt": "2023-12-17T14:00:00.000Z",
        "updatedAt": "2023-12-17T14:00:00.000Z"
    },
    {
        "name": "Vibrant Food Market",
        "category": "grocery",
        "address": {
            "street": "1011 Pine Street",
            "city": "Freshland",
            "district": "South Market",
            "postalCode": "34567"
        },
        "location": {
            "type": "Point",
            "coordinates": [-119.34567, 40.34567]
        },
        "openingHours": {
            "start": "08:00AM",
            "end": "08:00PM",
            "closedOnSundays": true
        },
        "createdAt": "2023-12-16T18:00:00.000Z",
        "updatedAt": "2023-12-16T18:00:00.000Z"
    },
    {
        "name": "Cozy Coffee Shop",
        "category": "cafe",
        "address": {
            "street": "123 Main Street",
            "city": "Sunnyville",
            "district": "Central District",
            "postalCode": "12345"
        },
        "location": {
            "type": "Point",
            "coordinates": [-122.12345, 37.12345]
        },
        "openingHours": {
            "start": "07:00AM",
            "end": "10:00PM"
        },
        "createdAt": "2023-12-19T00:00:00.000Z",
        "updatedAt": "2023-12-19T00:00:00.000Z"
    },
    {
        "name": "Tranquil Yoga Studio",
        "category": "wellness",
        "address": {
            "street": "1617 Serenity Lane",
            "city": "Balanceville",
            "district": "Hilltop",
            "postalCode": "56789"
        },
        "location": {
            "type": "Point",
            "coordinates": [-116.56789, 43.56789]
        },
        "amenities": ["heated floors", "aromatherapy diffusers", "meditation room", "yoga props"],
        "openingHours": {
            "start": "07:00AM",
            "end": "09:00PM",
            "specialMorningClassesOnSundays": true
        },
        "createdAt": "2023-12-13T06:00:00.000Z",
        "updatedAt": "2023-12-13T06:00:00.000Z"
    },
    {
        "name": "Movie Magic Cinema",
        "category": "entertainment",
        "address": {
            "street": "1415 Hollywood Blvd",
            "city": "Starlight City",
            "district": "Downtown",
            "postalCode": "23456"
        },
        "location": {
            "type": "Point",
            "coordinates": [-117.23456, 42.23456]
        },
        "amenities": ["luxury seating", "concessions stand", "arcade", "IMAX theater"],
        "openingHours": {
            "start": "10:00AM",
            "end": "12:00AM",
            "lateNightShowingsFridaySaturday": true
        },
        "createdAt": "2023-12-14T12:00:00.000Z",
        "updatedAt": "2023-12-14T12:00:00.000Z"
    },
    {
        "name": "Buzzing Board Game Cafe",
        "category": "games",
        "address": {
            "street": "1819 Dice Avenue",
            "city": "Funhaven",
            "district": "Central District",
            "postalCode": "89012"
        },
        "location": {
            "type": "Point",
            "coordinates": [-115.89012, 44.89012]
        },
        "amenities": ["extensive board game library", "cozy seating areas", "snacks and drinks menu", "friendly staff to recommend games"],
        "openingHours": {
            "start": "12:00PM",
            "end": "11:00PM",
        },
        "createdAt": "2023-12-12T10:00:00.000Z",
        "updatedAt": "2023-12-12T10:00:00.000Z"
    },
];

export const mockOrderPlaces = [...Array(10).keys()].map((e: number) => (
    {
        name: `${e}`,
        category: 'Sample Category',
        address: {
            street: `Sample Street ${e}`,
            city: `Sample City ${e}`,
            district: `Sample District ${e}`,
            postalCode: '12345',
        },
        location: {
            type: 'Point',
            coordinates: [0, 0],
        },
        openingHours: {
            start: '08:00',
            end: '17:00',
        },
    }
));