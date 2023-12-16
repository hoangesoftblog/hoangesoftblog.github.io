// File: src/services/userService.ts

import { Collection, ObjectId, MongoClient } from 'mongodb';
import { User } from '@/models';
import { getDB } from '@/utils/db';

export class UserService {
    private collection: Collection<User>;

    constructor() {
        const db = getDB();
        this.collection = db.collection<User>('users');
    }

    async createUser(user: Partial<Omit<User, '_id'>>): Promise<string> {
        const result = await this.collection.insertOne({
            ...user,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as User);
        return result.insertedId.toString();
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.collection.findOne({ _id: new ObjectId(userId) } as any);
    }

    async updateUser(userId: string, updates: Partial<User>): Promise<boolean> {
        const result = await this.collection.updateOne(
            { _id: new ObjectId(userId) as any },
            {
                $set: {
                    ...updates,
                    updatedAt: new Date(),
                },
            }
        );
        return result.matchedCount > 0;
    }

    async deleteUser(userId: string): Promise<boolean> {
        const result = await this.collection.deleteOne({ _id: new ObjectId(userId) } as any);
        return result.deletedCount > 0;
    }
}

let singletonService: UserService | undefined;
export function getUserService() {
    if (!singletonService) {
        singletonService = new UserService();
    }
    return singletonService;
}
