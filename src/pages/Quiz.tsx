import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../data/superbaseClient";
import { Question } from "../model/Question";



const Quiz = () => {

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<Question[]>([]);

  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [skipped, setSkipped] = useState<number[]>([]);
  const [reviewMode, setReviewMode] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate();

  
  // Fetch questions from Supabase
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

  const handleAnswer = (answer: string) => {
    if (selectedOption) return;

    // Update answered set and remove from skipped if it exists
    setAnswered((prevAnswered) => {
      const updated = new Set(prevAnswered);
      updated.add(currentQuestionIndex);
      return updated;
    });
    setSkipped((prevSkipped) =>
      prevSkipped.filter((index) => index !== currentQuestionIndex)
    );

    setSelectedOption(answer);

    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!reviewMode && currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      // In review mode or at end
      const unansweredSkipped = skipped.filter((i) => !answered.has(i));

      if (unansweredSkipped.length > 0) {
        setReviewMode(true);
        setCurrentQuestionIndex(unansweredSkipped[0]);
        setSkipped(unansweredSkipped.slice(1)); // remove it from the front
        setSelectedOption(null);
      } else {
        // Done
        navigate("/result", { state: { score, total: questions.length } });
      }
    }
  };

  const handleSkipQuestion = () => {
    if (!answered.has(currentQuestionIndex) && !skipped.includes(currentQuestionIndex)) {
      setSkipped((prev) => [...prev, currentQuestionIndex]);
    }
    handleNextQuestion();
  };

  const q = questions[currentQuestionIndex];

  return (
    <div className="quiz-wrapper">
      <div className="quiz-container">
        <h2>
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>
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

        {selectedOption ? (
          <button onClick={handleNextQuestion}>
            {reviewMode
              ? skipped.length === 0
                ? "Finish Quiz"
                : "Next Skipped"
              : currentQuestionIndex + 1 === questions.length && skipped.length === 0
              ? "Finish Quiz"
              : "Next"}
          </button>
        ) : (
          <button onClick={handleSkipQuestion}>Skip</button>
        )}
      </div>
    </div>
  );
};

export default Quiz;
