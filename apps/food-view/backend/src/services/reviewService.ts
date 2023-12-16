// File: src/services/reviewService.ts

import { Collection, ObjectId } from 'mongodb';
import { Review } from '@/models';
import { getDB } from '@/utils/db';

export class ReviewService {
  private collection: Collection<Review>;

  constructor() {
    const db = getDB();
    this.collection = db.collection<Review>('reviews');
  }

  async createReview(review: Partial<Omit<Review, '_id'>>): Promise<string> {
    const result = await this.collection.insertOne({
      ...review,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Review);
    return result.insertedId.toString();
  }

  async getReviewById(reviewId: string): Promise<Review | null> {
    return this.collection.findOne({ _id: new ObjectId(reviewId) as any });
  }

  async updateReview(reviewId: string, updates: Partial<Review>): Promise<boolean> {
    const result = await this.collection.updateOne(
      { _id: new ObjectId(reviewId) as any },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );
    return result.matchedCount > 0;
  }

  async deleteReview(reviewId: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: new ObjectId(reviewId) as any });
    return result.deletedCount > 0;
  }
}

let singletonService: ReviewService | undefined;
export function getReviewService() {
    if (!singletonService) {
        singletonService = new ReviewService();
    }
    return singletonService;
}