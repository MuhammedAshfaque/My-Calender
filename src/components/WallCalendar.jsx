import React, { useState, useEffect } from 'react';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import './WallCalendar.css';

const WallCalendar = () => {

  // Stores current month/year
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // It uses to track which date is currently selected for adding/viewing notes. It will be null if no date is selected.
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem('calendar-tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  const handleSaveTask = (dateString, note) => {
    // Format of update tasks will be { "Mon Sep 25 2023": "Buy groceries" }
    const updatedTasks = { ...tasks, [dateString]: note };
    setTasks(updatedTasks);
    localStorage.setItem('calendar-tasks', JSON.stringify(updatedTasks));
  };
  
  const activeTask = selectedDate ? tasks[selectedDate.toDateString()] : "";

  // Example placeholder image from Unsplash for the hero section
  const heroImageUrl = "hero_img.jpg";
  return (
    <div className="wall-calendar">
      <div className="calendar-spiral"></div>
      <div className="calendar-hanger"></div>
      
      <div className="wall-calendar-top">
        <img src={heroImageUrl} alt="Hero scenery" className="hero-image" />
        <div className="hero-overlay-shape"></div>
      </div>
      
      <div className="wall-calendar-bottom">
        <div className="notes-container">
          <NotesSection 
            activeDate={selectedDate}
            activeTask={activeTask}
            onSave={handleSaveTask}
          />
        </div>
        <div className="grid-container">
          <CalendarGrid 
            currentDate={currentDate} 
            setCurrentDate={setCurrentDate}
            selectedDate={selectedDate}
            onDateClick={setSelectedDate}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
