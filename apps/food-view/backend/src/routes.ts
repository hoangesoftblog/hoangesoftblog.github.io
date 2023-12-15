// File: src/routes/userRoutes.ts

import express, {Router} from 'express';
import * as userController from '@/controllers/userController';

const userRouter: Router = express.Router();

// Create a new user
userRouter.post('/users', userController.createUser);

// Get user by ID
userRouter.get('/users/:id', userController.getUserById);

// Update user by ID
userRouter.put('/users/:id', userController.updateUser);

// Delete user by ID
userRouter.delete('/users/:id', userController.deleteUser);


// File: src/routes/placeRoutes.ts
import * as placeController from '@/controllers/placeController';
const placeRouter: Router = express.Router();

// Create a new entertainment place
placeRouter.post('/entertainment-places', placeController.createPlace);
// Get entertainment place by ID
placeRouter.get('/entertainment-places/:id', placeController.getPlaceById);
// Update entertainment place by ID
placeRouter.put('/entertainment-places/:id', placeController.updatePlace);
// Delete entertainment place by ID
placeRouter.delete('/entertainment-places/:id', placeController.deletePlace);



// File: src/routes/reviewRoutes.ts
import * as reviewController from '@/controllers/reviewController';

const reviewRouter: Router = express.Router();

// Create a new review
reviewRouter.post('/reviews', reviewController.createReview);

// Get review by ID
reviewRouter.get('/reviews/:id', reviewController.getReviewById);

// Update review by ID
reviewRouter.put('/reviews/:id', reviewController.updateReview);

// Delete review by ID
reviewRouter.delete('/reviews/:id', reviewController.deleteReview);


export {placeRouter, userRouter, reviewRouter};
