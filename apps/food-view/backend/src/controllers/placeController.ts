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
import { PlaceService, getPlaceService } from '@/services/placeService';
import { Place, PlaceWithoutId } from '@/models';
import { MongoDBSortOrder } from '@/utils/mongodb';

function retrievePlaceService(): PlaceService {
    return getPlaceService();
}

export const createPlace = async (req: Request, res: Response) => {
    try {
        const placeService = retrievePlaceService();
        const place: PlaceWithoutId = req.body;
        const placeId = await placeService.createPlace(place);
        res.status(201).json({ placeId });
    } catch (error) {
        console.error('Error creating place:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getPlaceById = async (req: Request, res: Response) => {
    try {
        const placeService = retrievePlaceService();

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

function parseSortOrder(order: string | string[] | undefined): { [x: string]: MongoDBSortOrder } {
    const arr = [];
    if (order == undefined) {
        console.log("order is undefined");
    }
    else if (Array.isArray(order)) {
        console.log("order is array");

        arr.push(...order);
    }
    else {
        console.log("order is string");
        arr.push(order);
    }

    const temp = arr.map((e: string) => {
        if (e[0] === '-') {
            return [e.slice(1), -1]
        } else {
            return [e, 1]
        }
    })

    return Object.fromEntries(temp);
}

export const getPlaces = async (req: Request, res: Response) => {
    try {
        // console.log('getPlaces', req);
        const query = req.query;
        console.log('getPlaces parse value', query);

        const placeService = retrievePlaceService();
        const { q, sort: sortQuery, page: pageStr = "", limit: limitStr = "" }: { q?: string, sort?: string | string[], page?: string, limit?: string } = query;
        const page = parseInt(pageStr) || 1;
        const limit = parseInt(limitStr) || 5;
        const sort = parseSortOrder(sortQuery);


        let places;
        if (q) {
            places = await placeService.searchPlaces({q, page, limit, sort})
        }
        else {
            places = await placeService.getPlaces({ page, limit, sort });
        }

        // if (!place) {
        //   return res.status(404).json({ message: 'Place not found' });
        // }

        res.json(places);
    } catch (error) {
        console.error('Error retrieving place:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updatePlace = async (req: Request, res: Response) => {
    try {
        const placeService = retrievePlaceService();

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
        const placeService = retrievePlaceService();

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

// // ChatGPT suggestion
// export const getPlaces = async (req: Request, res: Response) => {
//     try {
//       const placeService = getPlaceService();
  
//       // Extract query parameters for sorting, filtering, and pagination
//       const { sortBy, sortOrder, category, page, limit } = req.query;
  
//       // Define options object based on query parameters
//       const options: any = {};
  
//       // Sorting
//       if (sortBy && sortOrder) {
//         options.sort = { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 };
//       }
  
//       // Filtering
//       if (category) {
//         options.filter = { category: category as string };
//       }
  
//       // Pagination
//       if (page && limit) {
//         const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
//         const pageSize = parseInt(limit as string);
//         options.pagination = { skip, limit: pageSize };
//       }
  
//       // Get places with applied options
//       const places = await placeService.getPlaces(options);
  
//       res.json(places);
//     } catch (error) {
//       console.error('Error retrieving places:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   };