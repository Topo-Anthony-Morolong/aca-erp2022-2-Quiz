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
    const score = questions.reduce((total, question, index) => {
      return selectedAnswers[index] === question.correctAnswer ? total + 1 : total;
    }, 0);

    const remainingSkipped = questions
      .map((_, i) => i)
      .filter((i) => !selectedAnswers[i]);

    navigate("/result", {
      state: {
        score,
        total: questions.length,
        skipped: remainingSkipped,
      },
    });
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
              disabled={!selectedOption}
              style={{ marginRight: "10px" }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleFinish}
              disabled={!selectedOption}
              style={{ marginRight: "10px" }}
            >
              Finish Quiz
            </button>
          )}

          {!selectedOption && (
            <button onClick={handleSkip}>
              Skip
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
