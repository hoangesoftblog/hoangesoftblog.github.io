# Features:
1. **User Authentication + Authorization and Profiles:**
  - User registration and login.
  - Has roles

2. **Admin side:**
  1. Managing places 
    - Adding, editing, deleting
    - Paging + Filter + Search + Sorting
    - View a place details
      + Should have a link to Google PlaceID
  2. Managing users 
    - Adding, editing, deleting
    - Paging + Filter + Search + Sorting
    - View user details
  3. Review management
    - Review grading (neutral, good, bad - kind of like that)

3. **Customer side:**
  1. **Search & Filter:**
    - Search by keyword and/or categories (e.g., restaurants, theaters) and/or location (district, city)
    - Search by distance
    - Filters based on location (district, city), rating, opening hours ("about to open" (1h to open), "openning", "closing" (1h to closed), "closed")

  2. **Location-Based Services:**
    - Display a map showing nearby entertainment places.
    - Real-time updates for the places (open or not) on the map.
      + Allow users to set their location or use geolocation - to see in the area  

  3. **Detail Information:**
    - Allow to redirect to Google Maps API for navigation and write review

  4. **Profile**
    - Self-view + edit profile
    - View their reviews for places


## Non-functional requirements (maybe there's more)
1. **Design and User Interface:**  
  - Responsive design
  - Accessibility support
  - Clean and intuitive interface
  - Easy navigation with a search bar and filters
  - Interactive map for visualizing locations

2. **Feedback & Support:**
  - Feedback form through email - to report issues & suggest improvements


# Tech Stack
- [Typescript-ESLint](https://typescript-eslint.io/)



# Schema (example)
// User
interface User {
  _id: ObjectId;                  // MongoDB ObjectId
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Place
interface Place {
  _id: ObjectId;                  // MongoDB ObjectId
  name: string;
  category: string;
  address: {
    street: string;
    city: string;
    district: string;
  };
  location: {
    type: "Point";
    coordinates: [number, number]; // longitude comes first
  };
  openingHours: {
    start: string;
    end: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Review
interface Review {
  _id: ObjectId;                  // MongoDB ObjectId
  userId: ObjectId;               // MongoDB ObjectId
  placeId: ObjectId;              // MongoDB ObjectId
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}



# Step
Here is the list of steps we decided to work on for this project. Ask me what I want to do next in the next input.

**Define Requirements:**
- You outlined the features and functionality you want in your web application, covering user authentication, location-based services, search and filtering, detailed information, admin features, feedback and support, and design considerations.

**Choose Tech Stack:**
- You selected the technologies for your project, including Vue.js for the frontend, Node.js with Express for the backend, MongoDB Atlas for the database, Google Maps API for mapping, self-implementing User Authentication & Authorization , and Vuetify for design and styling.

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

<!-- **Implement User Authentication with Auth0:**
- Set up user authentication using Auth0. This involves configuring Auth0, integrating it with your frontend and backend, and implementing user registration and login. -->

**Implement Search and Filter Functionality:**
- Develop the search and filter features based on your defined requirements. Allow users to search for entertainment places by keyword, category, location, and apply filters.

**Implement Detailed Information and Admin Features:**
- Build functionality to redirect users to Google Maps for navigation, allow them to write reviews, and implement admin features for managing entertainment places.

**Design and Style the Frontend:**
- Enhance the design and styling of your frontend using Vuetify. Ensure a clean, responsive, and intuitive interface.

**Provide Contact Information for Feedback:**
- If you decide to implement the feedback form later, provide an email address for users to send direct feedback.



<!-- **Places Management UI**:
1. List View
  - As table
  - Just show all fields at the moment, except _id
2. Add/Edit Place Form:
  - Consider all of them to be required at the moment, except _id
  - No specific validation at the moment

**User Management UI**:
1. List View
  - As table
  - Just show all fields at the moment, except _id
2. Add/Edit Place Form:
  - Consider all of them to be required at the moment, except _id
  - No specific validation at the moment

**Review Management UI**:
1. List View
  - As table
  - Just show all fields at the moment, except _id

**Dashboard UI:**
1. Dashboard Overview:
  - I will think about it later, just put a placeholder Dashboard -->

**Places Management UI**:
1. List View
  - Just show all columns at the moment, except _id
  - Edit, delete, view details. Each action will be associated with a button, and all buttons will be on the right-most column in the table.
2. Add/Edit Place Form:
  - Consider all of them to be required at the moment, except _id

**User Management UI**:
1. List View
  - Just show all columns at the moment, except _id
  - Edit, delete, view details. Each action will be associated with a button, and all buttons will be on the right-most column in the table.
2. Add/Edit Place Form:
  - Consider all of them to be required at the moment, except _id

**Review Management UI**:
1. List View
  - Just show all fields at the moment, except _id
  - Edit, delete, view details. Each action will be associated with a button, and all buttons will be on the right-most column in the table.

**General UI Structure:**
1. Sidebar:
- There should be icon for all 4 of them, anything is good, I will consider them carefully later.
2. Click Actions:
- Please clarify this or give me an example to illustrate this
