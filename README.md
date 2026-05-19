# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware# TaskFlow - Task Management Application

TaskFlow is a modern React-based Task Management Application developed using React, Context API, Hooks, Routing, and API Integration.

This project allows users to:
- Login
- View tasks
- Add tasks
- Edit tasks
- Delete tasks
- Update task status
- Search tasks
- Filter tasks
- Navigate between pages

---

# Features

## Authentication
- Login Page
- Form Validation
- Password Visibility Toggle

## Dashboard
- Welcome user using Context API
- Statistics cards
- Responsive modern UI

## Task Management
- Fetch tasks from API
- Add new tasks
- Edit existing tasks
- Delete tasks
- Update task status dynamically
- Assign tasks to users

## Search & Filter
- Search tasks by name
- Filter tasks by status

## Routing
- Home Page
- Add Task Page
- Login Page

## UI Features
- Dark modern dashboard UI
- Responsive Design
- Animated Loader
- Reusable Components

---

# Technologies Used

- React JS
- Vite
- React Router DOM
- Context API
- CSS3
- JavaScript (ES6)
- Fetch API

---

# Folder Structure

```bash
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   └── TaskCard.jsx
│
├── context/
│   └── UserContext.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Home.jsx
│   └── AddTask.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   └── taskService.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
