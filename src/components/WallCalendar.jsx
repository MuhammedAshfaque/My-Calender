import React, { useState } from 'react';
import CalendarGrid from './CalendarGrid';
import NotesSection from './NotesSection';
import './WallCalendar.css';

const WallCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Date range selection state
  const [selection, setSelection] = useState({ start: null, end: null });

  // Example placeholder image from Unsplash for the hero section
  const heroImageUrl = "https://as1.ftcdn.net/v2/jpg/02/02/24/44/1000_F_202244447_tuMwUhnlltRdcetu1oLFxE8uJZysmEhV.jpg";

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
          <NotesSection />
        </div>
        <div className="grid-container">
          <CalendarGrid 
            currentDate={currentDate} 
            setCurrentDate={setCurrentDate}
            selection={selection}
            setSelection={setSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default WallCalendar;
