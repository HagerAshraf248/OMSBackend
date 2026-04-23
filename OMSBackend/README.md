# Mobile Store Backend API

This is the backend for a mobile store website, built using Node.js, Express, and MongoDB. The application strictly follows the provided Software Requirements Specifications (SRS) and Class Diagrams. It is structured using an enterprise-ready MVC (Model-View-Controller) architecture combined with a dedicated Service layer.

## 🏗️ Project Architecture
- **Config** (`config/`): Centralized database configuration.
- **Models** (`models/`): Mongoose schemas defining the structure of collections (`User`, `Product`, `Cart`, `CartItem`, `Order`, `OrderItem`).
- **Services** (`services/`): Contains the core business logic and database interactions.
- **Controllers** (`controllers/`): Handles incoming HTTP requests and links services to routes.
- **Routes** (`routes/`): Defines RESTful API endpoints.
- **Validations** (`validations/`): Centralized Joi schemas to validate incoming request bodies.
- **Middleware** (`middleware/`): Global error handler and JWT-based role authorization.

## 📁 Project Structure
```text
📦 Back
 ┣ 📂 config
 ┃ ┗ 📜 db.js
 ┣ 📂 controllers
 ┃ ┣ 📜 authController.js
 ┃ ┣ 📜 cartController.js
 ┃ ┣ 📜 orderController.js
 ┃ ┣ 📜 productController.js
 ┃ ┗ 📜 userController.js
 ┣ 📂 middleware
 ┃ ┣ 📜 authMiddleware.js
 ┃ ┗ 📜 errorMiddleware.js
 ┣ 📂 models
 ┃ ┣ 📜 Cart.js
 ┃ ┣ 📜 CartItem.js
 ┃ ┣ 📜 Order.js
 ┃ ┣ 📜 OrderItem.js
 ┃ ┣ 📜 Product.js
 ┃ ┗ 📜 User.js
 ┣ 📂 routes
 ┃ ┣ 📜 authRoutes.js
 ┃ ┣ 📜 cartRoutes.js
 ┃ ┣ 📜 orderRoutes.js
 ┃ ┣ 📜 productRoutes.js
 ┃ ┗ 📜 userRoutes.js
 ┣ 📂 services
 ┃ ┣ 📜 authService.js
 ┃ ┣ 📜 cartService.js
 ┃ ┣ 📜 orderService.js
 ┃ ┣ 📜 productService.js
 ┃ ┗ 📜 userService.js
 ┣ 📂 utils
 ┃ ┗ 📜 jwt.js
 ┣ 📂 validations
 ┃ ┗ 📜 authValidation.js
 ┣ 📂 public
 ┃ ┗ 📜 index.html
 ┣ 📜 .env.example
 ┣ 📜 app.js
 ┣ 📜 package.json
 ┗ 📜 seed.js
```

## ✨ Features
- **Authentication**: JWT-based login and registration with strict password and name validation.
- **Roles**: Three distinct roles (`admin`, `supplier`, `client`).
- **Products**: Suppliers can add/delete their own products. Clients can browse them.
- **Cart & Checkout**: Clients can add products to a cart and securely checkout, automatically converting their cart into an Order.
- **Orders**: Clients can view their purchase history.
- **Admin Management**: Admins can manage users and register supplier accounts.

## 💻 Technologies Used
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for authentication
- bcryptjs for password hashing
- Joi for payload validation
- Helmet & CORS for security

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: Minimum `v18+` required.
- **MongoDB**: A MongoDB Atlas cluster or local MongoDB instance.
- *Note: `nodemon` is used to run the server in development, but you don't need to install it globally. It will be installed automatically as a development dependency via `npm install`.*

### 2. Environment Variables
Copy the `.env.example` file to create your own `.env` file instead of creating it from scratch:
```bash
cp .env.example .env
```
Ensure your `.env` contains:
```env
MONGO_URI="mongodb+srv://<user>:<password>@cluster0..."
PORT=3000
JWT_SECRET=your_strong_secret_here
```

### 3. Installation
Install the required dependencies:
```bash
npm install
```

### 4. Database Seeding
To automatically populate the database with dummy data (an Admin, a Client, Products, a Cart, and an Order), run:
```bash
node seed.js
```

### 5. Start the Server
Run the development server using nodemon:
```bash
npx nodemon app.js
```
Navigate to `http://localhost:5000/` in your browser to view a simple HTML tester for the Authentication flow!

---

## 🔗 API Endpoints Overview

### Auth
- `POST /api/auth/register` - Register a new client
- `POST /api/auth/login` - Login to receive a JWT

### Users (Protected: Admin Only)
- `GET /api/users` - Get all users
- `DELETE /api/users/:id` - Delete a user
- `POST /api/users/supplier` - Create a supplier account

### Products
- `GET /api/products` - Browse all products (Public)
- `POST /api/products` - Add a product (Protected: Supplier/Admin)
- `DELETE /api/products/:id` - Delete a product (Protected: Supplier/Admin)

### Carts (Protected: Logged in Users)
*(Note: Users are strictly authorized to view, add, or checkout only their own carts based on their JWT token.)*
- `GET /api/carts/user/:userId` - Get cart contents
- `POST /api/carts` - Create a cart
- `POST /api/carts/:cartId/items` - Add item to cart
- `DELETE /api/carts/items/:itemId` - Remove item from cart
- `POST /api/carts/:cartId/checkout` - Checkout cart to create an Order

### Orders (Protected: Logged in Users)
- `GET /api/orders/user/:userId` - View order history
- `POST /api/orders` - Place an order directly (bypassing the cart functionality)
