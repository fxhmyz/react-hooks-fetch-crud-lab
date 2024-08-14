import React from 'react';

function AdminNavBar({ onToggleForm }) {
  return (
    <nav>
      <button onClick={onToggleForm}>New Question</button>
      <button>View Questions</button>
    </nav>
  );
}

export default AdminNavBar;
