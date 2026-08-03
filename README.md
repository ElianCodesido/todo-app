# Task Manager

A full-stack task management application built with React, TypeScript, Node.js, Express, and MySQL.

The project was developed to demonstrate a modern full-stack architecture, including user authentication, relational database design, REST APIs, and deployment. It follows a layered backend architecture and focuses on maintainability, security, and clean code practices.

## Features

### Authentication

* User registration and login
* Password hashing with bcrypt
* JWT-based authentication
* Protected API routes
* User authorization (users can only access their own data)

### Task Management

* Create, edit, and delete task lists
* Create, edit, delete, and complete tasks
* Multiple lists per user
* Tasks associated with their corresponding list
* Persistent storage using MySQL

### User Experience

* Loading states
* Error handling and user feedback
* Toast notifications
* Draggable windows interface

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS
* Fetch API

### Backend

* Node.js
* Express
* REST API
* Layered architecture (Routes → Controllers → Services → Repositories)
* JWT Authentication
* bcrypt
* Environment variables with dotenv

### Database

* MySQL
* mysql2/promise
* Relational database design
* Foreign keys and ownership validation

## Architecture

The backend follows a layered architecture to separate responsibilities:

* Routes
* Controllers
* Services
* Repositories
* Database

This structure improves maintainability, scalability, and testability.

## Technical Highlights

- JWT Authentication
- Password hashing with bcrypt
- MySQL relational database
- Layered backend architecture
- RESTful API
- Ownership-based authorization
- Backend validation
- Centralized error handling
- Environment variables

## Video Demo

[Screencast_20260803_181316.webm](https://github.com/user-attachments/assets/cdd8dedb-1b6b-4ecd-99cf-28847560898d)

## API Overview

### Authentication

* GET /auth/me
* POST /auth/register
* POST /auth/login

### Lists

* GET /lists (by userId)
* POST /lists
* PATCH /lists/:id
* DELETE /lists/:id

### Tasks

* GET /tasks/:listId
* POST /tasks
* PATCH /tasks/:id
* DELETE /tasks/:id

## Local Setup

### Clone the repository

```bash
git clone https://github.com/ElianCodesido/todo-app.git
cd todo-app
```

### Install dependencies

Frontend

```bash
cd frontend
npm install
npm run dev
```

Backend

```bash
cd backend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file inside the backend directory containing the required environment variables (use .env.example as a guide).

## Future Improvements

Possible future enhancements include:

* Automated testing
* Docker support
* API documentation
* Role-based authorization
* Password recovery

## Author

Elian Codesido

GitHub: https://github.com/ElianCodesido

LinkedIn: https://www.linkedin.com/in/elian-alexis-codesido/
