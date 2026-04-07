import React, { useState } from 'react';
import './NotesSection.css';

const NotesSection = () => {
  const [notes, setNotes] = useState("");

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="notes-wrapper">
      <h3 className="notes-heading">Notes</h3>
      <textarea className="notes-textarea"
        value={notes}
        onChange={handleChange}
        placeholder="Type here..."
      />
    </div>
  );
};

export default NotesSection;



