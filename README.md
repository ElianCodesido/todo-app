# Task Manager App

A fullstack task management application built with React, TypeScript, and Node.js.

## Features

* Create and manage multiple task lists
* Add, edit, and delete tasks
* Mark tasks as completed
* Draggable UI windows
* REST API integration with backend
* Persistent data using backend (currently in-memory storage)

---

## Tech Stack

**Frontend**

* React
* TypeScript
* Vite
* CSS

**Backend**

* Node.js
* Express

---

## Live Demo

https://todo-app-elian.vercel.app

---

## Project Structure

* `/frontend` → React application
* `/backend` → Express API

---

## 🔧 Getting Started (Local)

### 1. Clone the repository

```bash
git clone https://github.com/ElianCodesido/todo-app.git
cd todo-app
```

### 2. Install dependencies

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Backend:

```bash
cd backend
npm install
npm run dev
```

---

## 📡 API

The backend currently exposes REST endpoints for **task lists** and **tasks**.

### Lists

* GET /lists and /lists:id
* POST /lists
* PUT /lists/:id
* DELETE /lists/:id

### Tasks

* GET /tasks and /tasks:id
* POST /tasks
* PUT /tasks/:id
* DELETE /tasks/:id


---

## ⚠️ Current Limitations

* Data is stored in memory (resets when server restarts)
* No authentication system

---

## Roadmap / Next Steps

* Replace in-memory storage with MySQL database
* Improve error handling and validation
* Mobile drag support (touch events)
* Improve window layering (z-index management)

---

## Author

Elian Codesido
* Github: https://github.com/ElianCodesido
* Linkedin: https://www.linkedin.com/in/elian-alexis-codesido/
