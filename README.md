# MERN CRUD Application

A simple CRUD (Create, Read, Update, Delete) application using MongoDB, Express.js, React, and Node.js (MERN stack).

## Project Overview

This project demonstrates the basic functionalities of a CRUD application built with the MERN stack. The application allows users to manage a list of items, including creating, reading, updating, and deleting entries.

## Features

- **Create**: Add new items to the list.
- **Read**: View the list of items.
- **Update**: Edit existing items.
- **Delete**: Remove items from the list.

## Technologies Used

- **MongoDB**: NoSQL database for storing item data.
- **Express.js**: Backend framework for handling API requests.
- **React**: Frontend library for building the user interface.
- **Node.js**: Runtime environment for executing server-side JavaScript.

## Installation

### Prerequisites

- Node.js (v14 or later)
- MongoDB (installed locally or using a cloud service like MongoDB Atlas)

### Clone the Repository

```bash
git clone https://github.com/ElankumaranR/mern_crud_application.git
cd mern_crud_application

Install Dependencies

bash

npm install

Environment Variables

Create a .env file in the root directory and add the following variables:

makefile

MONGO_URI=your_mongodb_connection_string
PORT=5000

Replace your_mongodb_connection_string with your MongoDB connection string.
Running the Application

    Start the Backend Server:

    bash

cd backend
npm start

Start the Frontend Development Server:

bash

    cd frontend
    npm start

The application should now be running at http://localhost:3000 for the frontend and http://localhost:5000 for the backend.
Usage

    Access the application through your browser at http://localhost:3000.
    Use the interface to create, read, update, and delete items.

API Endpoints

    GET /api/items: Retrieve all items.
    POST /api/items: Create a new item.
    PUT /api/items/
    : Update an existing item.
    DELETE /api/items/
    : Delete an item.
