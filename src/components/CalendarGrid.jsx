import React from 'react';
import './CalendarGrid.css';

const CalendarGrid = ({ currentDate, setCurrentDate, selection, setSelection, onDateClick, tasks = {} }) => {
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  // Adjust so Monday is 0 instead of Sunday (optional, but matching European/standard calendars often).
  // The reference image starts with MON TUE WED THU FRI SAT SUN
  const startingDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const isSameDate = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    if (onDateClick) {
      onDateClick(clickedDate);
    }

    // Single date selection instead of range selection
    setSelection({ start: clickedDate, end: clickedDate });
  };

  const getDayClass = (day) => {
    const thisDate = new Date(currentYear, currentMonth, day);
    let classes = "calendar-day";

    const dayOfWeek = thisDate.getDay();
    // Highlight weekends based on reference (SAT SUN are blue)
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      classes += " weekend";
    }

    // Selection classes
    if (isSameDate(thisDate, selection.start)) {
      classes += " selected-start";
    }
    if (isSameDate(thisDate, selection.end)) {
      classes += " selected-end";
    }
    if (selection.start && selection.end && thisDate > selection.start && thisDate < selection.end) {
      classes += " selected-in-between";
    }

    // Check if it's today
    const today = new Date();
    if (isSameDate(thisDate, today)) {
      classes += " today";
    }

    return classes;
  };

  const renderDays = () => {
    const days = [];
    
    // Previous month empty slots (we could fill with previous month's dates, but keeping empty for minimal look)
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = 0; i < startingDay; i++) {
       days.push(
         <div key={`empty-${i}`} className="calendar-day empty">
            {prevMonthDays - startingDay + i + 1}
         </div>
       );
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(
          <div 
            key={`day-${i}`} 
            className={getDayClass(i)}
            onClick={() => handleDayClick(i)}
          >
             <span>{i}</span>
          </div>
        );
    }
    return days;
  };

  return (
    <div className="calendar-grid-wrapper">
      <div className="calendar-header">
        <button onClick={handlePrevMonth} className="nav-btn">&lt;</button>
        <div className="month-year-display">
          <span className="year">{currentYear}</span>
          <span className="month">{monthNames[currentMonth]}</span>
        </div>
        <button onClick={handleNextMonth} className="nav-btn">&gt;</button>
      </div>

      <div className="days-of-week">
        <span>MON</span>
        <span>TUE</span>
        <span>WED</span>
        <span>THU</span>
        <span>FRI</span>
        <span className="weekend-title">SAT</span>
        <span className="weekend-title">SUN</span>
      </div>

      <div className="days-grid">
        {renderDays()}
      </div>

      <div className="saved-tasks-wrapper">
        {selection.start && tasks[selection.start.toDateString()] && (
          <div className="saved-task-view">
             <h4>Task for {selection.start.toDateString()}</h4>
             <p>{tasks[selection.start.toDateString()]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;

