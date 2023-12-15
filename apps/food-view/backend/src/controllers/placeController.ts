// // File: src/controllers/placeController.ts

// import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
// import { getDB } from '@/utils/db';


// async function retrieveDB() {
//     return getDB();
// }

// export const createPlace = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     // Extract fields from the request body
//     const { name, category, address, location, openingHours } = req.body;

//     const result = await db.collection('places').insertOne({
//         name,
//         category,
//         address,
//         location,
//         openingHours,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     });

//     res.status(201).json({ placeId: result.insertedId });
// };

// export const getPlaceById = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const placeId = req.params.id;

//     const place = await db.collection('places').findOne({
//         _id: new ObjectId(placeId),
//     });

//     if (!place) {
//         return res.status(404).json({ message: 'Entertainment place not found' });
//     }

//     res.json(place);
// };

// export const updatePlace = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const placeId = req.params.id;
//     const { name, category, address, location, openingHours } = req.body;

//     const result = await db.collection('places').updateOne(
//         { _id: new ObjectId(placeId) },
//         {
//             $set: {
//                 name,
//                 category,
//                 address,
//                 location,
//                 openingHours,
//                 updatedAt: new Date(),
//             },
//         }
//     );

//     if (result.matchedCount === 0) {
//         return res.status(404).json({ message: 'Entertainment place not found' });
//     }

//     res.json({ message: 'Entertainment place updated successfully' });
// };

// export const deletePlace = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const placeId = req.params.id;

//     const result = await db.collection('places').deleteOne({
//         _id: new ObjectId(placeId),
//     });

//     if (result.deletedCount === 0) {
//         return res.status(404).json({ message: 'Entertainment place not found' });
//     }

//     res.json({ message: 'Entertainment place deleted successfully' });
// };


// File: src/controllers/placeController.ts

import { Request, Response } from 'express';
import { PlaceService } from '@/services/placeService';
import { Place } from '@/models';

const placeService = new PlaceService();

export const createPlace = async (req: Request, res: Response) => {
  try {
    const { name, category, address, location, openingHours } = req.body;
    const placeId = await placeService.createPlace({ name, category, address, location, openingHours } );
    res.status(201).json({ placeId });
  } catch (error) {
    console.error('Error creating place:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPlaceById = async (req: Request, res: Response) => {
  try {
    const placeId = req.params.id;
    const place = await placeService.getPlaceById(placeId);

    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json(place);
  } catch (error) {
    console.error('Error retrieving place:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updatePlace = async (req: Request, res: Response) => {
  try {
    const placeId = req.params.id;
    const { name, category, address, location, openingHours } = req.body;
    const updated = await placeService.updatePlace(placeId, { name, category, address, location, openingHours });

    if (!updated) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json({ message: 'Place updated successfully' });
  } catch (error) {
    console.error('Error updating place:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deletePlace = async (req: Request, res: Response) => {
  try {
    const placeId = req.params.id;
    const deleted = await placeService.deletePlace(placeId);

    if (!deleted) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.json({ message: 'Place deleted successfully' });
  } catch (error) {
    console.error('Error deleting place:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

