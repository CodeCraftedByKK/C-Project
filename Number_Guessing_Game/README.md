# 🎮 Number Guessing Game

A full-stack Number Guessing Game built using **C, Node.js, HTML, CSS and JavaScript**, featuring randomly generated numbers, interactive hints and an engaging user interface.

🚀 **Live Demo:** [Play Number Guessing Game](https://c-project-3.onrender.com/)

## 📌 About the Project

The Number Guessing Game is a web-based application where users try to guess a randomly generated number between 1 and 100.

The application combines the computational logic of C with the flexibility of Node.js and the interactive experience of modern web technologies.

Instead of implementing all the game logic in JavaScript, this project uses a C program as its game engine, with Node.js acting as the bridge between the frontend and the C backend.

## ✨ Features

- 🎯 Random number generation between 1 and 100.
- 💡 Interactive hints to guide users towards the correct number.
- 🔢 Tracks the number of attempts.
- 👤 Personalized welcome message using the player's name.
- ⚡ Real-time interaction between frontend and backend.
- 🎨 User-friendly web interface.
- 🌐 Deployed and accessible online.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| C | Core game logic and number guessing functionality |
| HTML5 | Website structure |
| CSS3 | Styling and user interface |
| JavaScript | Frontend interactions |
| Node.js | Backend server and communication |
| Docker | Containerization and deployment |
| Render | Cloud hosting |
| Git & GitHub | Version control and source code management |

## 📂 Project Structure

```text
Number_Guessing_Game/
│
├── backend/
│   ├── game.c
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── Dockerfile
└── README.md
```

## ⚙️ How It Works

The application follows a simple frontend-backend architecture:

1. The user enters their name and starts the game.
2. The frontend sends the user's guess to the Node.js backend.
3. Node.js communicates with the C program.
4. The C program processes the guess and determines whether the number is higher, lower or correct.
5. The backend returns the result to the frontend.
6. The interface updates to display the appropriate feedback.

### Application Architecture

```text
          USER
            |
            v
     HTML / CSS / JS
        (Frontend)
            |
            v
       Node.js Server
         (Backend)
            |
            v
         C Program
       (Game Engine)
            |
            v
      Result / Feedback
            |
            v
         FRONTEND
```

## 💻 Run Locally

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- [GCC Compiler](https://gcc.gnu.org/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/CodeCraftedByKK/C-Project.git
```

### 2. Navigate to the Project Directory

```bash
cd C-Project/Number_Guessing_Game
```

### 3. Compile the C Program

For Windows:

```bash
gcc backend/game.c -o backend/game.exe
```

### 4. Start the Node.js Server

```bash
node backend/server.js
```

### 5. Open the Application

Visit:

```text
http://localhost:3000
```

## 🌍 Live Deployment

The application is deployed on **Render** using Docker.

Docker provides a consistent environment to compile and execute the C program alongside the Node.js backend.

🔗 **Live Application:** https://c-project-3.onrender.com/

## 🎯 Learning Outcomes

Building this project helped me understand:

- How C programming logic can be integrated into a web application.
- How frontend and backend components communicate.
- How Node.js can execute external programs.
- How Docker simplifies application deployment.
- How to use Git and GitHub for version control.
- How to deploy a full-stack application on a cloud platform.

## 🔮 Future Improvements

- Add difficulty levels.
- Introduce a leaderboard and score tracking.
- Add multiplayer functionality.
- Improve the user interface and animations.
- Implement persistent game statistics.

## 👨‍💻 Author

**Kanhaiya Kumar Bharadwaj**

B.Tech | Computer Science Engineering

Interested in Software Engineering, Full-Stack Development, Problem Solving and Building Real-World Products.

- GitHub: [@CodeCraftedByKK](https://github.com/CodeCraftedByKK)
- Project Repository: [C-Project](https://github.com/CodeCraftedByKK/C-Project)
- Live Demo: [Number Guessing Game](https://c-project-3.onrender.com/)

---

⭐ If you find this project interesting, consider giving the repository a star!

*Built with curiosity, code and a willingness to learn.*
