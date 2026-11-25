# REST API checkpoint

Express + Mongoose REST API connected to MongoDB Atlas.

## Setup
1. `npm install`
2. Open `config/.env` and replace `PUT_YOUR_ATLAS_URI_HERE` with your Atlas connection string.
3. `npm start`

## Routes
- GET /users : return all users
- POST /users : add a new user (JSON body: name, email, age)
- PUT /users/:id : edit a user by id
- DELETE /users/:id : remove a user by id

Test each route with Postman.
