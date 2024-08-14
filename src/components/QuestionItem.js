import React from 'react';

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
    .then(() => onDeleteQuestion(id));
  }

  function handleUpdate(event) {
    const updatedQuestion = {
      ...question,
      correctIndex: parseInt(event.target.value, 10),
    };

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correctIndex: updatedQuestion.correctIndex }),
    })
    .then(() => onUpdateQuestion(updatedQuestion));
  }

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={correctIndex} onChange={handleUpdate}>
          {answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default QuestionItem;
