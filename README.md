The Recipe Book
The Recipe Book is a web application that allows users to explore and manage recipes. It provides different levels of access based on user roles, such as basic user and admin, with features like viewing, creating, and managing recipes. The project utilizes a React.js frontend, a Spring Boot backend, and a MySQL database.

Features
Unauthenticated Users:

Sign up and sign in to the platform.
Authenticated Users:

View all recipes.
View a recipe by its ID.
Edit user information.
View recipe images.
Admin Users:

Manage users (view, delete, find by ID).
Create, edit, and delete recipes.
Manage recipe images (create, update, delete).
Technologies Used
Frontend:
React.js: For building the user interface.
Backend:
Spring Boot: For handling RESTful API requests.
Database:
MySQL: For storing user and recipe data.
Endpoints
Public Endpoints:
POST /signin: Sign in to the platform.
POST /signup: Sign up for an account.
User Endpoints (After Logging In):
PATCH /edituserbyid/{id}: Edit user information.
GET /allrecipes: View all available recipes.
GET /findrecipebyid/{id}: View a specific recipe by ID.
GET /findimagebyid/{id}: View an image by its ID.
Admin Endpoints (After Logging In as Admin):
GET /allusers: View all users.
DELETE /deleteuserbyid/{id}: Delete a user by ID.
GET /finduserbyid/{id}: Find a user by ID.
POST /createrecipe: Create a new recipe.
DELETE /deleterecipebyid/{id}: Delete a recipe by ID.
PATCH /editrecipebyid/{id}: Edit a recipe by ID.
PATCH /updaterecipeimagelink/{id}: Update recipe image link by ID.
POST /createimage: Create a new image.
DELETE /deleteimagebyid/{id}: Delete an image by ID.
PATCH /editimagebyid/{id}: Edit an image by ID.
Git Repositories
Backend: baigiamojo-backend
Frontend: baigiamojo-frontend
Installation and Setup
Backend Setup
Clone the repository:

bash
Copy code
git clone https://github.com/RokasVaitkus/baigiamojo-backend.git
cd baigiamojo-backend
Set up the MySQL database:

sql
Copy code
CREATE DATABASE recipe_book;
Configure MySQL connection in the application.properties file:

properties
Copy code
spring.datasource.url=jdbc:mysql://localhost:3306/recipe_book
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.jpa.hibernate.ddl-auto=update
Run the Spring Boot backend:

bash
Copy code
./mvnw spring-boot:run
Frontend Setup
Clone the frontend repository:

bash
Copy code
git clone https://github.com/RokasVaitkus/baigiamojo-frontend.git
cd baigiamojo-frontend
Install dependencies:

bash
Copy code
npm install
Start the React app:

bash
Copy code
npm start
API Endpoints Overview
Public: POST /signin, POST /signup
User: PATCH /edituserbyid/{id}, GET /allrecipes, GET /findrecipebyid/{id}, GET /findimagebyid/{id}
Admin: Full user and recipe management including creating, editing, and deleting.