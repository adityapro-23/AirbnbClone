# Vistayr

A full-featured property rental web application built with Node.js, Express, and MongoDB. Vistayr is a modern accommodation booking platform that allows users to list properties, search for rentals, and manage bookings seamlessly.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Routes](#api-routes)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Management
- **User Registration & Login**: Secure authentication using Passport.js with local strategy
- **Role-Based Access**: Users can be either hosts (property owners) or guests (renters)
- **User Dashboard**: View profile, manage listings, and track bookings
- **Password Security**: Passwords are hashed and salted automatically

### Property Listings
- **Create Listings**: Hosts can create new property listings with detailed information
- **Edit & Delete**: Hosts can update or remove their listings
- **Image Upload**: Upload property images directly to Cloudinary for secure cloud storage
- **Categories**: Organize listings by property type (apartments, houses, villas, etc.)
- **Geolocation**: View property locations on interactive Mapbox maps
- **Instant Booking**: Option to enable instant booking for properties

### Booking System
- **Book Properties**: Guests can book properties for specific date ranges
- **Booking Status**: Track booking status (waiting, confirmed, canceled, completed)
- **Price Calculation**: Automatic total price calculation based on number of nights
- **View Bookings**: Users can see all their bookings in one place

### Reviews & Ratings
- **Leave Reviews**: Guests can rate and review properties they've booked
- **Rating System**: 5-star rating system for feedback
- **Review Display**: See reviews on property detail pages

### Search & Discovery
- **Search Listings**: Find properties by keywords
- **Category Filter**: Browse properties by category (apartments, houses, villas, etc.)
- **Advanced Filters**: Filter by location, price range, and more
- **Search Results**: View filtered results with property previews

### Wishlist
- **Save Favorites**: Guests can add properties to their wishlist
- **Manage Wishlist**: View and manage saved properties from the dashboard

### Additional Features
- **Flash Messages**: Real-time feedback on actions (success, error notifications)
- **Session Management**: Secure session handling with MongoDB session store
- **Error Handling**: Custom error pages and comprehensive error management
- **Data Validation**: Input validation using Joi schema validation
- **Responsive Design**: Mobile-friendly interface

## 🛠️ Tech Stack

### Backend
- **Node.js** (v22.11.0) - JavaScript runtime
- **Express.js** (v4.21.2) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v8.9.3) - MongoDB object modeling

### Authentication & Security
- **Passport.js** (v0.7.0) - Authentication middleware
- **Passport-Local** (v1.0.0) - Local authentication strategy
- **Passport-Local-Mongoose** (v8.0.0) - Mongoose integration for Passport
- **Express-Session** (v1.18.1) - Session management
- **Connect-Mongo** (v5.1.0) - MongoDB session store

### Frontend
- **EJS** (v3.1.10) - Templating engine
- **EJS-Mate** (v4.0.0) - Layout support for EJS
- **CSS** - Custom styling with Bootstrap
- **JavaScript** - Client-side interactivity

### File Upload & Storage
- **Multer** (v1.4.5-lts.1) - File upload middleware
- **Cloudinary** (v1.41.3) - Cloud storage service
- **Multer-Storage-Cloudinary** (v4.0.0) - Cloudinary integration for Multer

### Additional Libraries
- **Joi** (v17.13.3) - Data validation
- **Connect-Flash** (v0.1.1) - Flash message middleware
- **Method-Override** (v3.0.0) - HTTP method override
- **Mapbox SDK** (v0.16.1) - Interactive maps
- **dotenv** (v16.4.7) - Environment variable management

## 📦 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v22.11.0 or later)
- **npm** (Node Package Manager)
- **MongoDB Atlas** account (for cloud database) or local MongoDB installation
- **Cloudinary** account (for image hosting)
- **Mapbox** account (for maps functionality)

## 🚀 Installation

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/vistayr.git
cd vistayr
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Create Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=production
ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/vistayr
SECRET=your_secret_key_here

# Cloudinary Configuration
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Mapbox Configuration
MAPBOX_TOKEN=your_mapbox_token
```

**How to get these credentials:**
- **MongoDB Atlas**: Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- **Cloudinary**: Sign up at [cloudinary.com](https://cloudinary.com)
- **Mapbox**: Register at [mapbox.com](https://www.mapbox.com)

## 🔧 Configuration

### Environment Setup
The application automatically reads from `.env` file using `dotenv`. In production, make sure `NODE_ENV=production` is set.

### Database Connection
MongoDB connection is established in `app.js` using the `ATLASDB_URL` from environment variables.

### Session Configuration
- Sessions are stored in MongoDB
- Cookie expiration: 7 days
- Session timeout: 24 hours

## ▶️ Running the Application

### Start the Server
```bash
node app.js
```

The server will start on `http://localhost:8080`

### Available Routes

#### User Routes
- `GET /` - Home page
- `GET /login` - Login page
- `POST /login` - Submit login form
- `GET /signup` - Sign up page
- `POST /signup` - Create new account
- `GET /logout` - Logout user
- `GET /dashboard` - User dashboard
- `GET /bookings` - View user bookings
- `GET /wishlist` - View wishlist

#### Listing Routes
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing (for hosts)
- `POST /listings` - Submit new listing
- `GET /listings/:id` - View listing details
- `GET /listings/:id/edit` - Edit listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing
- `GET /listings/category/:category` - View listings by category
- `GET /listings/search` - Search listings

#### Booking Routes
- `GET /bookings` - View all user bookings
- `POST /bookings` - Create new booking
- `GET /bookings/:id` - View booking details
- `PUT /bookings/:id` - Update booking status

#### Review Routes
- `POST /listings/:id/reviews` - Add review to listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete review

## 📖 Usage Guide

### For Guests (Renters)

1. **Sign Up**: Create an account with your email
2. **Browse Properties**: Explore listings by category or search
3. **View Details**: Click on a property to see full details and map
4. **Book Property**: Select dates and click "Book Now"
5. **Leave Review**: After your stay, leave a rating and review
6. **Manage Bookings**: View all your bookings in the dashboard
7. **Save Favorites**: Add properties to your wishlist

### For Hosts (Property Owners)

1. **Sign Up**: Create an account
2. **Verify Role**: Set your account as a "Host"
3. **Create Listing**: Click "List Your Property" and fill in details
4. **Upload Images**: Add photos from Cloudinary
5. **Set Pricing**: Enter nightly rate and booking options
6. **Manage Listings**: Edit or delete your listings
7. **Track Bookings**: See who has booked your properties
8. **Read Reviews**: Get feedback from guests

## 📁 Project Structure

```
vistayr/
├── controllers/          # Business logic for routes
│   ├── listings.js
│   ├── bookings.js
│   ├── reviews.js
│   └── users.js
├── models/              # Mongoose schemas
│   ├── listing.js
│   ├── booking.js
│   ├── review.js
│   └── user.js
├── routes/              # Route definitions
│   ├── listing.js
│   ├── booking.js
│   ├── review.js
│   └── user.js
├── views/               # EJS templates
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── includes/
├── public/              # Static files
│   ├── css/
│   ├── js/
│   └── images/
├── utils/               # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
├── init/                # Database initialization
│   └── data_newFormat.js
├── app.js               # Application entry point
├── middleware.js        # Custom middleware
├── schema.js            # Joi validation schemas
├── cloudConfig.js       # Cloudinary configuration
├── package.json         # Dependencies
└── .env                 # Environment variables
```

## 🔐 Security Features

- Password hashing with salt
- CSRF protection through session tokens
- Input validation with Joi
- SQL injection prevention with Mongoose
- Secure session management
- HTTP-only cookies
- Authentication middleware for protected routes
- Authorization checks for resource ownership

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 📞 Support

If you encounter any issues or have questions, please:
- Open an issue on GitHub
- Contact the project maintainer
- Check the existing issues for solutions

## 🙏 Acknowledgments

- Vistayr - A modern accommodation booking platform
- Built with Express.js documentation
- Cloudinary for image hosting
- Mapbox for mapping services
- MongoDB for database solutions

---

**Happy Coding!** 🚀

If you find this project helpful, please give it a star ⭐
