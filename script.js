// Array of secret words
const words = ["apple", "banana", "orange", "grape", "peach", "kiwi", "melon"];
let secretWord = words[Math.floor(Math.random() * words.length)];
let maxAttempts = 5;
let attemptsLeft = maxAttempts;

// Get HTML elements
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const messageDiv = document.getElementById("message");

// Log the secret word for testing
console.log("Secret word:", secretWord);

// Function to handle guess
function handleGuess() {
  let userGuess = guessInput.value.trim().toLowerCase();

  if (userGuess === "") {
    attemptsLeft--;
    updateMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
  } else if (userGuess === secretWord) {
    updateMessage("🎉 Congratulations! You guessed the secret word!", true);
    endGame(true);
  } else {
    attemptsLeft--;
    if (attemptsLeft > 0) {
      updateMessage(`Incorrect guess. You have ${attemptsLeft} attempts left. Try again!`);
    } else {
      updateMessage(`❌ Game over! The secret word was '${secretWord}'.`, false);
      endGame(false);
    }
  }

  guessInput.value = "";
}

// Function to update the message
function updateMessage(msg, win = null) {
  messageDiv.textContent = msg;
  if (win === true) {
    document.body.className = "win";
  } else if (win === false) {
    document.body.className = "lose";
  }
}

// Function to end the game
function endGame(isWin) {
  submitBtn.disabled = true;
  guessInput.disabled = true;
  restartBtn.style.display = "inline-block";
}

// Function to restart the game
function restartGame() {
  // Reset everything
  secretWord = words[Math.floor(Math.random() * words.length)];
  attemptsLeft = maxAttempts;
  guessInput.disabled = false;
  submitBtn.disabled = false;
  guessInput.value = "";
  messageDiv.textContent = "";
  restartBtn.style.display = "none";
  document.body.className = "";

  console.log("Secret word:", secretWord);
}

// Event listeners
submitBtn.addEventListener("click", handleGuess);
restartBtn.addEventListener("click", restartGame);

// Allow pressing "Enter" key to submit
guessInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    handleGuess();
  }
});
