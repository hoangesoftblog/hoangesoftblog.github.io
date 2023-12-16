// // File: src/controllers/userController.ts

// import { Request, Response } from 'express';
// import { ObjectId } from 'mongodb';
// import { getDB } from '../utils/db';

// async function retrieveDB() {
//     return getDB();
// }

// export const createUser = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const { username, email, password } = req.body;

//     const result = await db.collection('users').insertOne({
//         username,
//         email,
//         password,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     });

//     res.status(201).json({ userId: result.insertedId });
// };

// export const getUserById = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const userId = req.params.id;

//     const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

//     if (!user) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(user);
// };

// export const updateUser = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const userId = req.params.id;
//     const { username, email, password } = req.body;

//     const result = await db.collection('users').updateOne(
//         { _id: new ObjectId(userId) },
//         {
//             $set: {
//                 username,
//                 email,
//                 password,
//                 updatedAt: new Date(),
//             },
//         }
//     );

//     if (result.matchedCount === 0) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User updated successfully' });
// };

// export const deleteUser = async (req: Request, res: Response) => {
//     const db = await retrieveDB();
//     const userId = req.params.id;

//     const result = await db.collection('users').deleteOne({ _id: new ObjectId(userId) });

//     if (result.deletedCount === 0) {
//         return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully' });
// };


// File: src/controllers/userController.ts

import { Request, Response } from 'express';
import { getUserService, UserService } from '@/services/userService';
import { User, UserWithoutId } from '@/models';


function retrieveUserService(): UserService {
  return getUserService();
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const userService = getUserService();
    const user: Partial<UserWithoutId> = req.body;
    const userId = await userService.createUser(user);
    res.status(201).json({ userId });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userService = getUserService();

    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userService = getUserService();

    const userId = req.params.id;
    const { username, email, password } = req.body;
    const updated = await userService.updateUser(userId, { username, email, password });

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userService = getUserService();

    const userId = req.params.id;
    const deleted = await userService.deleteUser(userId);

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
