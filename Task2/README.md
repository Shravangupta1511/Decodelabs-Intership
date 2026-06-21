# Instagram Feed Clone 📸

A simple Instagram Feed Clone built using Node.js, Express.js, EJS, and REST APIs. This project demonstrates CRUD (Create, Read, Update, Delete) operations using Express routes and EJS templates.

## Features

* View all Instagram posts
* Create a new Instagram post
* View a single post in detail
* Edit an existing post caption
* Delete a post
* Dynamic routing using unique IDs
* RESTful API implementation
* Server-side rendering using EJS

## Technologies Used

* Node.js
* Express.js
* EJS
* REST APIs
* UUID
* Method Override
* HTML5
* CSS3

## Project Structure

Instagram-Feed-Clone/

├── node_modules/

├── public/

│ ├── css/

│ ├── images/

│ └── js/

│

├── views/

│ ├── index.ejs

│ ├── new.ejs

│ ├── edit.ejs

│ └── show.ejs

│

├── app.js

├── package.json

├── package-lock.json

└── README.md

## REST API Routes

| Method | Route          | Description              |
| ------ | -------------- | ------------------------ |
| GET    | /post          | Display all posts        |
| GET    | /post/new      | Show form to create post |
| POST   | /post          | Create a new post        |
| GET    | /post/:id      | Show a specific post     |
| GET    | /post/:id/edit | Show edit form           |
| PATCH  | /post/:id      | Update post caption      |
| DELETE | /post/:id      | Delete a post            |

## Packages Used

### Express

Used to create the web server and routes.

### EJS

Used for server-side rendering.

### UUID

Used to generate unique IDs for posts.

### Method Override

Used to support PATCH and DELETE requests through HTML forms.

## Installation

1. Clone the repository

git clone https://github.com/your-username/instagram-feed-clone.git

2. Navigate to the project folder

cd instagram-feed-clone

3. Install dependencies

npm install

4. Start the server

node app.js

5. Open browser

http://localhost:5000/post

## Learning Outcomes

Through this project I learned:

* Express.js Routing
* REST API Design
* CRUD Operations
* EJS Templating
* Middleware Usage
* Dynamic Routes
* UUID Implementation
* Method Override
* Server-Side Rendering

## Future Improvements

* MongoDB Database Integration
* User Authentication
* Like and Comment System
* File Upload Support
* Real Instagram UI Design
* Responsive Design

## Author

Shravan Gupta

B.Tech CSE Student | Aspiring Full Stack Web Developer

