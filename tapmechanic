import React, { useState, useEffect } from "react";

const TapGame = () => {
  const [score, setScore] = useState(0);
  const [tapCount, setTapCount] = useState(0);

  // Handle user tap
  const handleTap = () => {
    setTapCount(tapCount + 1);
    setScore(score + 10); // Earn 10 points per tap
  };

  useEffect(() => {
    // Update user points in backend or via Telegram bot
    // fetch("/api/updateScore", { method: "POST", body: JSON.stringify({ score }) });
  }, [tapCount]);

  return (
    <div className="game-container">
      <h1>Tap to Earn Game</h1>
      <button className="tap-button" onClick={handleTap}>
        Tap Here!
      </button>
      <p>Score: {score}</p>
    </div>
  );
};

export default TapGame;
