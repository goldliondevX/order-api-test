# Order Service and API Documentation

This document outlines the `OrderService`, `ProductService`, and authentication in our application, providing a detailed overview of their functions and API endpoints. The services manage orders, product inventory, and authentication, ensuring secure access and accurate inventory tracking.

## Overview

The services covered in this documentation include:

- **Order Service**: Manages order creation, retrieval, updating, and deletion while tracking product stock levels.
- **Product Service**: Handles product creation, retrieval, updating, and deletion.
- **Authentication**: Provides secure access to endpoints, ensuring only authenticated users can interact with protected resources.

---

## Authentication

The application uses JWT-based authentication to secure access to protected endpoints. Users must log in to receive a token, which must be included in the header of each request to access secured routes.

### Authentication Endpoints

1. **User Sign-Up**

   - **Endpoint**: `POST /auth/signup`
   - **Description**: Registers a new user account.
   - **Request Body**:
     - `username`: Unique username for the user.
     - `password`: Password for the account (hashed before storage).
     - `email`: Optional email address.
   - **Response**: Confirms successful registration.

2. **User Login**

   - **Endpoint**: `POST /auth/login`
   - **Description**: Authenticates an existing user and returns a JWT token.
   - **Request Body**:
     - `username`: The user’s username.
     - `password`: The user’s password.
   - **Response**: Returns an access token for authenticated requests.

3. **Accessing Protected Endpoints**
   - **Authorization Header**: Include the JWT token in the `Authorization` header as `Bearer <token>` for access to protected routes.
   - **Error Handling**: Returns a 401 Unauthorized error if the token is missing or invalid.

---

## Product Service

The `ProductService` manages CRUD operations for products, providing endpoints for creating, retrieving, updating, and deleting products. It maintains the product inventory, and all endpoints are secured to prevent unauthorized access.

### Product API Endpoints

1. **Create Product**

   - **Endpoint**: `POST /products`
   - **Description**: Adds a new product to the inventory.
   - **Request Body**:
     - `name`: The name of the product.
     - `stock`: Initial stock quantity.
     - Additional product details as needed.
   - **Response**: Returns the created product with details, including `id`, `name`, `stock`, and other attributes.
   - **Permissions**: Only authenticated users can create a product.

2. **Retrieve Single Product**

   - **Endpoint**: `GET /products/:id`
   - **Description**: Retrieves details for a specific product by ID.
   - **Path Parameter**:
     - `id`: Unique identifier for the product.
   - **Response**: Returns product details, including stock availability.
   - **Permissions**: Only accessible to authenticated users.

3. **Retrieve All Products**

   - **Endpoint**: `GET /products`
   - **Description**: Retrieves a list of all products in inventory.
   - **Response**: Returns an array of products, each with information on `id`, `name`, `stock`, and other attributes.
   - **Permissions**: Only accessible to authenticated users.

4. **Update Product**

   - **Endpoint**: `PUT /products/:id`
   - **Description**: Updates details of a specified product.
   - **Path Parameter**:
     - `id`: Unique identifier for the product.
   - **Request Body**: Fields to update, such as `name` or `stock`.
   - **Response**: Returns updated product details.
   - **Permissions**: Only authenticated users can update product data.

5. **Delete Product**
   - **Endpoint**: `DELETE /products/:id`
   - **Description**: Deletes a specified product from inventory.
   - **Path Parameter**:
     - `id`: Unique identifier for the product.
   - **Response**: Confirmation of deletion.
   - **Permissions**: Only accessible to authenticated users.

---

## Order Service

The `OrderService` provides endpoints for managing orders and ensures accurate stock management. Stock levels adjust automatically based on order activity, and endpoints require authentication.

### Order API Endpoints

1. **Create Order**

   - **Endpoint**: `POST /orders`
   - **Description**: Creates an order for a product, reducing stock accordingly.
   - **Request Body**:
     - `product`: Object with the product’s `id`.
     - `quantity`: Quantity for the order.
   - **Response**: Returns the created order details.
   - **Stock Management**: Deducts stock based on quantity; returns an error if stock is insufficient.

2. **Get Single Order**

   - **Endpoint**: `GET /orders/:id`
   - **Description**: Retrieves details for a single order by its ID.
   - **Response**: Returns details of the specified order, including associated product and quantity.
   - **Permissions**: Only accessible to authenticated users.

3. **Get All Orders**

   - **Endpoint**: `GET /orders`
   - **Description**: Retrieves a list of all orders.
   - **Response**: Returns an array of all orders.
   - **Permissions**: Only accessible to authenticated users.

4. **Update Order**

   - **Endpoint**: `PUT /orders/:id`
   - **Description**: Updates an existing order’s details, adjusting stock accordingly.
   - **Request Body**:
     - Updated product ID or quantity.
   - **Response**: Returns updated order details.
   - **Stock Management**: Adjusts stock based on changes to product or quantity.

5. **Delete Order**
   - **Endpoint**: `DELETE /orders/:id`
   - **Description**: Deletes an order, restoring the associated product’s stock.
   - **Response**: Confirmation of deletion.
   - **Permissions**: Only accessible to authenticated users.

---

## Stock and Error Handling

### Stock Management Summary

The `OrderService` and `ProductService` work together to maintain accurate stock levels across the inventory:

- **Order Creation**: Deducts stock based on the ordered quantity.
- **Order Update**: Restores stock for previous product/quantity if modified.
- **Order Deletion**: Restores stock by adding back the order quantity.

### Error Handling

Both services include error handling to ensure data consistency:

- **Product Not Found**: Returns an error if a specified product does not exist.
- **Out of Stock**: Returns an error if stock levels are insufficient to fulfill an order.
- **Order Not Found**: Returns an error if an order does not exist for retrieval, updating, or deletion.
- **Authentication**: Returns a 401 Unauthorized error for unauthenticated requests on protected endpoints.

---

## Future Enhancements

Potential improvements for these services include:

- **Enhanced Logging**: To track and audit all inventory adjustments and orders.
- **Transaction Management**: To ensure atomic updates for complex operations.
- **Role-Based Access**: For more granular control over product and order management permissions.

---

This documentation provides a comprehensive guide for developers and users on interacting with the `OrderService`, `ProductService`, and authentication system to ensure secure and accurate inventory and order management.
