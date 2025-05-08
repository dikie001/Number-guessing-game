import { useState, useEffect } from "react";

type GameState = "start" | "playing" | "won" | "lost";

export default function NumberGuessingGame() {
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(7);
  const [gameState, setGameState] = useState<GameState>("start");
  const [guessHistory, setGuessHistory] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");

  // Generate a new secret number
  const generateSecretNumber = () => {
    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
  };

  // Initialize or restart the game
  const startGame = () => {
    const newSecretNumber = generateSecretNumber();
    setSecretNumber(newSecretNumber);
    setGuess("");
    setMessage(
      `I'm thinking of a number between ${minRange} and ${maxRange}. You have ${maxAttempts} attempts.`
    );
    setAttempts(0);
    setGameState("playing");
    setGuessHistory([]);
    setFeedback("");
  };

  // Handle guess submission
  const handleGuess = () => {
    const guessNumber = parseInt(guess);

    if (isNaN(guessNumber)) {
      setFeedback("Please enter a valid number.");
      return;
    }

    if (guessNumber < minRange || guessNumber > maxRange) {
      setFeedback(`Please enter a number between ${minRange} and ${maxRange}.`);
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, guessNumber]);

    // Check guess
    if (guessNumber === secretNumber) {
      setMessage(
        `Congratulations! You guessed the number ${secretNumber} in ${newAttempts} attempts!`
      );
      setGameState("won");
      setFeedback("");
    } else {
      const hint = guessNumber < secretNumber ? "higher" : "lower";
      const attemptsLeft = maxAttempts - newAttempts;

      if (attemptsLeft <= 0) {
        setMessage(`Game over! The number was ${secretNumber}.`);
        setGameState("lost");
        setFeedback("");
      } else {
        setFeedback(
          `Try ${hint}! ${attemptsLeft} attempt${
            attemptsLeft !== 1 ? "s" : ""
          } left.`
        );
        setGuess("");
      }
    }
  };

  // Update ranges
  const updateRanges = () => {
    if (minRange >= maxRange) {
      setFeedback("Minimum must be less than maximum.");
      return;
    }
    startGame();
  };

  // Initialize game
  useEffect(() => {
    startGame();
  }, []);

  return (
    <div className="flex flex-col items-center w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="mb-4 text-3xl font-bold text-center text-indigo-600">
        Number Guessing Game
      </h1>

      {gameState === "start" || gameState === "playing" ? (
        <>
          <div className="w-full mb-6 p-4 bg-indigo-50 rounded-lg">
            <p className="text-center text-gray-800">{message}</p>
          </div>

          <div className="w-full mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Your Guess:
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder={`${minRange}-${maxRange}`}
                disabled={gameState !== "playing"}
              />
              <button
                onClick={handleGuess}
                disabled={gameState !== "playing" || !guess}
                className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
              >
                Guess
              </button>
            </div>
            {feedback && (
              <p className="mt-2 text-sm text-indigo-600">{feedback}</p>
            )}
          </div>

          {guessHistory.length > 0 && (
            <div className="w-full mb-6">
              <h3 className="mb-2 text-sm font-medium text-gray-700">
                Previous Guesses:
              </h3>
              <div className="flex flex-wrap gap-2">
                {guessHistory.map((g, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-sm bg-gray-100 rounded-md"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="w-full mb-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(attempts / maxAttempts) * 100}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-gray-600 text-center">
              {attempts}/{maxAttempts} attempts used
            </p>
          </div>
        </>
      ) : (
        <div
          className="w-full mb-6 p-4 rounded-lg text-center"
          className={gameState === "won" ? "bg-green-50" : "bg-red-50"}
        >
          <p
            className={gameState === "won" ? "text-green-700" : "text-red-700"}
          >
            {message}
          </p>
        </div>
      )}

      {(gameState === "won" || gameState === "lost") && (
        <button
          onClick={startGame}
          className="px-4 py-2 mb-6 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Play Again
        </button>
      )}

      <div className="w-full p-4 bg-gray-50 rounded-lg">
        <h3 className="mb-2 text-sm font-medium text-gray-700">
          Game Settings:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-xs text-gray-600">
              Min Range:
            </label>
            <input
              type="number"
              value={minRange}
              onChange={(e) => setMinRange(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-600">
              Max Range:
            </label>
            <input
              type="number"
              value={maxRange}
              onChange={(e) => setMaxRange(parseInt(e.target.value) || 100)}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block mb-1 text-xs text-gray-600">
              Max Attempts:
            </label>
            <input
              type="number"
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(parseInt(e.target.value) || 10)}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={updateRanges}
              className="w-full px-3 py-1 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
