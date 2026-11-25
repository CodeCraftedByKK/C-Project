const welcomePanel = document.getElementById("welcome-panel");
const gamePanel = document.getElementById("game-panel");
const resultPanel = document.getElementById("result-panel");
const nameInput = document.getElementById("player-name");
const startButton = document.getElementById("start-btn");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const attemptsLeft = document.getElementById("attempts-left");
const meterFill = document.getElementById("meter-fill");

let sessionId = null;
let playerName = "Player";
let busy = false;

async function api(path, data) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || "Something went wrong.");
  return result;
}

function setBusy(value) {
  busy = value;
  startButton.disabled = value;
  guessInput.disabled = value;
}

async function startGame() {
  playerName = nameInput.value.trim() || "Player";
  setBusy(true);
  try {
    const result = await api("/api/start", { name: playerName });
    sessionId = result.sessionId;
    document.getElementById("player-display").textContent = playerName;
    attemptsLeft.textContent = result.attemptsLeft;
    meterFill.style.width = "0%";
    feedback.textContent = "Your first guess could be the one.";
    welcomePanel.classList.add("hidden");
    resultPanel.classList.add("hidden");
    gamePanel.classList.remove("hidden");
    guessInput.value = "";
    guessInput.disabled = false;
    guessInput.focus();
  } catch (error) {
    alert(error.message);
  } finally {
    setBusy(false);
  }
}

function showResult(won, message) {
  gamePanel.classList.add("hidden");
  resultPanel.classList.remove("hidden");
  document.getElementById("result-icon").textContent = won ? "★" : "↗";
  document.getElementById("result-title").textContent = won ? "You got it!" : "Good try!";
  document.getElementById("result-message").textContent = message;
}

startButton.addEventListener("click", startGame);
nameInput.addEventListener("keydown", event => {
  if (event.key === "Enter") startGame();
});

guessForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (busy || !sessionId) return;

  const guess = Number(guessInput.value);
  if (!Number.isInteger(guess) || guess < 1 || guess > 100) {
    feedback.textContent = "Please enter a whole number from 1 to 100.";
    return;
  }

  setBusy(true);
  try {
    const result = await api("/api/guess", { sessionId, guess });
    attemptsLeft.textContent = result.attemptsLeft;
    meterFill.style.width = `${(result.attemptsUsed / 7) * 100}%`;

    if (result.status === "low") {
      feedback.textContent = "Too low — try a larger number.";
    } else if (result.status === "high") {
      feedback.textContent = "Too high — try a smaller number.";
    } else if (result.status === "won") {
      showResult(true, `Congratulations, ${playerName}! You guessed the secret number in ${result.attemptsUsed} attempt${result.attemptsUsed === 1 ? "" : "s"}.`);
    } else if (result.status === "lost") {
      showResult(false, `You used all seven attempts. The secret number was ${result.answer}.`);
    }
    guessInput.value = "";
    if (result.status !== "won" && result.status !== "lost") guessInput.focus();
  } catch (error) {
    feedback.textContent = error.message;
  } finally {
    setBusy(false);
  }
});

document.getElementById("restart-btn").addEventListener("click", startGame);
