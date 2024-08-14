import React, { useState } from 'react';

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prevData => ({
        ...prevData,
        [name]: checked
      }));
    } else if (name.startsWith('answer')) {
      const index = parseInt(name.split('-')[1], 10);
      setFormData(prevData => {
        const newAnswers = [...prevData.answers];
        newAnswers[index] = value;
        return { ...prevData, answers: newAnswers };
      });
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddQuestion(formData);
    setFormData({
      prompt: '',
      answers: ['', '', '', ''],
      correctIndex: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
          required
        />
      </label>
      {formData.answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            type="text"
            name={`answer-${index}`}
            value={answer}
            onChange={handleChange}
            required
          />
        </label>
      ))}
      <label>
        Correct Answer Index:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {formData.answers.map((_, index) => (
            <option key={index} value={index}>
              {index + 1}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
