```
# GigFlow – Mini Freelance Marketplace

GigFlow is a simple freelance platform where Clients can post jobs (Gigs),
Freelancers can submit bids, and Clients can hire one freelancer.
This project demonstrates authentication, complex relationships, state
management, and atomic update logic.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Context API (Auth state)

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication using HttpOnly cookies

### Other
- Axios
- cookie-parser
- Cors

---

## ⚙️ Features

### 👤 User Authentication
- Register / Login
- Secure JWT stored in HttpOnly Cookies
- Logout
- Auth-protected routes

### 📌 Gigs (Jobs)
- Create a new Gig (Title, Description, Budget)
- Search/filter by title
- View only *open* gigs
- Only owner can view bids on their gig

### 💰 Bidding System
- Freelancer places a bid (price + message)
- User cannot bid twice on same gig
- Owner sees all bids for their gig
- Shows bidder name + email

### 🧩 Hiring Logic (Crucial Feature)
When the Client clicks **Hire**:

1. Gig status becomes **assigned**
2. Selected bid becomes **hired**
3. All other bids automatically become **rejected**
4. Freelancer can view updated status from **My Bids**

This logic is **atomic**, so it ensures:
✔ No race conditions  
✔ Data remains consistent  

---

## 🧱 Folder Structure

```

gigflow/
├── backend/
│    ├── src/
│    │    ├── controllers/
│    │    ├── models/
│    │    ├── routes/
│    │    └── middleware/
│    ├── .env.example
│    └── server.js
│
├── frontend/
│    ├── src/
│    │    ├── pages/
│    │    ├── components/
│    │    └── context/
│    ├── .env.example
│    └── vite.config.js
│
├── README.md
└── package.json (optional root)

```

---

## 🔧 Installation Instructions

### 1️⃣ Clone the Repository

```

git clone [https://github.com/YOUR_USERNAME/gigflow.git](https://github.com/YOUR_USERNAME/gigflow.git)
cd gigflow

```

---

## 🖥️ Backend Setup

```

cd backend
npm install
cp .env.example .env
npm run dev

```

---

## 🌐 Frontend Setup

```

cd frontend
npm install
cp .env.example .env
npm run dev

```

---

## 🧪 API Endpoints

### Auth
| Method | Endpoint              | Description |
|--------|------------------------|-------------|
| POST   | /api/auth/register     | Create user |
| POST   | /api/auth/login        | Login user  |

### Gigs
| Method | Endpoint         | Description |
|--------|-------------------|-------------|
| GET    | /api/gigs         | Fetch open gigs (search supported) |
| POST   | /api/gigs         | Create gig |
| GET    | /api/gigs/mine    | My posted gigs |

### Bids
| Method | Endpoint             | Description |
|--------|------------------------|-------------|
| POST   | /api/bids             | Create bid |
| GET    | /api/bids/:gigId      | Get bids for a gig (owner only) |
| PATCH  | /api/bids/:bidId/hire | Hire freelancer |


### 🔹 backend/.env.example

```

MONGO_URI=
JWT_SECRET=
CLIENT_URL=[http://localhost:5173](http://localhost:5173)
PORT=5000

```

---

### 🔹 frontend/.env.example

```

VITE_API_URL=[http://localhost:5000/api](http://localhost:5000/api)

```

---

## 🔥 Advanced Logic (Atomic Update)

The hiring logic ensures:
- No other user can accidentally overwrite hiring
- No two freelancers can be hired for same gig
- Data always stays consistent

---

## 📬 Contact

If you have any questions, feel free to reach out!  
GigFlow – Created by Surendra Yenika

```

---

