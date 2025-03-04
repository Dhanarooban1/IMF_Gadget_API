# Phoenix: IMF Gadget API Development Challenge

## 🚀 Project Overview
The **Phoenix: IMF Gadget API** is a secure RESTful API designed to manage the gadget inventory for the Impossible Missions Force (IMF). Built with **Node.js**, **Express**, and **PostgreSQL**, this API enables seamless CRUD operations on gadgets, including special functionalities like a **self-destruct sequence**.

---

## 📦 Features

### Gadget Inventory Endpoints (`/gadgets`)
- **GET /gadgets**: Retrieve a list of all gadgets with a randomly generated mission success probability.
- **POST /gadgets**: Add a new gadget with a unique, randomly generated codename.
- **PATCH /gadgets/:id**: Update an existing gadget's details.
- **DELETE /gadgets/:id**: Mark a gadget's status as "Decommissioned" and record the timestamp.

### Self-Destruct Endpoints
- **POST /gadgets/:id/self-destruct**: Trigger a gadget's self-destruct sequence with a randomly generated confirmation code.

### Bonus Features
- **Authentication & Authorization**: JWT-based authentication to secure the API.
- **Status Filtering**: `GET /gadgets?status={status}` to filter gadgets by status.

---

## 📊 Data Model

### Gadgets Table
| Field   | Type    | Description                                |
|---------|---------|--------------------------------------------|
| id      | UUID    | Unique identifier for each gadget          |
| name    | String  | Gadget's name or codename                  |
| status  | Enum    | Status: Available, Deployed, Destroyed, Decommissioned |
| createdAt | DateTime | Timestamp when the gadget was created      |
| updatedAt | DateTime | Timestamp for last update                  |
| decommissionedAt | DateTime | Timestamp when gadget was decommissioned |

---

## 🏗️ Setup Instructions

1. **Clone the repository:**
```bash
git clone https://github.com/Dhanarooban1/IMF_Gadget_API.git
cd Backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment variables:**
Create a `.env` file in the root directory and configure the following:
```plaintext
DATABASE_URL=your_postgres_database_url
JWT_SECRET=your_jwt_secret_key
```

4. **Database setup:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. **Start the server:**
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

---

## 📚 API Documentation

Use Postman or Swagger to test the endpoints:
- **Base URL:** `https://imf-gadget-api-kxga.onrender.com/`

| Method | Endpoint                            | Description                      |
|-------|-------------------------------------|----------------------------------|
| GET   | /gadgets                           | Get all gadgets                  |
| POST  | /gadgets                           | Add a new gadget                 |
| PATCH | /gadgets/:id                       | Update a gadget's info           |
| DELETE| /gadgets/:id                       | Decommission a gadget            |
| POST  | /gadgets/:id/self-destruct         | Trigger self-destruct for gadget |
| GET   | /gadgets?status={status}           | Filter gadgets by status         |

---

## 🚀 Deployment

Deployed on **Render/Heroku/Railway** (Add link when deployed)

---

## ✅ Submission Checklist

- [ ] Code pushed to GitHub repository
- [ ] Live link to deployed API
- [ ] Postman/Swagger documentation

---

## 📧 Contact

For any queries, feel free to connect:
- **Email:** dhanaroobanr@example.com
- **GitHub:** https://github.com/Dhanarooban1

---

Good luck, agent! This README will not self-destruct... but your gadgets might! 💥

