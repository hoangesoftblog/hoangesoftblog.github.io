// // File: src/controllers/reviewController.ts

// import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
// import { getDB } from '@/utils/db';
// import { Review } from '@/models';

// export const createReview = async (req: Request, res: Response) => {
//   const db = getDB();
//   const { userId, placeId, rating, comment } = req.body;

//   const result = await db.collection<Review>('reviews').insertOne({
//     userId,
//     placeId,
//     rating,
//     comment,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   } as Review);

//   res.status(201).json({ reviewId: result.insertedId });
// };

// export const getReviewById = async (req: Request, res: Response) => {
//   const db = getDB();
//   const reviewId = req.params.id;

//   const review = await db.collection<Review>('reviews').findOne({ _id: new ObjectId(reviewId) as any });

//   if (!review) {
//     return res.status(404).json({ message: 'Review not found' });
//   }

//   res.json(review);
// };

// export const updateReview = async (req: Request, res: Response) => {
//   const db = getDB();
//   const reviewId = req.params.id;
//   const { rating, comment } = req.body;

//   const result = await db.collection<Review>('reviews').updateOne(
//     { _id: new ObjectId(reviewId) as any },
//     {
//       $set: {
//         rating,
//         comment,
//         updatedAt: new Date(),
//       },
//     }
//   );

//   if (result.matchedCount === 0) {
//     return res.status(404).json({ message: 'Review not found' });
//   }

//   res.json({ message: 'Review updated successfully' });
// };

// export const deleteReview = async (req: Request, res: Response) => {
//   const db = getDB();
//   const reviewId = req.params.id;

//   const result = await db.collection<Review>('reviews').deleteOne({ _id: new ObjectId(reviewId) as any });

//   if (result.deletedCount === 0) {
//     return res.status(404).json({ message: 'Review not found' });
//   }

//   res.json({ message: 'Review deleted successfully' });
// };


// File: src/controllers/reviewController.ts

import { Request, Response } from 'express';
import { ReviewService, getReviewService } from '@/services/reviewService';
import { Review } from '@/models';

function retrieveReviewService(): ReviewService {
  return getReviewService();
}

export const createReview = async (req: Request, res: Response) => {
  try {
    const reviewService = getReviewService();
    const { userId, placeId, rating, comment } = req.body;
    const reviewId = await reviewService.createReview({ userId, placeId, rating, comment });
    res.status(201).json({ reviewId });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const reviewService = getReviewService();

    const reviewId = req.params.id;
    const review = await reviewService.getReviewById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json(review);
  } catch (error) {
    console.error('Error retrieving review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const reviewService = getReviewService();

    const reviewId = req.params.id;
    const { rating, comment } = req.body;
    const updated = await reviewService.updateReview(reviewId, { rating, comment });

    if (!updated) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review updated successfully' });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const reviewService = getReviewService();

    const reviewId = req.params.id;
    const deleted = await reviewService.deleteReview(reviewId);

    if (!deleted) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
