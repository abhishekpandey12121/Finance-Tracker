# 🏦 Finance Manager Backend

This is the backend of a **Finance Manager** application built with **Node.js, Express, MongoDB, and Socket.io**. The project allows users to register, log in, and manage their financial transactions (income/expenses). 

## 📌 Features
✅ **User Authentication** (Register/Login with JWT)  
✅ **Finance Tracking** (Income/Expenses management)  
✅ **Socket.io Integration** (Real-time transaction updates)  
✅ **MongoDB Database** (Mongoose schema models)  
✅ **REST API Implementation**  

## 🛠️ Technologies Used
- **Node.js** (Backend)
- **Express.js** (Framework)
- **MongoDB & Mongoose** (Database & ORM)
- **Socket.io** (Real-time updates)
- **bcryptjs** (Password hashing)
- **jsonwebtoken (JWT)** (User authentication)

## 🚀 Installation Guide

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/<your-username>/finance-manager.git
cd finance-manager/backend
Install Dependencies
npm install
Setup Environment Variables
Create a .env file and add:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
 Run the Server
npm start
📡 API Endpoints
🔑 Authentication
POST /register → Register a new user
POST /login → Authenticate user & return JWT
💰 Finance Management
POST /finance → Add a new transaction
GET /finance/:userId → Fetch user's transactions
🔗 Connect with Me
📧 Email: abhishekpandey12121@gmail.com
💻 LinkedIn: (https://www.linkedin.com/in/abhishek-pandey-3b395b178/)
🌐 GitHub: Your GitHub Profile




