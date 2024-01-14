// __tests__/services/placeService.test.ts

import { Place, PlaceWithoutId } from '@/models';
import { getPlaceService, PlaceService } from '@/services/placeService';
// import { connectDB, closeDB, getDB } from '@/utils/db';
import { Db, MongoClient, MongoClientOptions, ObjectId, ServerApiVersion } from 'mongodb';

// The mongodb-memory-server downloaded is in 
// C:\Users\hoang\Desktop\projects\hoangesoftblog.github.io\node_modules\.cache\mongodb-memory-server
import { MongoMemoryServer } from "mongodb-memory-server";

import { mockOrderPlaces } from "../utils/mockData";


describe('PlaceService', () => {
    let placeService: PlaceService;
    let samplePlaceId: string | ObjectId;
    let insertedIds: { [key: number]: string | ObjectId };
    let db: Db;
    const collectionName = "test_places";
    let mongod: MongoMemoryServer;
    let mongoClient: MongoClient;

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        console.log("URI: " + mongod.getUri());
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
    });
    
    beforeEach(async () => {
        await db.createCollection(collectionName);
        placeService = new PlaceService(db.collection<Place>(collectionName));

        // Create sample data before each test
        const mockData = mockOrderPlaces;
        insertedIds = await placeService.createPlaces(mockData as any as PlaceWithoutId[]);
        samplePlaceId = insertedIds['0'] as string | ObjectId;
    });

    afterEach(async () => {
        // const filteredIds = Object
        //     .values(insertedIds)
        //     .map((e: string | ObjectId) => ({ "_id": e }));
        // // 1 of many ways to delete places with list of "_id" at the same time
        // // Comment out since if a test needs to create a place, that place gets remained in the database.
        // await db.collection(collectionName).deleteMany({ $or: filteredIds } as any);

        await db.dropCollection(collectionName);
    });

    afterAll(async () => {
        // Add cleanup code if needed
        try {
            mongod
            await db.dropCollection(collectionName);
            await mongoClient.close();
            await mongod.stop();
        }
        catch (error) {
            throw error;
        }
    });

    it("collection is invalid", async () => {
        const tempPlaceService = new PlaceService(db.collection<Place>(""));
        const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await tempPlaceService.getPlaces({
            page: 1
        }); 
        expect(places).toBeUndefined();
    });


    // it('should create a place', async () => {
    //     expect(samplePlaceId).toBeDefined();
    // });

    // it.skip('create a place with undefined "_id"', async () => {
    //     const tempPlace={"_id":undefined,"name":"Playful Pet Park","category":"park","address":{"street":"1213 Maple Street","city":"Pawville","district":"West side","postalCode":"78901"},"location":{"type":"Point","coordinates":[-118.78901,41.78901] as [number, number]},"openingHours":{"start":"06:00AM","end":"10:00PM","closedOnTuesdays":true},"amenities":["fenced area","water fountains","obstacle course","dog waste disposal bins"],"createdAt":"2023-12-15T20:00:00.000Z","updatedAt":"2023-12-15T20:00:00.000Z"};
    //     const id = await placeService.createPlace(tempPlace as any as PlaceWithoutId);
    //     await expect(db.collection(collectionName).countDocuments()).resolves.toEqual(mockOrderPlaces.length + 1);
    // });

    // it('should create multiple places', async () => {
    //     expect(insertedIds).toBeDefined();
    //     await expect(db.collection(collectionName).countDocuments()).resolves.toEqual(mockOrderPlaces.length);
    // });

    // it('should get a place by ID', async () => {
    //     const place = await placeService.getPlaceById(samplePlaceId);
    //     expect(place).toBeDefined();
    //     expect(place?.name).toBe('0');
    // });

    // it('should update a place', async () => {
    //     const updateData = {
    //         name: 'Updated Test Place',
    //         category: 'Updated Test Category',
    //     };

    //     const updated = await placeService.updatePlace(samplePlaceId, updateData);
    //     expect(updated).toBe(true);

    //     const updatedPlace = await placeService.getPlaceById(samplePlaceId);
    //     expect(updatedPlace).toBeDefined();
    //     expect(updatedPlace?.name).toBe('Updated Test Place');
    //     expect(updatedPlace?.category).toBe('Updated Test Category');
    // });

    // it('should delete a place', async () => {
    //     const deleted = await placeService.deletePlace(samplePlaceId);
    //     expect(deleted).toBe(true);

    //     const nonExistentPlace = await placeService.getPlaceById(samplePlaceId);
    //     expect(nonExistentPlace).toBeNull();
    // });


    // describe.skip('getPlaces', () => {
    //     describe('Positives', () => {
    //         it('No arguments - should get 5 places, hasNext is true', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces();
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(hasNext).toEqual(true);
    //         });
            
    //         it('Near end, full args (DB Size=10, limit=3, page=4, sort="-name") - should get 1 place, name ["0"]', async () => {  
    //             const limit = 3;      
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 sort: { name: -1 }, // Sort by name in ascending order
    //                 page: Math.ceil(mockOrderPlaces.length / limit),
    //                 limit,
    //             });
        
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(mockOrderPlaces.length % limit);
    //             // Add assertions for sorting, filtering, pagination validation
    //             // For instance, you can check if the first place's name is as expected based on sorting
    //             expect(places[0].name).toBe('0');
    //             expect(hasNext).toEqual(false);
    //         });
    
    //         it('Outside (DB Size=10, limit=3, page=5, sort="-name") - should get 0 place', async () => {  
    //             const limit = 3;      
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 sort: { name: -1 }, // Sort by name in ascending order
    //                 page: Math.ceil(mockOrderPlaces.length / limit) + 1,
    //                 limit,
    //             });
        
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(0);
    //             expect(hasNext).toEqual(false);
    //         });
    
    //         it('Test sorting (DB size=10, sort="-name", limit=5) - should return 5 places with names ["9", "8", "7", "6", "5"]', async () => {  
    //             const limit = 5;      
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 sort: { name: -1 }, // Sort by name in ascending order
    //                 page: 1,
    //                 limit,
    //                 //   filter: { category: 'Sample Category' }, // Filter by category
    //             });
    //             const placeNames = places.map(place => place.name);
        
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             // Add assertions for sorting, filtering, pagination validation
    //             // For instance, you can check if the first place's name is as expected based on sorting
    //             expect(placeNames).toEqual(["9", "8", "7", "6", "5"]);
    //             expect(hasNext).toEqual(true);
    //         });
    
    //         it('Test limit (DB size=10, limit=3) - should return 3 places with names ["0", "1", "2"]', async () => {  
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 limit: 3,
    //             });
    
    //             const placeNames = places.map(place => place.name);
        
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(3);
    //             // Add assertions for sorting, filtering, pagination validation
    //             // For instance, you can check if the first place's name is as expected based on sorting
    //             expect(placeNames).toEqual(["0", "1", "2"]);
    //             expect(hasNext).toEqual(true);
    //         });
    
    //         it('Test page (DB size=10, limit=3, page=3) - should return places with names ["7", "8", "9"]', async () => {  
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 limit: 3,
    //                 page: 3
    //             });
        
    //             const placeNames = places.map(place => place.name);
        
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(3);
    //             // Add assertions for sorting, filtering, pagination validation
    //             // For instance, you can check if the first place's name is as expected based on sorting
    //             expect(placeNames).toEqual(["6", "7", "8"]);
    //             expect(hasNext).toEqual(true);
    //         });
    //     });

    //     describe.skip("Negatives", () => {
    //         it('Invalid page - negative - Return as default (1)', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 page: 0
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(true);
    //         });
    
    //         it('Invalid page - float - Return as default (1)', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 page: 2.5
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(true);
    //         });

    //         it('Invalid page - Infinity - Same as "Outside"', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 page: 10000000
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(0);
    //             // expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(false);
    //         });

    //         it('Invalid page - NaN - Return as default (1)', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 page: NaN
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(true);
    //         });

    //         it('Invalid limit - negative - Should return as default (1)', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 limit: -1
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(true);
    //         });
    
    //         it('Invalid limit - float - Should return as default (1)', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 limit: 2.5
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(true);
    //         });

    //         it('Invalid limit - Infinity - Should return to default', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 limit: Infinity
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             // expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(false);
    //         });

    //         it('Invalid limit - NaN - Should return as default (1)', async () => {
    //             const {data: places, hasNext}: { data: Place[], hasNext: boolean } = await placeService.getPlaces({
    //                 limit: NaN
    //             });
    //             const placeNames = places.map(place => place.name);
    //             expect(places).toBeDefined();
    //             expect(places.length).toEqual(5);
    //             expect(placeNames).toEqual(["0", "1", "2", "3", "4"]);
    //             expect(hasNext).toEqual(true);
    //         });
    //     });
    // });
});
