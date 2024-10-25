# User Authentication API
This project is a RESTful API built using Node.js, Express, MongoDB, and Mongoose that allows users to sign up, log in, and log out using JWT-based authentication. The API ensures secure user account management by sending a JWT token upon successful login, which is required for user session verification. It also includes proper token validation for logging out users.

## Features
- User Registration: Users can create a new account by providing necessary details like username, email, and password.
- User Login: Existing users can log in to their accounts using valid credentials. A JWT token is generated upon successful login.
- JWT Authentication: Secure authentication using JWT tokens. The token is sent to the user upon login and must be included in subsequent requests to protected routes.
- User Logout: Users can log out, and the JWT token is verified before ending the session.
- Get a user : we can get a user details if we have jwt token

# Tech Stack
- Node.js: JavaScript runtime for server-side logic.
- Express.js: Web framework for building the API.
- MongoDB: NoSQL database to store user information.
- Mongoose: ODM (Object Data Modeling) library for MongoDB.
- JSON Web Tokens (JWT): Secure way to manage user authentication and protect routes.
- Bcrypt.js: For hashing user passwords before storing them in the database.
- Nodemon: Automatically restarts the server during development upon code changes.
- Cookie-Parser: Parses cookies attached to client requests.
- Email-Validator: Ensures valid email format during registration.
- Dotenv: Loads environment variables from a .env file for better security and configuration management.