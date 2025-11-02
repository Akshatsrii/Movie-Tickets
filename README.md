🎬 Movie Ticket Website
📝 Overview

The Movie Ticket Website is a full-stack web application that allows users to browse movies, check showtimes, and book movie tickets online. Admins can manage shows, add new movies, and monitor bookings — all in one platform.

🚀 Features
👥 User Features

Browse and search for movies

View show timings, movie details, and ratings

Book and manage tickets

Receive booking confirmation

🛠️ Admin Features

Add, update, and delete movies or shows

Manage users and bookings

Monitor ticket sales and show performance

🧩 Tech Stack

Frontend: React.js, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Version Control: Git & GitHub
API: QMDB / TMDB (for movie data)

⚙️ Installation

Clone the repository

git clone https://github.com/Akshatsrii/Movie-Ticket-Website.git


Navigate to the project directory

cd Movie-Ticket-Website


Install dependencies

npm install


Start the development server

npm run dev


Run the backend (if in a separate folder)

cd server
npm start

🔐 Environment Variables

Create a .env file in your root directory and add the following:

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
QMDB_API_KEY=your_api_key

📸 Screenshots

(You can add images here later)

![Homepage Screenshot](screenshots/home.png)
![Admin Dashboard](screenshots/dashboard.png)

📚 Folder Structure
Movie-Ticket-Website/
│
├── client/                  # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── assets/
│   │   └── App.js
│
├── server/                  # Backend Express app
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
└── README.md

🤝 Contributing
Fork the repository
Create a new branch (feature-branch-name)
Commit your changes

🧑‍💻 Author
Akshat Srivastava

Push to your branch

Create a Pull Request
