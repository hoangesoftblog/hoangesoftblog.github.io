// File: src/services/placeService.ts

import { Collection, ObjectId } from 'mongodb';
import { Place, PlaceWithoutId } from '@/models';
import { getDB } from '@/utils/db';

export class PlaceService {
  private collection: Collection<Place>;

  constructor() {
    const db = getDB();
    this.collection = db.collection<Place>('places');
  }

  async createPlace(place: Partial<Omit<Place, '_id'>>): Promise<string> {
    const result = await this.collection.insertOne({
      ...place,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Place);
    return result.insertedId.toString();
  }

  async getPlaceById(placeId: string): Promise<Place | null> {
    return this.collection.findOne({ _id: new ObjectId(placeId) } as any);
  }

  async getPlaces(limit: number = 20): Promise<{data: Place[], hasNext: boolean}> {
    // Todo: Update advanced search options + filter + page + limit.
    // Not easy to just get all.
    
    const resultCursor = this.collection.find({}).batchSize(limit);
    // // Recommended code from MongoDB Driver page
    // const arr = [] as Place[];
    // for await (const doc of resultCursor) {
    //   arr.push(doc);
    // }
      
    // // Finding ways to get results without using for-await-of
    // const cursor = resultCursor[Symbol.asyncIterator]();
    // It is better to use Promise.all, but MongoDB Driver suggest that 
    // not to run async calls simultaneously.
    const results = await resultCursor.toArray();
    return {data: results, hasNext: await resultCursor.hasNext()};
  }

  async updatePlace(placeId: string, updates: Partial<Place>): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(placeId) as any },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
    return result.matchedCount > 0;
  }

  async deletePlace(placeId: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(placeId) } as any);
    return result.deletedCount > 0;
  }
}


let singletonService: PlaceService | undefined;
export function getPlaceService() {
  if (!singletonService) {
    singletonService = new PlaceService();
  }
  return singletonService;
}
