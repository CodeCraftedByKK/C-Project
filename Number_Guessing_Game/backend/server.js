const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { randomUUID } = require("crypto");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = path.join(__dirname, "..");
const FRONTEND = path.join(ROOT, "frontend");
const GAME_EXE = path.join(
    __dirname,
    process.platform === "win32" ? "game.exe" : "game"
);
const MAX_ATTEMPTS = 7;
const sessions = new Map();

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function runC(args) {
  if (!fs.existsSync(GAME_EXE)) {
    throw new Error("C game executable not found. Compile it first using: gcc backend/game.c -o backend/game.exe");
  }
  const result = spawnSync(GAME_EXE, args, { encoding: "utf8", timeout: 3000 });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error((result.stderr || "C game engine failed.").trim());
  return result.stdout.trim();
}

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
  res.end(JSON.stringify(data));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > 10_000) {
        reject(new Error("Request is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try { resolve(JSON.parse(body || "{}")); }
      catch { reject(new Error("Invalid JSON request.")); }
    });
    req.on("error", reject);
  });
}

function serveStatic(req, res) {
  const pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.resolve(FRONTEND, relative);

  if (!filePath.startsWith(FRONTEND + path.sep) && filePath !== path.join(FRONTEND, "index.html")) {
    res.writeHead(403); return res.end("Forbidden");
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404); return res.end("Not found");
    }
    res.writeHead(200, { "Content-Type": mimeTypes[path.extname(filePath)] || "application/octet-stream" });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/start") {
      const body = await readJson(req);
      const secret = Number(runC(["start"]));
      if (!Number.isInteger(secret) || secret < 1 || secret > 100) throw new Error("C engine returned an invalid number.");
      const sessionId = randomUUID();
      sessions.set(sessionId, { secret, attempts: 0, name: String(body.name || "Player").slice(0, 30), finished: false });
      return sendJson(res, 200, { sessionId, attemptsLeft: MAX_ATTEMPTS });
    }

    if (req.method === "POST" && req.url === "/api/guess") {
      const body = await readJson(req);
      const session = sessions.get(String(body.sessionId || ""));
      const guess = Number(body.guess);

      if (!session) return sendJson(res, 404, { error: "Game session not found. Please start a new game." });
      if (session.finished) return sendJson(res, 400, { error: "This game has ended. Start a new game." });
      if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
        return sendJson(res, 400, { error: "Enter a whole number between 1 and 100." });
      }

      session.attempts++;
      const status = runC(["guess", String(session.secret), String(guess)]);
      const won = status === "won";
      const lost = !won && session.attempts >= MAX_ATTEMPTS;
      if (won || lost) session.finished = true;

      const response = {
        status: won ? "won" : (lost ? "lost" : status),
        attemptsUsed: session.attempts,
        attemptsLeft: Math.max(0, MAX_ATTEMPTS - session.attempts)
      };
      if (lost) response.answer = session.secret;
      return sendJson(res, 200, response);
    }

    if (req.method === "GET") return serveStatic(req, res);
    res.writeHead(405); res.end("Method not allowed");
  } catch (error) {
    sendJson(res, 500, { error: error.message || "Server error." });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Number Guessing Game running at http://localhost:${PORT}`);
  console.log("Press Ctrl+C to stop the server.");
});
