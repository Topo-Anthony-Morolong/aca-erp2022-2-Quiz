// Result.tsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import { useLocation, useNavigate } from 'react-router-dom';
import { Question } from '../model/Question'; // Assuming your Question model path is correct

// Define the shape of the state passed from Quiz.tsx
interface QuizResultState {
  score: number;
  total: number;
  skipped: number[]; // Indices of unanswered questions
  questions: Question[]; // The full list of questions
  selectedAnswers: { [index: number]: string }; // User's selected answers for each question
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Safely destructure state, providing defaults for robustness
  const {
    score = 0,
    total = 0,
    skipped = [],
    questions = [], // Default to empty array if not passed
    selectedAnswers = {}, // Default to empty object if not passed
  } = (location.state as QuizResultState) || {}; // Cast to interface type

  // State for the Congrats Modal
  const [showCongratsModal, setShowCongratsModal] = useState(false);

  // Calculate Percentage
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= 70; // Define passing threshold

  // Handlers for navigation buttons
  const handleTryAgain = () => {
    navigate('/'); // Navigate back to the home/start quiz page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate back to the home page
  };

  // Effect to show Congrats Modal if passed, immediately after render
  useEffect(() => {
    if (passed) {
      setShowCongratsModal(true);
    }
  }, [passed]); // Re-run if 'passed' status changes (though it won't after initial load)


  // Render loading or no data if essential data is missing
  if (questions.length === 0 && total > 0) {
      return (
          <div className="results-wrapper">
              <div className="results-container">
                  <h2>Loading Results...</h2>
                  <p>Attempting to retrieve quiz details.</p>
              </div>
          </div>
      );
  }
  if (total === 0) {
      return (
          <div className="results-wrapper">
              <div className="results-container">
                  <h2>No Quiz Data Found</h2>
                  <p>It seems like you haven't completed a quiz yet or there was an issue.</p>
                  <button onClick={handleGoHome}>Go to Home</button>
              </div>
          </div>
      );
  }


  return (
    <div className="results-wrapper">
      <div className="results-container">
        <h2>Quiz Complete 🎉</h2>
        <p>You answered {score} out of {total} questions correctly.</p>
        <p>Your score: <strong>{percentage}%</strong></p>

        {/* Conditional Feedback */}
        {passed ? (
          <p className="result-status success">Congratulations! You passed!</p>
        ) : (
          <>
            <p className="result-status failure">Keep practicing! You can do better.</p>
            <button onClick={handleTryAgain} className="try-again-btn">Try Again</button>
          </>
        )}

        {/* Show detailed review if not 100% */}
        {percentage < 100 && (
            <div className="review-section">
                <h3>Review Your Answers:</h3>

                {/* Display Skipped Questions */}
                {skipped.length > 0 && (
                  <div className="skipped-questions-section">
                    <h4>Unanswered Questions:</h4>
                    <ul>
                      {skipped.map((qIndex) => (
                        <li key={qIndex}>
                          Question {qIndex + 1}: {questions[qIndex]?.question || 'Question text not available'}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Detailed Review of Answered Questions */}
                <div className="answered-review-section">
                    <h4>Answered Questions:</h4>
                    {questions.map((q, index) => {
                        const userAnswer = selectedAnswers[index];
                        const isCorrect = userAnswer === q.correctAnswer;
                        const hasUserAnswered = selectedAnswers.hasOwnProperty(index); // Check if user answered this question

                        // Only show review for questions the user actually answered
                        if (!hasUserAnswered) return null;

                        return (
                            <div key={index} className={`question-review-item ${isCorrect ? 'correct-answer-review' : 'wrong-answer-review'}`}>
                                <h5>Question {index + 1}: {q.question}</h5>
                                <div className="options-review">
                                    {q.options.map((option) => {
                                        const isUserChoice = userAnswer === option;
                                        const isCorrectAnswer = q.correctAnswer === option;

                                        let optionClassName = "review-option";
                                        if (isUserChoice && isCorrect) {
                                            optionClassName += " user-correct"; // User's correct answer
                                        } else if (isUserChoice && !isCorrect) {
                                            optionClassName += " user-wrong"; // User's wrong answer
                                        } else if (isCorrectAnswer && !isUserChoice) { // Highlight correct answer ONLY if user chose wrong or didn't choose it
                                            optionClassName += " correct-highlight";
                                        }

                                        return (
                                            <p key={option} className={optionClassName}>
                                                {option}
                                                {isUserChoice && <span className="indicator user-choice-indicator"> (Your Answer)</span>}
                                                {isCorrectAnswer && <span className="indicator correct-answer-indicator"> (Correct)</span>}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* Go Home button always visible */}
        <button onClick={handleGoHome} className="go-home-btn">Go to Home</button>
      </div>

      {/* Congrats Modal */}
      {showCongratsModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You passed the quiz with a score of <strong>{percentage}%</strong>!</p>
            <button onClick={() => { setShowCongratsModal(false); navigate('/'); }} className="modal-confirm-btn">Awesome!</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;