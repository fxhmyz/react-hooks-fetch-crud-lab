import React from 'react';
import QuestionItem from './QuestionItem';

function QuestionList({ questions, onDeleteQuestion, onUpdateQuestion }) {
  return (
    <div>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem 
            key={question.id} 
            question={question} 
            onDeleteQuestion={onDeleteQuestion} 
            onUpdateQuestion={onUpdateQuestion} 
          />
        ))}
      </ul>
    </div>
  );
}

export default QuestionList;
