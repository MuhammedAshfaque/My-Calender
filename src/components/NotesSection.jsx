import React, { useState, useEffect } from 'react';
import './NotesSection.css';

const NotesSection = ({ activeDate, activeTask, onSave }) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setNotes(activeTask || "");
  }, [activeTask, activeDate]);

  const handleChange = (e) => {
    setNotes(e.target.value);
  };

  const handleSaveClick = () => {
    if (!activeDate) {
      alert("Please select a date first to save a task.");
      return;
    }
    if (onSave) {
      onSave(activeDate.toDateString(), notes);
    }
  };

  return (
    <div className="notes-wrapper">
      <h3 className="notes-heading">Notes</h3>
      {activeDate ? (
        <p className="notes-date-label">For: {activeDate.toDateString()}</p>
      ) : (
        <p className="notes-date-label">Select a date to add notes</p>
      )}
      <textarea className="notes-textarea"
        value={notes}
        onChange={handleChange}
        placeholder="Type here..."
      />
      <button className="save-btn" onClick={handleSaveClick}>Save Task</button>
    </div>
  );
};

export default NotesSection;
