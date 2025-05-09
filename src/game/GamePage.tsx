import { useEffect, useState } from "react";

const GamePage: React.FC = () => {
  const [guess, setGuess] = useState<number | string>("");
  const [startModal, setStartModal] = useState<boolean>(false);
  const [min, setMin] = useState<number>(1);
  const [m, setM] = useState<number>();
  const [max, setMax] = useState<number>(100);
  const [mx, setMx] = useState<number>();
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(5);
  const [inputNum, setInputNum] = useState<number>();
  const [feedBack, setFeedBack] = useState("");
  const [type, setType] = useState<number>();
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setStartModal(true);
    setIsCorrect(false);
    setIsFailed(false);
  }, []);

  useEffect(() => {
    mainFunction();
  }, []);
  useEffect(() => {
    gameSettings();
  }, [max]);

  //start game
  const startGame = () => {
    setFeedBack("");
    setIsFailed(false);
    setAttempts(5);
    setStartModal(false);
    setShowNotif(true);
    setTimeout(() => {
      setShowNotif(false);
    }, 5000);
    mainFunction();
  };

  function failed() {
    setIsFailed(true);
  }

  //guess function
  const guessNum = () => {
    setAttempts((prev) => prev - 1);
    if (attempts === 1) {
      failed();
    }
    if (!guess) {
      setType(5);

      setFeedBack("Input can not be empty!");
    } else if (typeof guess === "number" && guess > max) {
      setType(5);
      setFeedBack(`The guess can not be greater than ${max}`);
    } else if (typeof guess === "number" && guess < min) {
      setType(5);
      setFeedBack(`The guess can not be less than ${min}`);
    } else if (typeof guess === "number" && guess > inputNum!) {
      setType(4);
      setFeedBack("Thats too high, try again");
    } else if (typeof guess === "number" && guess < inputNum!) {
      setType(0);
      setFeedBack("Thats too low, try again.");
    } else if (inputNum === guess) {
      setType(1);
      setFeedBack("That is the correct!");
      setTimeout(() => {
        setFeedBack("");
        correct();
      }, 1000);
    }
    setTimeout(() => {
      setGuess("");
    }, 900);
  };

  const correct = () => {
    setIsCorrect(true);
  };

  const mainFunction = () => {
    setIsCorrect(false);
    setIsFailed(false);
    setFeedBack("");

    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(num);
    setInputNum(num);
  };

  //game settings
  const gameSettings = () => {
    setMin(m ?? 1);
    setMax(mx ?? 100);
    mainFunction();
  };

  const minRange = (e: any) => {
    setM(Number(e.target.value));
  };
  const maxRange = (e: any) => {
    setMx(Number(e.target.value));
  };

  function exit() {
    setStartModal(true);
    setIsCorrect(false);
  }

  return (
    <div
      className={` min-h-screen   bg-gradient-to-tl from-purple-700 via-blue-700 to-violet-600 flex justify-center items-center`}
    >
      {/* Failed modal */}
      {isFailed && (
        <div className="fixed z-51 min-w-100 p-5 justify-center items-center-safe flex flex-col rounded-md  bg-gradient-to-bl from-blue-700 via-fuchsia-700 to-purple-700 text-lg text-white">
          <h2 className="text-xl font-bold">You have Failed Terribly!</h2>

          <div className="flex justify-between w-full mt-5 px-5">
            <button
              onClick={exit}
              className="bg-red-600 w-30 py-2 px-4 rounded-md shadow-md  font-semibold mt-2 transition-transform duration-300 ease-in-out active:scale-95  animate-pulse "
            >
              Exit
            </button>
            <button
              onClick={() => mainFunction()}
              className="bg-blue-600 w-30 py-2 px-4 rounded-md shadow-md  font-semibold mt-2 transition-transform duration-300 ease-in-out active:scale-95  animate-pulse "
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      {/* Win modal */}
      {isCorrect && (
        <div className="fixed z-51 min-w-100 p-5 justify-center items-center-safe flex flex-col rounded-md  bg-gradient-to-bl from-blue-700 via-fuchsia-700 to-purple-700 text-lg text-white">
          <h2 className="text-xl font-bold">You have guessed correctly!</h2>

          <div className="flex justify-between w-full mt-5 px-5">
            <button
              onClick={exit}
              className="bg-red-600 w-30 py-2 px-4 rounded-md shadow-md  font-semibold mt-2 transition-transform duration-300 ease-in-out active:scale-95  animate-pulse "
            >
              Exit
            </button>
            <button
              onClick={() => mainFunction()}
              className="bg-blue-600 w-30 py-2 px-4 rounded-md shadow-md  font-semibold mt-2 transition-transform duration-300 ease-in-out active:scale-95  animate-pulse "
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      {/* Main */}
      <div
        className={`
        ${isCorrect && "blur-lg bg-black/70"} 
        ${isFailed && "blur-lg bg-black/70"} 
        ${startModal && " blur-sm bg-black/60"}
         bg-black/30 m-auto max-w-120 w-full  max-md:p-3 relative max-sm:h-dvh sm:h-150 rounded-md shadow-md shadow-black`}
      >
        {/* Results Notif */}
        <div
          className={`absolute top-55 right-7 text-white ${
            type === 5 && "bg-red-600"
          } ${type === 1 && "bg-green-600"} ${type === 4 && "bg-pink-800"} ${
            type === 0 && "bg-amber-600"
          } ${
            feedBack ? "opacity-100" : "opacity-0"
          } transition-all duration-700 ease-in-out w-60 z-50 font-semibold  pl-4 p-2 rounded-md shadow-md shadow-black/50 `}
        >
          <p>{feedBack}</p>
        </div>

        <h1 className="text-center max-md:text-3xl md:text-4xl text-white font-bold mt-7 mb-4 ">
          Number Guessing Game
        </h1>
        <div
          className={`${
            showNotif ? "bg-teal-600" : "bg-fuchsia-800"
          } transition-all duration-1000 ease-linear text-fuchsia-200 font-semibold max-w-105 w-full px-5 py-2 m-auto rounded-md mt-2 shadow-md shadow-black/30 `}
        >
          {`${
            showNotif
              ? `The default Min Range and Max Range value are used, Change the game
          settings to set custom`
              : `I am thinking of a number between ${min} and ${max}. You have ${attempts} attempts left.`
          } `}
        </div>

        <div className="flex justify-center mt-5 gap-3 max-w-105 m-auto">
          <input
            onChange={(e) => setGuess(Number(e.target.value))}
            placeholder="1-100"
            type="number"
            value={guess}
            className="bg-black/20 w-full max-w-105 h-10 outline-0 focus:ring-2 px-3 text-white text-lg ring-cyan-400  shadow-md shadow-black/30 rounded-md "
          />
          <button
            onClick={guessNum}
            className="bg-blue-500 px-3 rounded-md text-white shadow-md active:ring-2 ring-cyan-300 font-semibold"
          >
            Guess
          </button>

          {/* Game settings */}
        </div>
        <div className="max-w-xl mx-auto mt-4 px-4">
          <h2 className="text-gray-300 font-bold text-xl mb-2">
            Game settings:
          </h2>

          <div className="flex flex-col md:flex-row md:justify-between max-w-105 md:items-end gap-4">
            {/* Min Range */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold text-gray-400 mb-1">
                Min Range:
              </label>
              <input
                onChange={(e) => minRange(e)}
                type="number"
                placeholder="1"
                className="bg-black/20 h-10 outline-0 focus:ring-2 px-3 text-white text-lg ring-cyan-400 shadow-md shadow-black/30 rounded-md"
              />
            </div>

            {/* Max Range */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold text-gray-400 mb-1">
                Max Range:
              </label>
              <input
                onChange={(e) => maxRange(e)}
                type="number"
                placeholder="100"
                className="bg-black/20 h-10 outline-0 focus:ring-2 px-3 text-white text-lg ring-cyan-400 shadow-md shadow-black/30 rounded-md"
              />
            </div>

            {/* Max Attempts */}
            <div className="flex flex-col w-full md:w-1/3">
              <label className="text-sm font-semibold text-gray-400 mb-1">
                Max Attempts:
              </label>
              <input
                onChange={(e) => setAttempts(Number(e.target.value))}
                type="number"
                placeholder="5"
                className="bg-black/20 h-10 outline-0 focus:ring-2 px-3 text-white text-lg ring-cyan-400 shadow-md shadow-black/30 rounded-md"
              />
            </div>
          </div>
          <button
            onClick={gameSettings}
            className="bg-green-500 mb-3 animate-pulse active:scale-95 transition-all duration-300 rounded-md py-2 px-4 text-lg shadow-md flex justify-center mx-auto mt-6 font-bold shadow-black/40 active:ring-2 ring-blue-400"
          >
            Set Range
          </button>
        </div>
      </div>
      {/* Start Modal */}
      {startModal && (
        <div className="fixed shadow-md shadow-green-500 backdrop-blur-lg  bg-black/30 max-w-100 w-full py-2 text-white font-semibold px-4 rounded-md">
          <h1 className="text-center font-extrabold mt-3 text-2xl">
            Are you Ready to Rumble{" "}
          </h1>
          <button
            onClick={startGame}
            className="bg-green-500  mb-3 h-22 w-22 animate-pulse active:scale-95 transition-all duration-300 rounded-full text-2xl shadow-md items-center flex justify-center m-auto mt-2 font-bold shadow-black/40 active:ring-2 ring-cyan-300 "
          >
            Let's Go
          </button>
        </div>
      )}
    </div>
  );
};

export default GamePage;
