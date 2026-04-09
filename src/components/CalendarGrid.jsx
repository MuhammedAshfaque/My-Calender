import React from 'react';
import './CalendarGrid.css';

const CalendarGrid = ({ currentDate, setCurrentDate, selectedDate, onDateClick, tasks = {} }) => {
  // It returns the month (0-11) and year of the current date to display the calendar for that month and year.
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear(); 

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // First day of the month (0: Sunday, 1: Monday, ..., 6: Saturday)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  
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

    // It updates the selected date.
    if (onDateClick) {
      onDateClick(clickedDate);
    }
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
    if (isSameDate(thisDate, selectedDate)) {
      classes += " selected-start selected-end";
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
    
    // Previous month empty slots
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate(); 
    for (let i = 0; i < startingDay; i++) {
       days.push(
         <div key={`empty-${i}`} className="calendar-day empty">
            {/* It shows last few days of previous month like 29, 30, 31 */}
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
        {/* toDateString() method converts a date to a string representation like "Mon Sep 25 2023" */}
        {selectedDate && tasks[selectedDate.toDateString()] && (
          <div className="saved-task-view">
             <h4>Task for {selectedDate.toDateString()}</h4>
             <p>{tasks[selectedDate.toDateString()]}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;

