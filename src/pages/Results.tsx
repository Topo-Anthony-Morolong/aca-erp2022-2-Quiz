const Result = () => {
  const score = localStorage.getItem('quizScore') || 0;

  return (
    <div>
      <h2>Your Score: {score}</h2>
      <button onClick={() => window.location.href = '/'}>Try Again</button>
    </div>
  );
};

export default Result;
