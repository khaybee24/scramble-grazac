document.addEventListener("DOMContentLoaded", () => {
    const scrambleBtn = document.getElementById("scrambleBtn");
    const submitGuessBtn = document.getElementById("submitGuessBtn");
    const scrambledWordDisplay = document.getElementById("scrambledWord");
    const guessResultDisplay = document.getElementById("guessResult");
    const usernameInput = document.getElementById("username");
    const userGuessInput = document.getElementById("userGuess");
    const timeLeftDisplay = document.getElementById("timeLeft");
    const userScoreDisplay = document.getElementById("userScore");

    let countdownInterval;
    let gameActive = false; // Track if game is active
    let timeLimit = 60; // Default time limit
    let currentUsername = "";

    // Fetch a scrambled word and start a new session
    scrambleBtn.addEventListener("click", async () => {
        const username = usernameInput.value.trim();
        if (!username) {
            scrambledWordDisplay.textContent = "Please enter a username.";
            return;
        }

        currentUsername = username; // Set the current username for the game

        try {
            const response = await fetch(`http://localhost:4900/api/v1/game/scramble?username=${username}`);
            const data = await response.json();

            if (response.ok) {
                scrambledWordDisplay.textContent = `Scrambled Word: ${data.scrambled}`;
                userScoreDisplay.textContent = `Score: ${data.score}`; // Reset UI score
                timeLimit = data.timeLimit; // Set time limit from the server
                startCountdown(timeLimit); // Start the countdown timer
                submitGuessBtn.disabled = false; // Enable the submit button
                gameActive = true; // Set game to active
            } else {
                scrambledWordDisplay.textContent = `Error: ${data.message}`;
            }
        } catch (error) {
            console.error("Error fetching scrambled word:", error);
            scrambledWordDisplay.textContent = "Failed to fetch scrambled word.";
        }
    });

    // Submit a guess
    submitGuessBtn.addEventListener("click", async () => {
        if (!gameActive) {
            guessResultDisplay.textContent = "Game over! Click 'Get Scrambled Word' to start a new game.";
            return;
        }

        const guess = userGuessInput.value.trim();

        if (!guess) {
            guessResultDisplay.textContent = "Please enter a guess.";
            return;
        }

        try {
            const response = await fetch("http://localhost:4900/api/v1/game/guess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: currentUsername, guess })
            });

            const data = await response.json();
            guessResultDisplay.textContent = data.message;
            userScoreDisplay.textContent = `Score: ${data.score}`; // Update user score

            if (data.correct) {
                guessResultDisplay.classList.remove("incorrect");
                guessResultDisplay.classList.add("correct");

                // If the guess was correct, fetch a new scrambled word
                scrambledWordDisplay.textContent = `Scrambled Word: ${data.scrambled}`;
            } else {
                guessResultDisplay.classList.remove("correct");
                guessResultDisplay.classList.add("incorrect");
            }
        } catch (error) {
            console.error("Error submitting guess:", error);
            guessResultDisplay.textContent = "Failed to submit guess.";
        }
    });

    // Countdown Timer
    function startCountdown(timeLimit) {
        clearInterval(countdownInterval); // Clear previous timer
        let timeLeft = timeLimit;
        timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;

        countdownInterval = setInterval(() => {
            timeLeft--;
            timeLeftDisplay.textContent = `Time Left: ${timeLeft}s`;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                gameActive = false; // End the game
                submitGuessBtn.disabled = true; // Disable the submit button
                guessResultDisplay.textContent = "Time's up! Start a new game.";
                userScoreDisplay.textContent = "Score: 0"; // Reset score
            }
        }, 1000);
    }
});
