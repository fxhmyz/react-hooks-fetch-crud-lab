import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  function handleAddQuestion(newQuestion) {
    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(addedQuestion => {
        setQuestions([...questions, addedQuestion]);
      });
  }

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions(questions.filter(question => question.id !== id));
      });
  }

  function handleUpdateQuestion(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(response => response.json())
      .then(updatedQuestion => {
        const updatedQuestions = questions.map(question =>
          question.id === updatedQuestion.id ? updatedQuestion : question
        );
        setQuestions(updatedQuestions);
      });
  }

  return (
    <div>
      <AdminNavBar onToggleForm={handleToggleForm} />
      {showForm && <QuestionForm onAddQuestion={handleAddQuestion} />}
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onUpdate={handleUpdateQuestion}
      />
    </div>
  );
}

export default App;
