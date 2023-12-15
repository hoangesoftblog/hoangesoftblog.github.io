# Features:
1. **User Authentication and Profiles:**
- User registration and login.

2. **Location-Based Services:**
- Display a map showing nearby entertainment places.
- Allow users to set their location or use geolocation for real-time updates on the map.

3. **Search & Filter:**
- Search by keyword and/or categories (e.g., restaurants, theaters) and/or location (district, city)
- Search by distance
- Filters based on location (district, city), rating, opening hours ("about to open" (1h to open), "openning", "closing" (1h to closed), "closed")

4. **Detail Information:**
- Allow to redirect to Google Maps API for navigation and write review

5. **Admin Features:**
- Admin panel for adding, editing, or removing entertainment places

6. **Feedback & Support:**
- Feedback form through email - to report issues & suggest improvements

7. **Design and User Interface:**
- Responsive design
- Accessibility support
- Clean and intuitive interface
- Easy navigation with a search bar and filters
- Interactive map for visualizing locations



# Tech Stack
- [Typescript-ESLint](https://typescript-eslint.io/)



# Schema (example)
// Users Collection
{
  _id: ObjectId("unique_id"),
  username: "user123",
  email: "user123@example.com",
  password: "hashed_password",
  createdAt: ISODate("timestamp"),
  updatedAt: ISODate("timestamp")
}

// EntertainmentPlaces Collection
{
  _id: ObjectId("unique_id"),
  name: "ABC Restaurant",
  category: "Restaurant",
  address: {
    street: "123 Main St",
    city: "City Name",
    district: "District Name",
    postalCode: "12345"
  },
  location: {
    type: "Point",
    coordinates: [longitude, latitude]
  },
  openingHours: {
    start: "08:00 AM",
    end: "10:00 PM"
  },
  createdAt: ISODate("timestamp"),
  updatedAt: ISODate("timestamp")
}

// Reviews Collection
{
  _id: ObjectId("unique_id"),
  userId: ObjectId("user_id"),
  entertainmentPlaceId: ObjectId("entertainment_place_id"),
  rating: 4,
  comment: "Great experience!",
  createdAt: ISODate("timestamp"),
  updatedAt: ISODate("timestamp")
}


# Step
Here is the list of steps we decided to work on for this project. Ask me what I want to do next in the next input.

**Define Requirements:**
- You outlined the features and functionality you want in your web application, covering user authentication, location-based services, search and filtering, detailed information, admin features, feedback and support, and design considerations.

**Choose Tech Stack:**
- You selected the technologies for your project, including Vue.js for the frontend, Node.js with Express for the backend, MongoDB Atlas for the database, Google Maps API for mapping, Auth0 for user authentication, and Vuetify for design and styling.

**Set Up Development Environment:**
- This step involves installing the necessary tools, such as a code editor, version control (e.g., Git), and the runtime environments for Node.js and Vue.js. You'll also set up your project structure and configure any necessary dependencies.

**Design the Database:**
- In this step, you'll plan the structure of your MongoDB database. Identify entities, relationships, and how data will be stored.

**Build the Backend:**
- Develop the backend using Node.js and Express. Implement routes, controllers, and connect to the MongoDB database. Start with basic functionality like user registration and login.

**Create a Basic Frontend:**
- Start building the frontend of your application using Vue.js and Vuetify. Set up a simple user interface to display basic information.

**Integrate Google Maps API:**
- Implement Google Maps API to display a map showing nearby entertainment places. Allow users to set their location or use geolocation for real-time updates on the map.

**Implement User Authentication with Auth0:**
- Set up user authentication using Auth0. This involves configuring Auth0, integrating it with your frontend and backend, and implementing user registration and login.

**Implement Search and Filter Functionality:**
- Develop the search and filter features based on your defined requirements. Allow users to search for entertainment places by keyword, category, location, and apply filters.

**Implement Detailed Information and Admin Features:**
- Build functionality to redirect users to Google Maps for navigation, allow them to write reviews, and implement admin features for managing entertainment places.

**Design and Style the Frontend:**
- Enhance the design and styling of your frontend using Vuetify. Ensure a clean, responsive, and intuitive interface.

**Provide Contact Information for Feedback:**
- If you decide to implement the feedback form later, provide an email address for users to send direct feedback.