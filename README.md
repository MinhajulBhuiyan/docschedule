# 🏥 DocSchedule - Doctor Appointment Booking System

<div align="center">

[![Patient Portal](https://img.shields.io/badge/🌐_Patient_Portal-Visit_Site-success?style=for-the-badge)](https://docschedule.vercel.app/)
[![Admin Panel](https://img.shields.io/badge/👨‍⚕️_Admin_Panel-Visit_Site-orange?style=for-the-badge)](https://docschedule-admin.vercel.app/)

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat-square&logo=express)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)

</div>

## 📋 Overview

A comprehensive **Full Stack Doctor Appointment Booking System** built with the **MERN Stack**. Features real-time scheduling, secure payments, and administrative tools for healthcare management.

### 🌐 Live Applications

| Platform | URL | Description |
|----------|-----|-------------|
| 👥 **Patient Portal** | [https://docschedule.vercel.app/](https://docschedule.vercel.app/) | Main application for patients to book appointments |
| 👨‍⚕️ **Admin Panel** | [https://docschedule-admin.vercel.app/](https://docschedule-admin.vercel.app/) | Management portal for doctors and administrators |

---

## 🏗️ Architecture

```
📦 DocSchedule System
├── 🗄️ Backend API (Node.js + Express)     │ Port 4000
├── 👥 Frontend App (React + Vite)         │ Port 5173  
├── 👨‍⚕️ Admin Panel (React + Vite)          │ Port 5174
└── 🐳 Docker Compose (Orchestration)      │ Multi-container
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Git

### Installation
```bash
# Clone repository
git clone https://github.com/MinhajulBhuiyan/docschedule.git
cd docschedule

# Backend setup
cd backend
npm install
# Configure .env file with your credentials
npm start  # Port 4000

# Frontend setup (new terminal)
cd frontend
npm install
npm run dev  # Port 5173

# Admin panel setup (new terminal)
cd admin
npm install
npm run dev  # Port 5174
```

### Environment Variables
Create `.env` in backend folder:
```env
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET_KEY=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
ADMIN_EMAIL=admin@docschedule.com
ADMIN_PASSWORD=your_admin_password
```

---

## 🌟 Features

### 👥 Patient Features
- ✅ User registration & secure login
- 🔍 Browse doctors by speciality
- 📅 Real-time appointment booking
- 💳 Secure payments
- 📱 Responsive mobile design
- 📋 Appointment management

### 👨‍⚕️ Doctor Features
- 📊 Personal dashboard
- 📅 Schedule management
- 👥 Patient management
- ✅ Appointment completion
- 💰 Earnings tracking

### 🔧 Admin Features
- 📈 Analytics dashboard
- 👨‍⚕️ Doctor management
- 👥 Patient oversight
- 📋 Appointment supervision
- 💰 Financial tracking
- 📰 Content management

---

## 🛠️ Tech Stack

**Backend**
- Node.js & Express.js
- MongoDB & Mongoose
- JWT Authentication
- Cloudinary (File Storage)

**Frontend**
- React 19 & Vite
- Tailwind CSS
- React Router
- Axios & React Query
- Framer Motion

**Deployment**
- Vercel (Frontend & Admin)
- Render (Backend API)
- MongoDB Atlas
- Docker Support

