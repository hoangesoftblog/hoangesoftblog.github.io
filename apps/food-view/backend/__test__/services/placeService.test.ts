// __tests__/services/placeService.test.ts

import { Place } from '@/models';
import { getPlaceService, PlaceService } from '@/services/placeService';
// import { connectDB, closeDB, getDB } from '@/utils/db';
import { Db, MongoClient, MongoClientOptions, ServerApiVersion } from 'mongodb';

// The mongodb-memory-server downloaded is in 
// C:\Users\hoang\Desktop\projects\hoangesoftblog.github.io\node_modules\.cache\mongodb-memory-server
import { MongoMemoryServer } from "mongodb-memory-server";


describe('PlaceService', () => {
    let placeService: PlaceService;
    let samplePlaceId: string;
    let db: Db;
    const collectionName = "test_places";
    let mongod: MongoMemoryServer;
    let mongoClient: MongoClient;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        mongoClient = new MongoClient(mongod.getUri(), ({
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        } as MongoClientOptions));

        try {
            await mongoClient.connect();
            db = mongoClient.db();
            console.log('Connected to the database - ' + db.databaseName);
            // const cs = await database.collections();
            // cs.forEach((e: Collection) => console.log(e.collectionName));
        } catch (error) {
            console.error('Error connecting to the database', error);
            throw error;
            // process.exit(1);
        }

        await db.createCollection(collectionName);
        placeService = new PlaceService(collectionName, db);
    });

    beforeEach(async () => {
        // Create sample data before each test
        const samplePlace = {
            name: 'Sample Place',
            category: 'Sample Category',
            address: {
                street: 'Sample Street',
                city: 'Sample City',
                district: 'Sample District',
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
        } as Place;
        samplePlaceId = await placeService.createPlace(samplePlace);

        const docs2 = [
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
            // Mockup 3: Hidden Book Nook
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
            // Mockup 4: Vibrant Food Market
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
            // Mockup 1: Cozy Coffee Shop
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

        let results = await placeService.createPlaces(docs2 as any as Place[]);
        console.log(results)
    });

    afterEach(async () => {
        // Delete sample data after each test
        if (samplePlaceId) {
            await placeService.deletePlace(samplePlaceId);
        }
    });

    afterAll(async () => {
        // Add cleanup code if needed
        try {
            await db.dropCollection(collectionName);
            await mongoClient.close();
            await mongod.stop();
        }
        catch (error) {
            throw error;
        }
    });


    it('should create a place', async () => {
        expect(samplePlaceId).toBeDefined();
    });

    it('should get a place by ID', async () => {
        const place = await placeService.getPlaceById(samplePlaceId);
        expect(place).toBeDefined();
        expect(place?.name).toBe('Sample Place');
    });

    it('should get all places', async () => {
        const data: { data: Place[], hasNext: boolean } = await placeService.getPlaces();
        const places = data.data;
        const hasNext = data.hasNext;
        expect(places).toBeDefined();
        expect(places.length).toBeGreaterThan(0);
    });

    it('should update a place', async () => {
        const updateData = {
            name: 'Updated Test Place',
            category: 'Updated Test Category',
        };

        const updated = await placeService.updatePlace(samplePlaceId, updateData);
        expect(updated).toBe(true);

        const updatedPlace = await placeService.getPlaceById(samplePlaceId);
        expect(updatedPlace).toBeDefined();
        expect(updatedPlace?.name).toBe('Updated Test Place');
        expect(updatedPlace?.category).toBe('Updated Test Category');
    });

    it('should delete a place', async () => {
        const deleted = await placeService.deletePlace(samplePlaceId);
        expect(deleted).toBe(true);

        const nonExistentPlace = await placeService.getPlaceById(samplePlaceId);
        expect(nonExistentPlace).toBeNull();
    });
});
