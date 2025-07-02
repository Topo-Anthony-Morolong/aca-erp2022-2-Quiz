import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questions } from "../data/questions";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAnswer = (answer: string) => {
    if (selectedOption) return; // Prevent changing answer after selection
    setSelectedOption(answer);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev+ 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      navigate("/result", { state: { score, total: questions.length } });
    }
  };

  const q = questions[currentQuestionIndex];

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{q.question}</p>

        {q.options.map((option) => {
          const isCorrect = option === q.correctAnswer;
          const isSelected = option === selectedOption;

          let className = "option-btn";

          if (selectedOption) {
            if (isCorrect) {
              className += " option-correct";
            } else if (isSelected) {
              className += " option-wrong";
            }
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              disabled={!!selectedOption}
              className={className}
            >
              {option}
            </button>
          );
        })}

        {selectedOption && selectedOption !== q.correctAnswer && (
          <p style={{ color: "green", marginTop: "12px", fontWeight: "bold" }}>
            Correct answer: {q.correctAnswer}
          </p>
        )}

        {selectedOption && (
          <button onClick={handleNextQuestion}>
            {currentQuestionIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
