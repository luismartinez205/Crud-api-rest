# Node js & Firebase Rest Api for e-comerce App

A REST API using Node.js and FIREBASE , and using Express.js for routing.

## Requirements

- Node.js

- Firebase

## Installation

1. Clone the repository: `git clone https://github.com/FaztWeb/postgresql-node-restapi.git`

2. Install the dependencies: `npm install`

3. Create a database in Firebase

4. Create a .env file in the root directory and add the following:

```
FIREBASEAPIKEY= your_Api Key
FIREBASEAUTHDOMAIN= your_Domain
FIREBASEPROJECTID= your projectId
FIREBASESTORAGEBUCKET= your Bucket
FIREBASEMESSAGINGSENDERID= your_Id
FIREBASEAPPID= your_Id
```
5. Run the server: `npm run dev`

## Endpoints

 this api has 4 collections in firebase

`products`

- GET /api/products `(has filters by queries: name, category, feature, brand )`
- GET /api/products/:id
- POST /api/products
- Pacth /api/products/:id
- DELETE /api/products/:id

 `users`

- GET /api/users `(has filters by queries: name, role, id )`
- GET /api/users/:id
- POST /api/users
- Pacth /api/users/:id
- DELETE /api/users/:id

`login`
- POST /api/login
- POST /api/logout
- GET /api/profile

`search`
- GET /api/search?search=thinkplus

`orders`  
- GET /api/orders
- GET /api/orders/:id
- POST /api/orders
- PATCH /api/orders/:id
- DELETE /api/orders/:id

`categories`
- GET /api/categories
- GET /api/categories/:id
- POST /api/categories
- PACTH /api/categories/:id
- DELETE /api/categories/:id

## License

This project is open-sourced software licensed under the MIT License.
