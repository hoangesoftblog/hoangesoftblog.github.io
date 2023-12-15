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
    return this.collection.findOne({ _id: new ObjectId(placeId) });
  }

  async updatePlace(placeId: string, updates: Partial<Place>): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(placeId) },
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
    const result = await this.collection.deleteOne({ _id: new ObjectId(placeId) });
    return result.deletedCount > 0;
  }
}
