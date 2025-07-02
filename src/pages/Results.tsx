import { useLocation, useNavigate } from "react-router-dom";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h2>Quiz Complete 🎉</h2>
        <p>You scored {score} out of {total}</p>
        <button onClick={() => navigate("/")}>Try Again</button>
      </div>
    </div>
  );
};

export default Result;
