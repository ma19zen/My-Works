# 🏎️ UdaciRacer Simulation Game

Welcome to the one and only **UdaciRacer Sim Game** — a fun car racing simulation built with Node.js (frontend) and Go (backend API).

---

## 🚀 Project Overview

This project is part of a learning exercise to practice working with asynchronous JavaScript, DOM manipulation, and API communication.

🛠️ **Important Note:**  
I did not build this entire project from scratch. The **backend server (Go)** and most of the **frontend HTML/CSS** were already provided as starter code.  
**My main task was to complete the JavaScript logic in the file:**

```
src/client/assets/javascript/index.js
```

I followed the `// TODO` comments in that file to finish the game's functionality (API calls, event handling, race flow, etc.).

---

## 🎮 Game Features

1. **Race Setup Screen** — Pick your racer and track.
2. **Race Progress Screen** — Start the race, accelerate, and watch the real-time leaderboard.
3. **Race Results Screen** — See who finishes first after the race ends.

---

## ⚙️ How to Run the Project

### 1. Run the Backend (Go API Server):

✔️ Open terminal:

```bash
cd api
go build
go run .
```

✅ Server runs at: [http://localhost:3001](http://localhost:3001)  
Leave this terminal running.

---

### 2. Run the Frontend (Node/Yarn Server):

✔️ Open a new terminal:

```bash
npm install
npm start
```

✅ Frontend runs at: [http://localhost:3002](http://localhost:3002)

---

## 🔗 API Endpoints Used:

| Method | Endpoint                     | Description                      |
|--------|-----------------------------|----------------------------------|
| GET    | /api/tracks                 | List all tracks                  |
| GET    | /api/cars                   | List all racers (cars)           |
| POST   | /api/races                  | Create a new race                |
| POST   | /api/races/{id}/start        | Start the created race           |
| POST   | /api/races/{id}/accelerate   | Accelerate player’s car          |
| GET    | /api/races/{id}             | Get race status and positions    |

---

## 📝 What I Edited:

✔️ Completed all required `// TODO` parts in:  

```
src/client/assets/javascript/index.js
```

✔️ Implemented API fetch requests, race handling, DOM updates.

❌ Did **NOT** modify:

- Backend Go API files in `/api`
- HTML & CSS files for styling/layout (unless minor adjustments).

---

## ❗ Notes:

- Backend must be running first before starting the frontend.
- Refresh the browser to see JS changes.
- Race logic, leaderboard updates, and user interactions are fully functional as required.

---

## ✅ Summary:

> Backend: run `go run .` in `/api`  
> Frontend: run `npm start` in root folder  
> Open [http://localhost:3002](http://localhost:3002) — and enjoy racing! 🏁

---
```
