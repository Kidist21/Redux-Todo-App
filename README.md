# 🚀 Todo App with Redux Toolkit and JWT Authentication

This is a **full-stack Todo App** built with **React**, **Redux Toolkit**, **JSON Server**, and **JWT Authentication**. It demonstrates how to implement authentication and manage a Todo List using **Redux Toolkit** for state management and **JSON Server** as a mock backend.

## 📝 Features

- **User Registration and Login**: Secure registration and login system with JWT token-based authentication.
- **JWT Authentication**: Users must authenticate to access the Todo List. The token is stored in `localStorage`.
- **Todo CRUD Operations**: Users can **Add**, **Toggle (Complete/Incomplete)**, **Delete**, and **Clear** their tasks.
- **Protected Routes**: Only authenticated users can access the Todo List page.
- **Responsive UI**: The app uses **Tailwind CSS** for a sleek and modern user interface.

---

## 🚀 Getting Started

### Prerequisites
Before you can run this application, make sure you have the following installed:

- **Node.js** (>=14.0)
- **npm** or **yarn** (npm comes with Node.js)

### 1. Clone the Repository

Clone this repository to your local machine:

```bash
git clone [https://github.com/Kidist21/Redux-Todo-App.git]
cd todo-app
 ```
### 2. Install dependencies:
```bash
npm install
```

### 3. Start the development server:
```bash
npm start
```

### 4. Run the JSON Server:
```bash
npx json-server --watch db.json --port 5000
```

## 🛠️  How it Works
- User can register and login to access the Todo List.
- Todo List allows adding, toggling (complete/incomplete), removing, and clearing todos.
- Protected Routes ensure access is only available to authenticated users.

## ⚙️ Key Technologies

- React: A JavaScript library for building user interfaces.
- Redux Toolkit: A Redux library that simplifies state management and reduces boilerplate code.
- JSON Server: A simple tool for creating a mock REST API to simulate backend functionality.
- JWT (JSON Web Token): A compact and self-contained way to securely transmit information between the client and server.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

---

## License
[MIT](https://choosealicense.com/licenses/mit/)
