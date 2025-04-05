# DineBook Backend

## Overview
DineBook Backend is a small personal project I developed for restaurant table reservations. It’s built using **Express.js** and connected to a **MongoDB** database through **Mongoose**. This backend provides APIs for user authentication, table reservations, menu viewing, food reviews, and profile management.

> **Note**: This is the backend part of the application and needs to be used in conjunction with the [dine-book-frontend](https://github.com/supphawit/dine-book-frontend) repository.

## Features
- **Login & Registration API**: Handle user authentication and secure sign-up/sign-in.
- **Table Reservation API**: Manage table bookings for users.
- **Menu API**: View the restaurant's menu. (Maintainance)
- **Food Reviews API**: Add, view, and manage food reviews. (Maintainance)
- **Profile Management API**: View and update user profile information.

## Tech Stack
- **Backend Framework**: Express.js for handling server-side logic.
- **Database**: MongoDB, with Mongoose for object data modeling (ODM).
- **Authentication**: JSON Web Tokens (JWT) for secure authentication and authorization.

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB instance (local or cloud)
- npm (or yarn as an alternative)

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/supphawit/dine-book-backend.git
    ```
2. Navigate into the project directory:
    ```bash
    cd dine-book-backend
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up your MongoDB connection by configuring the `.env` file with your MongoDB URI.
5. Run the database seeding to set up necessary collections and data structures:
    ```bash
    npm run seeding
    ```
6. Run the development server:
    ```bash
    npm run dev
    ```
7. The backend will be running on [http://localhost:4000](http://localhost:4000) by env variable.

## Usage
- Use the provided APIs to manage user accounts, table reservations, menu browsing, and food reviews.

## License
This project is licensed under the MIT License.
