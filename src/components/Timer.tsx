import { useEffect, useState } from "react";

function Timer({ dispatch }) {
  const [secondsRemaining, setSecondsRemaining] = useState(3);

  const mins = Math.floor(secondsRemaining / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  useEffect(() => {
    const id = setInterval(() => {
      if (secondsRemaining === 1) dispatch({ type: "finish" });
      else setSecondsRemaining((curr) => curr - 1);
    }, 1000);

    // remember: cleanup function runs when component UNMOUNTS.
    return () => clearInterval(id);
  }, [dispatch, secondsRemaining]);

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
