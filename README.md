

# 🚀 GigFlow – Mini Freelance Marketplace

GigFlow is a lightweight freelance marketplace where **Clients** can post jobs (Gigs), **Freelancers** can bid, and **Clients** can hire one freelancer.
This project demonstrates:

✔ Authentication
✔ Complex relationships
✔ State management
✔ Atomic update logic

---

## 🌍 Live Demo

**Frontend Deployment:**
[https://gigflow-mini-freelance-marketplace-f.onrender.com/](https://gigflow-mini-freelance-marketplace-f.onrender.com/)

---

## 🛠 Tech Stack

### **Frontend**

* React (Vite)
* Tailwind CSS
* Context API (Authentication State)

### **Backend**

* Node.js + Express.js
* MongoDB + Mongoose
* JWT (Stored in HttpOnly Cookies)

### **Other**

* Axios
* cookie-parser
* CORS

---

## ✨ Features Overview

### 👤 **User Authentication**

* Register / Login
* JWT Auth with HttpOnly Cookies
* Logout
* Protected Routes

### 📌 **Gigs (Job Posting)**

* Create new gig (Title, Description, Budget)
* Search/filter by title
* Show only **open** gigs
* Only gig owner can view its bids

### 💰 **Bidding System**

* Freelancers submit bid (Price + Message)
* User cannot bid twice on same gig
* Gig owners see all bids
* Shows bidder **name & email**

### 🧩 **Hiring Logic (Atomic Updates)**

When the owner clicks **Hire**, the system:

1. Updates Gig status → `assigned`
2. Marks selected bid → `hired`
3. Marks all other bids → `rejected`
4. Freelancer sees updated status under **My Bids**

This ensures:
✔ No race conditions
✔ Single-hire consistency
✔ Clean relational integrity

---

## 📁 Folder Structure

```
gigflow/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middleware/
│   ├── .env.example
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── context/
│   ├── .env.example
│   └── vite.config.js
│
└── README.md
```

---

## 🧰 Installation & Setup

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/YOUR_USERNAME/gigflow.git
cd gigflow
```

---

## 🖥 Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

---

## 🌐 Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

---

## 📡 API Endpoints

### **Auth**

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| POST   | /api/auth/register | Register new user |
| POST   | /api/auth/login    | Login user        |

### **Gigs**

| Method | Endpoint       | Description                        |
| ------ | -------------- | ---------------------------------- |
| GET    | /api/gigs      | Fetch open gigs (search supported) |
| POST   | /api/gigs      | Create new gig                     |
| GET    | /api/gigs/mine | View gigs posted by user           |

### **Bids**

| Method | Endpoint              | Description                     |
| ------ | --------------------- | ------------------------------- |
| POST   | /api/bids             | Create bid                      |
| GET    | /api/bids/:gigId      | Get bids for a gig (owner only) |
| PATCH  | /api/bids/:bidId/hire | Hire freelancer                 |

---

## 🔐 Environment Variables

### **backend/.env.example**

```
MONGO_URI=
JWT_SECRET=
CLIENT_URL=http://localhost:5173
PORT=5000
```

### **frontend/.env.example**

```
VITE_API_URL=http://localhost:5000/api
```

---

## 🔥 Advanced Logic (Atomic Hiring)

The **hire** action is atomic to ensure:

* No duplicate hiring
* No inconsistent bid states
* No conflicting updates

This guarantees that **only one freelancer** is hired and other bids are automatically rejected, keeping data consistent.

---

## 👤 Author

**GigFlow — Created by Surendra Yenika**

If you have any questions, feel free to reach out!

---

