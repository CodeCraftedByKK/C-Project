# Number Guessing Game (C + Node.js + HTML/CSS/JS)

Your C program handles random-number generation and guess evaluation. Node.js provides a small HTTP API and serves the website. The browser UI is built with HTML, CSS and JavaScript.

## Requirements
- Node.js installed
- GCC compiler (for example, MinGW-w64 on Windows)

## 1. Compile the C program (Windows)
Open a terminal in this project folder and run:

```powershell
gcc backend/game.c -o backend/game.exe
```

If `gcc` is not recognized, install/configure GCC (MinGW-w64) and add its `bin` folder to your PATH.

## 2. Start the website

```powershell
node backend/server.js
```

Open http://localhost:3000 in your browser.

## 3. Play
Enter a name, press **Start game**, and make guesses from 1 to 100. You have seven valid attempts. Press **Play again** to start a new round.

## Notes
- The server keeps active game sessions in memory. Restarting the Node server clears them.
- This is a beginner learning project, not a production deployment.
- The C executable is compiled for Windows by the command above. On macOS/Linux, compile it as `backend/game` and update the executable name in `backend/server.js` to match your platform.
