# AI Quiz Generator

A React-based web application that generates multiple-choice quizzes automatically from uploaded PDF files using **Google Generative AI (Gemini API)**. Users can take the quiz interactively, see hints for wrong answers, and review all questions at the end.

---

## Features

- Upload PDF files as quiz sources.
- Generate multiple-choice questions (A–D) with correct answers and hints.
- Interactive quiz UI:
  - Select an answer.
  - Immediate feedback (green/red).
  - Hint for wrong answers.
  - Next / Finish button to navigate questions.
- View all questions and answers at the end of the quiz.
- Loading animation while quiz is being generated.
- Retry mechanism for API overloads (503 errors).

---

## Technologies Used

- **React** – Frontend framework for interactive UI.
- **Tailwind CSS** – Styling and responsive design.
- **React Router DOM** – Navigation and location handling.
- **Google Generative AI (Gemini API)** – AI-based quiz generation.
- **Vite** – Fast React build tool (optional).

---

 
 
git clone https://github.com/your-username/ai-quiz-generator.git
cd ai-quiz-generator
