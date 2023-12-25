// File: src/services/placeService.ts

import { Collection, FindOptions, ObjectId, Sort, Db } from 'mongodb';
import { Place, PlaceWithoutId } from '@/models';
import { getDB } from '@/utils/db';
import { MongoDBSortOrder } from '@/utils/mongodb';

export class PlaceService {
  // public collection: Collection<Place>;

  // constructor(db: Db, collectionName: string = "places") {
  //   this.collection = db.collection<Place>(collectionName);
  // }

  constructor(private collection: Collection<Place>){}

  async createPlace(place: Partial<Omit<Place, '_id'>>): Promise<string> {
    const result = await this.collection.insertOne({
      ...place,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Place);

    return result.insertedId.toString();
  }

  async createPlaces(places: Partial<Omit<Place, '_id'>>[]): Promise<{ [key: number]: string | ObjectId }> {
    let res = await this.collection.insertMany(places as Place[]);
    if (!res.acknowledged) {
      throw new Error("create multiple places failed.");
    }
    return res.insertedIds;
  }

  async getPlaceById(placeId: string | ObjectId): Promise<Place | null> {
    return this.collection.findOne({ _id: new ObjectId(placeId) } as any);
  }

  async getPlaces({ page = 1, limit = 5, sort }: {page?: number, limit?: number, sort?: { [x: string]: MongoDBSortOrder }} = {}): Promise<{ data: Place[], hasNext: boolean }> {
    // Todo: Update advanced search options + filter + page + limit.
    // Not easy to just get all though.
    // Sample output:
    // {
    //   '0': new ObjectId('6585575d1b3c6ec0e45dac87'),
    //   '1': new ObjectId('6585575d1b3c6ec0e45dac88'),
    //   ...
    // }
    console.log("Calling getPlaces() with arguments: ", { page, limit, sort });

    const skip = (page - 1) * limit;
    const consistentSort = { ...(sort ?? {}) } as Sort;

    // // These 2 are the same
    const resultCursor = this.collection.find({}).sort(consistentSort).skip(skip).limit(limit);
    // const options: FindOptions<Document> = {
    //   sort: consistentSort,
    //   skip,
    //   limit,
    // };
    // const resultCursor = this.collection.find({}, options);

    const nextCursor = resultCursor.clone();

    // // Recommended code from MongoDB Driver page
    // const results = [] as Place[];
    // for await (const doc of resultCursor) {
    //   results.push(doc);
    // }

    // // Finding ways to get results without using for-await-of
    // const cursor = resultCursor[Symbol.asyncIterator]();
    // It is better to use Promise.all, but MongoDB Driver suggest that 
    // not to run async calls simultaneously.
    const [results, hasNext] = await Promise.all([resultCursor.toArray(), nextCursor.hasNext()]);

    // Not works as expected, as hasNext() only returns false when return data is empty.
    // If there is still data, hasNext() still returns true
    return { data: results, hasNext: (hasNext && results.length === limit) };
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

  async updatePlace(placeId: string | ObjectId, updates: Partial<Place>): Promise<boolean> {
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

  async deletePlace(placeId: string | ObjectId): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(placeId) } as any);
    return result.deletedCount > 0;
  }
}


let singletonService: PlaceService | undefined;
export function getPlaceService(db: Db = getDB(), collectionName: string = "places") {
  // if (!singletonService) {
  //   singletonService = new PlaceService(collectionName);
  // }
  return new PlaceService(db.collection<Place>(collectionName));;
}
