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

