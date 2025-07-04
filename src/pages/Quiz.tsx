import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/superbaseClient";
import { Question } from "../model/Question";

const Quiz = () => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [selectedAnswers, setSelectedAnswers] = useState<{ [index: number]: string }>({});
  const [skipped, setSkipped] = useState<number[]>([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showFinishConfirmModal, setShowFinishConfirmModal] = useState(false);
  const navigate = useNavigate();


  // Fetch from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("Questions_table").select("q_Data");

      if (error || !data || data.length === 0) {
        console.error("Error fetching questions:", error);
        setQuestions([]);
      } else {
        const parsed = typeof data[0].q_Data === "string"
          ? JSON.parse(data[0].q_Data)
          : data[0].q_Data;
        setQuestions(parsed);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (questions.length === 0) return <div>No questions found.</div>;

  const q = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex] || null;

  const handleAnswer = (answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));

    // Remove from skipped if previously skipped
    setSkipped((prev) => prev.filter((i) => i !== currentQuestionIndex));
  };

  const handleSkip = () => {
    // Only add to skipped if no answer is selected AND it's not already in skipped
    if (!selectedAnswers[currentQuestionIndex] && !skipped.includes(currentQuestionIndex)) {
      setSkipped((prev) => [...prev, currentQuestionIndex]);
    }
    handleNext();
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    // Calculate all unanswered questions, regardless of whether 'skip' was pressed
    const unansweredQuestions = questions
      .map((_, i) => i)
      .filter((i) => !selectedAnswers[i]); // Simplified filter

    if (unansweredQuestions.length > 0) {
      setShowFinishConfirmModal(true); // Open the modal
    } else {
      // If no questions are unanswered, proceed directly
      proceedToFinish();
    }
  };

  // function to encapsulate the actual finish logic
  const proceedToFinish = () => {
    const score = questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? total + 1 : total;
    }, 0);

    // Recalculate unanswered questions for the final result state
    const unansweredQuestions = questions
      .map((_, i) => i)
      .filter((i) => !selectedAnswers[i]); // Simplified filter

    navigate("/result", {
      state: {
        score,
        total: questions.length,
        skipped: unansweredQuestions, // Pass the list of all unanswered questions
        questions: questions,           // Pass the entire questions array
        selectedAnswers: selectedAnswers, // Pass the user's selected answers
      },
    });
    setShowFinishConfirmModal(false); // Close modal if it was open
  };

  const handleGoToSkipped = (questionIndex: number) => {
    setCurrentQuestionIndex(questionIndex); // Navigate to the skipped question
    setShowFinishConfirmModal(false); // Close the modal
  };

  const handleCancelFinish = () => {
    setShowFinishConfirmModal(false); // Simply close the modal
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h2>Question {currentQuestionIndex + 1} of {questions.length}</h2>
        <p>{q.question}</p>

        {q.options.map((option) => {
          const isSelected = selectedOption === option;
          const className = `option-btn ${isSelected ? "selected" : ""}`;
          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={className}
            >
              {option}
            </button>
          );
        })}

        <div style={{ marginTop: "20px" }}>
          {currentQuestionIndex > 0 && (
            <button onClick={handleBack} style={{ marginRight: "10px" }}>
              Back
            </button>
          )}

          {currentQuestionIndex < questions.length - 1 ? (
            <button
              onClick={handleNext}
              disabled={!selectedOption} // Still disable 'Next' if no answer selected
              style={{ marginRight: "10px" }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={false} // Allow finishing even if the last question is not answered
              style={{ marginRight: "10px" }}
            >
              Finish Quiz
            </button>
          )}

          {/* Show skip button if no answer is selected for the current question */}
          {!selectedOption && currentQuestionIndex < questions.length - 1 &&(
            <button onClick={handleSkip}>
              Skip
            </button>
          )}
        </div>
      </div>

      {showFinishConfirmModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>You have unanswered questions!</h3> {/* Changed text for clarity */}
            <p>Are you sure you want to finish the quiz?</p>
            <div className="skipped-list">
              {questions
                .map((_, i) => i)
                .filter((i) => !selectedAnswers[i]) // Use the simplified filter here too
                .map((unansweredIndex) => (
                  <p key={unansweredIndex}>
                    Question {unansweredIndex + 1}: "{questions[unansweredIndex].question.substring(0, 50)}..."
                    <button onClick={() => handleGoToSkipped(unansweredIndex)}>Review</button>
                  </p>
                ))}
            </div>
            <div className="modal-actions">
              <button onClick={handleCancelFinish} className="modal-cancel-btn">Go Back & Review</button>
              <button onClick={proceedToFinish} className="modal-confirm-btn">Confirm Finish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;