export interface Review {
    _id: string;
    userId: string;
    placeId: string;
    rating: number;
    comment: string;
    createdAt: Date;
    updatedAt: Date;
}

// // To notify that the _id is ObjectId, the JSON should look like this:
// {"_id":{"$oid":"65807ba4c89745720de7445b"}}

export interface Place {
    _id: string;
    name: string;
    category: string;
    address: {
        street: string;
        city: string;
        district: string;
        // postalCode: string;
    };
    location: {
        type: string;
        coordinates: [number, number];
    };
    openingHours: {
        start: string;
        end: string;
    };
    createdAt: Date;
    updatedAt: Date;
}


export interface User {
    _id: string;
    username: string;
    email: string;
    password: string; // hashed password
    createdAt: Date;
    updatedAt: Date;
}

export type UserWithoutId = Omit<User, '_id'>
export type PlaceWithoutId = Omit<Place, '_id'>
export type ReviewWithoutId = Omit<Review, '_id'>


// Angular Form Control Status
export type FormControlStatus = "valid" 
    | "invalid" 
    | "pending" 
    | "pristine" 
    | "dirty" 
    | "touched" 
    | "untouched";