import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/quiz");
  };

  return (
    <div className="home-wrapper">
      <div className="home-container">
        <h1>Welcome to My fist ACA Quiz App</h1>
        <p>Test your knowledge of Git commands used in real-world development!</p>
        <button onClick={handleStart}>Start Quiz</button>
      </div>
    </div>
  );
};

export default Home;
