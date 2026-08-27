# 🍔 Online Food Ordering System — Foodie

An **Online Food Ordering System** that allows customers to browse food items, create an account, add items to a cart, place orders, and manage their orders through a user-friendly web interface.

The project is developed as a web-based food ordering platform with a frontend and backend architecture.

---

## 📌 Project Overview

**Foodie** is an online food ordering web application designed to make food ordering simple, fast, and convenient.

Customers can:

* Browse available food items
* View food categories
* Register and log in
* Add food items to the cart
* Update cart quantities
* Place orders
* View order history
* Manage their profile

The system is designed with a clean and responsive user interface and can be extended with additional features in the future.

---

## ✨ Features

### 👤 User Features

* User Registration
* User Login
* User Profile
* Browse Food Menu
* Food Categories
* Food Item Details
* Add to Cart
* Update Cart
* Remove Items from Cart
* Checkout
* Place Orders
* View Order History

### 🛒 Shopping Cart

* Add food items to cart
* Increase/decrease quantity
* Remove food items
* Automatic total calculation
* Checkout system

### 📦 Order Management

* Place food orders
* View previous orders
* Track order information
* Store customer and order details

### 🎨 User Interface

* Responsive design
* Clean and modern layout
* Navigation menu
* Home page
* Menu page
* Login and registration pages
* Cart page
* Checkout page
* Orders page
* Profile page

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* MongoDB Atlas

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Vercel

---

## 📁 Project Structure

```text
Online-Food-Ordering-System/
│
├── Client/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── css/
│   │   ├── cart.css
│   │   ├── checkout.css
│   │   ├── login.css
│   │   ├── menu.css
│   │   ├── orders.css
│   │   └── register.css
│   │
│   ├── js/
│   │   ├── cart.js
│   │   ├── checkout.js
│   │   ├── login.js
│   │   ├── menu.js
│   │   ├── orders.js
│   │   └── register.js
│   │
│   ├── pages/
│   │   ├── cart.html
│   │   ├── checkout.html
│   │   ├── login.html
│   │   ├── menu.html
│   │   ├── orders.html
│   │   ├── profile.html
│   │   └── register.html
│   │
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Server/
│   ├── config/
│   │   └── db.js
│   │
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── README.md
└── .gitignore
```

> **Note:** The exact backend folders may change as the project develops.

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/musaddikh087-png/Online-Food-Ordering-System.git
```

### 2. Open the Project

```bash
cd Online-Food-Ordering-System
```

### 3. Install Backend Dependencies

Go to the Server directory:

```bash
cd Server
```

Install the required packages:

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `Server` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

**Do not upload the `.env` file to GitHub.**

Make sure `.env` is included in `.gitignore`.

### 5. Start the Backend Server

```bash
npm start
```

The server should run at:

```text
http://localhost:5000
```

### 6. Run the Frontend

Open the `Client` folder in Visual Studio Code and open:

```text
Client/index.html
```

You can use **Live Server** in VS Code to run the frontend locally.

---

## 🌐 Live Deployment

The frontend can be deployed using **Vercel**.

Production/Live Website:

**https://online-food-ordering-system-inky-nine.vercel.app/**

---

## 🔐 Security

Sensitive information such as:

* MongoDB connection strings
* API keys
* Passwords
* Secret environment variables

should never be committed to GitHub.

The `.env` file should remain local and should be added to `.gitignore`.

Example:

```text
.env
node_modules/
```

---

## 🔄 Git Workflow

The project uses Git and GitHub for version control.

Basic workflow:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

For feature development, team members can use separate branches:

```bash
git checkout -b feature/feature-name
```

After completing the work:

```bash
git add .
git commit -m "Add feature"
git push origin feature/feature-name
```

---

## 👥 Team Members

| Name             | Role      |
| ---------------- | --------- |
| Musaddik Hussain | Developer |
| Team Member 2    | Developer |

> Replace **Team Member 2** with your teammate's actual name.

---

## 🎯 Project Goals

The main goals of this project are:

1. To develop a functional online food ordering platform.
2. To provide a simple and user-friendly ordering experience.
3. To implement user authentication.
4. To manage food items and orders efficiently.
5. To store application data using a database.
6. To practice frontend and backend web development.
7. To use Git and GitHub for collaborative development.

---

## 🔮 Future Improvements

The following features can be added in future versions:

* Online payment integration
* Admin dashboard
* Restaurant/vendor management
* Food search and filtering
* Order tracking
* Email notifications
* SMS notifications
* Customer reviews and ratings
* Discount coupons
* Delivery management
* Real-time order status
* Improved mobile responsiveness

---

## 📚 Academic Project

This project is developed as part of an academic software development project.

**Project Name:** Online Food Ordering System
**Application Name:** Foodie
**Type:** Web Application
**Repository:** Online-Food-Ordering-System

---

## 📄 License

This project is developed for **educational and academic purposes**.

---

## ❤️ Acknowledgement

Thanks to our course instructor and teammates for their guidance and contribution to the development of this project.

---

### ⭐ Foodie — Making Food Ordering Simple, Fast & Convenient!
