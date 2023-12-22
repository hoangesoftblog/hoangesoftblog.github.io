// File: src/services/placeService.ts

import { Collection, ObjectId, Sort } from 'mongodb';
import { Place, PlaceWithoutId } from '@/models';
import { getDB } from '@/utils/db';
import { MongoDBSortOrder } from '@/utils/mongodb';

export class PlaceService {
  public collection: Collection<Place>;

  constructor(collectionName: string = "places", db = getDB()) {
    this.collection = db.collection<Place>(collectionName);
  }

  async createPlace(place: Partial<Omit<Place, '_id'>>): Promise<string> {
    const result = await this.collection.insertOne({
      ...place,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Place);

    return result.insertedId.toString();
  }

  async createPlaces(places: Partial<Omit<Place, '_id'>>[]): Promise<{[key: number]: string}> {
    let res = await this.collection.insertMany(places as Place[]);
    if (!res.acknowledged) {
      throw new Error("create multiple places failed.");
    }
    return res.insertedIds;
  }

  async getPlaceById(placeId: string): Promise<Place | null> {
    return this.collection.findOne({ _id: new ObjectId(placeId) } as any);
  }

  async getPlaces({page = 1, limit = 5, sort}: {page?: number, limit?: number, sort?: {[x: string]: MongoDBSortOrder}} = {}): Promise<{data: Place[], hasNext: boolean}> {
    // Todo: Update advanced search options + filter + page + limit.
    // Not easy to just get all though.
    // console.log(await this.collection.countDocuments({}));

    // Sample output:
    // {
    //   '0': new ObjectId('6585575d1b3c6ec0e45dac87'),
    //   '1': new ObjectId('6585575d1b3c6ec0e45dac88'),
    //   ...
    // }

    const skip = (page - 1) * limit;
    const consistentSort = {"_id": 1, ...(sort ?? {})} as Sort;
    let resultCursor = this.collection.find({}).sort(consistentSort).skip(skip).limit(limit);
    
    // Recommended code from MongoDB Driver page
    const results = [] as Place[];
    for await (const doc of resultCursor) {
      results.push(doc);
    }

      
    // // Finding ways to get results without using for-await-of
    // const cursor = resultCursor[Symbol.asyncIterator]();
    // It is better to use Promise.all, but MongoDB Driver suggest that 
    // not to run async calls simultaneously.
    // const results = await resultCursor.toArray();
    // console.log(await resultCursor.next());
    return {data: results, hasNext: await resultCursor.hasNext()};
  }

  // async getPlaces(options: GetPlacesOptions = {}): Promise<Place[]> {
  //   const cursor: Cursor<Place> = this.collection.find(options.filter || {});

  //   // Apply sorting if provided
  //   if (options.sort) {
  //     cursor.sort(options.sort);
  //   }

  //   // Apply pagination if provided
  //   if (options.pagination) {
  //     cursor.skip(options.pagination.skip).limit(options.pagination.limit);
  //   }

  //   // Convert cursor to array
  //   const places = await cursor.toArray();

  //   return places;
  // }

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
export function getPlaceService(collectionName: string = "places") {
  // if (!singletonService) {
  //   singletonService = new PlaceService(collectionName);
  // }
  return new PlaceService(collectionName);
}
