# WonderLust 🏡

A full-stack Airbnb-inspired travel listing web application built using **Node.js, Express.js, MongoDB, and EJS**. WonderLust allows users to explore travel destinations, create and manage listings, upload property images, write reviews, and view locations on an interactive map. The project follows the **MVC architecture** and implements complete **CRUD operations**, authentication, authorization, image uploads, and server-side validation.

## Features

* User Registration and Login Authentication
* Secure Session Management using Passport.js
* Create, Read, Update, and Delete Listings
* Upload Listing Images using Cloudinary
* Interactive Maps with Leaflet and Maptiler
* Add and Delete Reviews with Ratings
* Authorization for Listings and Reviews
* Server-side Validation using Joi
* Flash Messages for User Feedback
* RESTful Routing
* Responsive User Interface
* MVC Project Structure
* Centralized Error Handling

## Technologies Used

### Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication & Security

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session
* Connect Flash
* Joi

### Cloud & Maps

* Cloudinary
* Multer
* Multer Storage Cloudinary
* Leaflet.js
* Maptiler Geocoding API

## Project Structure

```text
WonderLust/

├── controllers/
├── init/
├── models/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
│
├── routes/
├── utils/
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
├── .gitignore
├── .env.example
└── README.md
```

## REST API Routes

| Method | Route               | Description                   |
| ------ | ------------------- | ----------------------------- |
| GET    | /listings           | Display all listings          |
| GET    | /listings/new       | Show form to create a listing |
| POST   | /listings           | Create a new listing          |
| GET    | /listings/          | Display a specific listing    |
| GET    | /listings//edit     | Show edit form                |
| PUT    | /listings/          | Update a listing              |
| DELETE | /listings/          | Delete a listing              |
| POST   | /listings//reviews  | Add a review                  |
| DELETE | /listings//reviews/ | Delete a review               |
| GET    | /signup             | User registration page        |
| POST   | /signup             | Register a new user           |
| GET    | /login              | User login page               |
| POST   | /login              | Authenticate user             |
| GET    | /logout             | Logout user                   |

## Packages Used

### Express

Used to create the web server and define application routes.

### MongoDB & Mongoose

Used for database management and object modeling.

### EJS & EJS-Mate

Used for server-side rendering and layout management.

### Passport.js

Used for user authentication and session handling.

### Joi

Used for server-side request validation.

### Multer

Used for handling image uploads.

### Cloudinary

Used to store and manage uploaded images.

### Leaflet.js

Used to display interactive maps.

### Maptiler Geocoding API

Used to convert location names into map coordinates.

### Method Override

Used to support PUT and DELETE requests through HTML forms.

### Connect Flash

Used to display success and error messages.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/WonderLust.git
```

### 2. Navigate to the project folder

```bash
cd WonderLust
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file and add the required environment variables

```env
ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 5. Start the server

```bash
node app.js
```

or

```bash
nodemon app.js
```

### 6. Open your browser

```text
http://localhost:8080/listings
```

## Learning Outcomes

Through this project I learned:

* Building Full Stack Web Applications
* MVC Architecture
* RESTful API Design
* CRUD Operations
* Authentication and Authorization using Passport.js
* Session and Cookie Management
* MongoDB Data Modeling with Mongoose
* Server-side Validation using Joi
* File Upload using Multer
* Cloudinary Image Storage
* Map Integration using Leaflet and Mapbox
* Express Middleware
* Error Handling
* Responsive UI Development
* Git and GitHub Workflow

## Future Improvements

* Wishlist Feature
* Booking System
* Payment Gateway Integration
* Advanced Search and Filters
* User Profile Management
* Availability Calendar
* Email Notifications
* Admin Dashboard
* Dark Mode
* Real-time Chat

## Author

**Shravan Gupta**

B.Tech Computer Science & Engineering Student
Aspiring Full Stack Web Developer
