# User Management Dashboard

A full-featured, responsive CRUD web application built with **React** and **Vite**, demonstrating clean architecture, beautiful UI design, and robust state management.

## Features

- **Premium UI**: Dark mode aesthetics with glassmorphism, smooth micro-animations, and Inter typography.
- **Full CRUD Operations**: View, Add, Edit, and Delete users via the JSONPlaceholder mock API.
- **Optimistic UI Updates**: Since JSONPlaceholder doesn't persist POST/PUT requests, the app intelligently updates the local state immediately to simulate a real production environment.
- **Advanced Data Grid**: 
  - Pagination (10, 25, 50, 100 items per page)
  - Global Search (debounced)
  - Column sorting (Ascending/Descending)
  - Multi-field Filter Popup (First Name, Last Name, Email, Department)
- **Robust Error Handling**: Centralised Axios interceptors and a custom Toast Notification system.
- **Client-Side Validation**: Ensures data integrity for all form fields before submission.
- **Unit Tested**: 100% passing test suite built with Vitest.

---

## 🚀 Setup & Run Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Install Dependencies
Run the following command in the root directory of the project to install all required packages:
```bash
npm install
```

### 2. Start the Development Server
Run the following command to start Vite's blazing-fast development server:
```bash
npm run dev
```
Open the URL provided in your terminal (usually `http://localhost:5173`) in your web browser.

### 3. Run Unit Tests (Optional)
To verify the integrity of the application's core logic and utility functions, run:
```bash
npm run test
```

---

## 🧠 Reflection & Challenges Faced

### Challenges
1. **Handling Mock Backend Limitations**: JSONPlaceholder simulates successful requests but doesn't persist data. Managing the mismatch between a "successful POST" and the fact that a subsequent `GET` won't return the new user required carefully implementing **optimistic UI updates** within custom React hooks to keep the user experience seamless.
2. **Data Structure Mismatch**: JSONPlaceholder uses a single `name` string and `company.name` for the department. The UI required `firstName`, `lastName`, and `department`. I had to build a robust `normalizeUser` utility to map the backend data shape to our clean frontend data model, and conversely parse it back for POST/PUT requests.
3. **Complex State Management**: Juggling pagination, searching, sorting, and specific column filtering simultaneously can cause severe performance issues or race conditions. I solved this by separating concerns into highly modular custom hooks (`useSearch`, `useSort`, `useFilter`, `usePagination`) and using `useMemo` to efficiently chain the data transformations before rendering.

### Future Improvements
Given more time, I would implement the following enhancements:
1. **Global State Management**: While custom hooks work great here, if the app were to scale larger, integrating Redux Toolkit or Zustand would prevent prop-drilling and make state accessible across disparate parts of a larger application.
2. **Server-Side Pagination/Filtering**: Currently, all searching and sorting is done strictly on the client side since JSONPlaceholder returns a small dataset. For a real production app with millions of users, I would update the custom hooks to pass query parameters (`?_limit=10&_page=1&q=search`) to the API.
3. **End-to-End (E2E) Testing**: In addition to the Vitest unit tests, I would add Cypress or Playwright to automate full browser testing of the critical Add/Edit/Delete user journeys.

---

## 🌐 Deployment & Repository Links
- **Live Deployment**: [https://MacherlaRohith.github.io/User-Management-Dashboard/](https://MacherlaRohith.github.io/User-Management-Dashboard/)
- **GitHub Repository**: [https://github.com/MacherlaRohith/User-Management-Dashboard](https://github.com/MacherlaRohith/User-Management-Dashboard)
