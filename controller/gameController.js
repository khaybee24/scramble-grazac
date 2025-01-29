const Words = require('../model/wordSchema');
const shuffleWord = require('../helper/scramble');

const gameSessions = {}; // Store session data in memory

const TIME_LIMIT = 60 * 1000; // 30 seconds
const SCORE_INCREMENT = 10; // Default score per correct answer

// Function to Start Timer
const startTimer = (username) => {
    gameSessions[username].startTime = Date.now();
    gameSessions[username].endTime = gameSessions[username].startTime + TIME_LIMIT;
};

// Route to Get a Random Scrambled Word
const scramble = async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ message: "Username is required." });
    }

    try {
        const words = await Words.find({});
        if (words.length === 0) {
            return res.status(500).json({ message: "No words found in the database." });
        }

        const randomWordObj = words[Math.floor(Math.random() * words.length)];
        if (!randomWordObj || !randomWordObj.word) {
            return res.status(500).json({ message: "Invalid word structure in database." });
        }

        const randomWord = randomWordObj.word.trim().toLowerCase();
        let scrambled = shuffleWord(randomWord);

        // Ensure scrambled word is different from original
        if (scrambled === randomWord) {
            scrambled = shuffleWord(randomWord);
        }

        // Reset session for new game
        gameSessions[username] = {
            score: 0, // Reset score for a new game
            word: randomWord,
            scrambled: scrambled,
            startTime: Date.now(),
            endTime: Date.now() + TIME_LIMIT
        };

        return res.status(200).json({
            message: "Rearrange the word",
            scrambled,
            timeLimit: TIME_LIMIT / 1000,
            score: gameSessions[username].score
        });

    } catch (error) {
        console.error("Error in scramble function:", error);
        return res.status(500).json({ message: "Error fetching word from database", error });
    }
};

// Route to Check Word Guess
const wordGuess = async (req, res) => {
    const { username, guess } = req.body;

    if (!username || !guess) {
        return res.status(400).json({ message: "Username and guess are required." });
    }

    if (!gameSessions[username]) {
        return res.status(400).json({ message: "No active game session. Start a new game first." });
    }

    const session = gameSessions[username];
    const currentTime = Date.now();

    // If time is up, reset everything
    if (currentTime > session.endTime) {
        delete gameSessions[username]; // Clear session completely
        return res.status(400).json({ correct: false, message: "Time's up! Start a new game.", score: 0 });
    }

    // Check if the guess is correct
    if (guess.toLowerCase() === session.word) {
        session.score += SCORE_INCREMENT; // Increase score
        
        // Fetch a new scrambled word after correct guess
        try {
            const words = await Words.find({});
            if (words.length === 0) {
                return res.status(500).json({ message: "No words found in the database." });
            }

            const randomWordObj = words[Math.floor(Math.random() * words.length)];
            if (!randomWordObj || !randomWordObj.word) {
                return res.status(500).json({ message: "Invalid word structure in database." });
            }

            const randomWord = randomWordObj.word.trim().toLowerCase();
            let scrambled = shuffleWord(randomWord);

            // Ensure scrambled word is different from original
            if (scrambled === randomWord) {
                scrambled = shuffleWord(randomWord);
            }

            // Update session with new word
            gameSessions[username].word = randomWord;
            gameSessions[username].scrambled = scrambled;

            return res.json({
                correct: true,
                message: "Correct! 🎉",
                score: session.score,
                scrambled: scrambled, // Send the new scrambled word
                timeLimit: TIME_LIMIT / 1000 // Send the time limit again
            });

        } catch (error) {
            console.error("Error fetching new word:", error);
            return res.status(500).json({ message: "Error fetching new word", error });
        }

    } else {
        session.score = 0; // Reset score on incorrect guess
        return res.json({ correct: false, message: "Incorrect! Try again.", score: session.score });
    }
};

module.exports = { scramble, wordGuess };
