// __tests__/services/placeService.test.ts

import { Place } from '@/models';
import { getPlaceService, PlaceService } from '@/services/placeService';
import { connectDB, closeDB } from '@/utils/db';

describe('PlaceService', () => {
    let placeService: PlaceService;
    let samplePlaceId: string;

    beforeAll(async () => {
        await connectDB();
        placeService = getPlaceService();
    });

    beforeEach(async () => {
        // Create sample data before each test
        samplePlaceId = await placeService.createPlace({
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
        });
    });

    afterEach(async () => {
        // Delete sample data after each test
        if (samplePlaceId) {
            await placeService.deletePlace(samplePlaceId);
        }
      });

    afterAll(async () => {
        // Add cleanup code if needed
        await closeDB();
    });
    

    it('should create a place', async () => {
        expect(samplePlaceId).toBeDefined();
    });

    it('should get a place by ID', async () => {
        const place = await placeService.getPlaceById(samplePlaceId);
        expect(place).toBeDefined();
        expect(place?.name).toBe('Test Place');
    });

    it('should get all places', async () => {
        const places: Place[] = await placeService.getPlaces();
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
        expect(updatedPlace?.name).toBe('Updated Sample Place');
        expect(updatedPlace?.category).toBe('Updated Sample Category');
    });

    it('should delete a place', async () => {
        const deleted = await placeService.deletePlace(samplePlaceId);
        expect(deleted).toBe(true);

        const nonExistentPlace = await placeService.getPlaceById(samplePlaceId);
        expect(nonExistentPlace).toBeNull();
    });
});
