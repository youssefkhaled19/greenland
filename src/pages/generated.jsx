import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";

export default function Generate() {
  const num = 20;
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const location = useLocation();
  const base64File = location.state?.base64File;

  // Safe JSON parser
  const parseJSONSafe = (text) => {
    try {
      if (!text) return [];
      const cleaned = text.replace(/```json|```/g, "").trim();
      const match = cleaned.match(/\[[\s\S]*\]/);
      return match ? JSON.parse(match[0]) : [];
    } catch (e) {
      console.error("JSON parsing failed:", e);
      return [];
    }
  };

  // Retry helper
  const generateQuizWithRetry = async (
    generateFn,
    retries = 3,
    delay = 3000
  ) => {
    for (let i = 0; i < retries; i++) {
      try {
        return await generateFn();
      } catch (e) {
        if (e.message.includes("503") && i < retries - 1) {
          console.warn(`Model overloaded. Retrying (${i + 1}/${retries})...`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          throw e;
        }
      }
    }
  };

  useEffect(() => {
    if (!base64File) return;
    let isMounted = true;

    const generateQuiz = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const genAI = new GoogleGenerativeAI(
          import.meta.env.VITE_GEMINI_API_KEY
        );
        const models = [
          "gemini-2.5-pro",
          "gemini-pro-latest",
          "gemini-flash-latest",
        ];
        let result = null;

        for (const modelName of models) {
          try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const prompt = `
              You are an expert educator.
              Study the uploaded file and generate ${num} multiple choice questions.
              Each question should have:
              - The question text
              - Four answer options (A–D)
              - The correct answer (A–D)
              - A short hint or explanation
              Return JSON array ONLY like this:
              [
                {
                  "question": "...",
                  "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
                  "correct": "B",
                  "hint": "..."
                }
              ]
            `;

            result = await generateQuizWithRetry(() =>
              model.generateContent([
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: base64File.split(",")[1],
                  },
                },
                { text: prompt },
              ])
            );

            if (result) break;
          } catch (e) {
            console.warn(`Failed with model ${modelName}:`, e.message);
          }
        }

        if (!result) {
          if (isMounted) setErrorMsg("All models failed. Try again later.");
          return;
        }

        const text =
          result.response?.text?.() || (await result.response?.text?.());
        console.log("Raw response:", text);

        const parsed = parseJSONSafe(text);
        console.log("Parsed questions:", parsed);

        if (isMounted) {
          if (parsed.length > 0) {
            setQuestions([...parsed]);
          } else {
            setErrorMsg("No valid questions found in response.");
          }
        }
      } catch (error) {
        console.error("Error generating quiz:", error);
        if (isMounted)
          setErrorMsg("Error generating quiz. See console for details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    generateQuiz();
    return () => {
      isMounted = false;
    };
  }, [base64File, num]);
  function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-200">
            Generating quiz...
          </p>
        </div>
      </div>
    );
  }

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <Loader />
      </div>
    );

  if (errorMsg)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-red-400">
        <p>{errorMsg}</p>
      </div>
    );

  return <Quiz questions={questions} />;
}

function Quiz({ questions }) {
  const [current, setCurrent] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState("");
  const [answered, setAnswered] = useState(false);

  const q = questions[current];

  function handleSelect(opt) {
    setSelected(opt);
    setAnswered(true);
  }

  function handleNext() {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected("");
      setAnswered(false);
    } else {
      setShowAll(true);
    }
  }

  if (!questions || questions.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>No questions yet.</p>
      </div>
    );

  if (showAll)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-[400px]">
          <h2 className="text-2xl font-bold text-center mb-6">
            All Questions & Answers
          </h2>
          {questions.map((q, i) => (
            <div key={i} className="mb-5">
              <p className="font-semibold">
                Q{i + 1}: {q.question}
              </p>
              <p className="text-sm mt-1 text-gray-300">
                <strong>Answer:</strong> {q.correct}
              </p>
              <p className="text-sm text-gray-400">
                <strong>Hint:</strong> {q.hint}
              </p>
            </div>
          ))}
        </div>
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white pt-11">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-[400px] text-center">
        <h2 className="text-2xl font-bold mb-4">Question {current + 1}</h2>
        <p className="text-gray-200 mb-6">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => !answered && handleSelect(opt)}
              className={`w-full py-2 rounded-xl transition duration-300 ${
                selected === opt
                  ? opt.trim().startsWith(q.correct)
                    ? "bg-green-600 text-white"
                    : "bg-red-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {answered && !selected.trim().startsWith(q.correct) && (
          <p className="text-sm text-gray-300 mt-3">Hint: {q.hint}</p>
        )}

        {answered && (
          <button
            onClick={handleNext}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-xl transition duration-300"
          >
            {current + 1 < questions.length ? "Next Question" : "Finish Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}
