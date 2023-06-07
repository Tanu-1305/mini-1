import React, { useState, useEffect } from 'react';
import './App.css';


const WeeklySchedule = () => {
  // Default values
  const [currentWeek, setCurrentWeek] = useState([]);
  const [timeZone, setTimeZone] = useState('UTC');

  // Function to get the current week
  const getCurrentWeek = (date) => {
    const currentWeek = [];
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust to Monday if Sunday
    const weekStart = new Date(date.setDate(diff));

    for (let i = 0; i < 5; i++) { // Assuming Monday to Friday
      currentWeek.push(new Date(weekStart));
      weekStart.setDate(weekStart.getDate() + 1);
    }

    return currentWeek;
  }

  useEffect(() => {
    // Set the initial current week
    const currentDate = new Date();
    const initialWeek = getCurrentWeek(currentDate);
    setCurrentWeek(initialWeek);
  }, []);

  // Function to load weekly schedule
  const loadWeeklySchedule = () => {
    return currentWeek.map((day) => (
      <div key={day.toISOString()} className="day">
        <h4>{day.toLocaleDateString()}</h4>
        <p>Working hours: 8AM - 11PM</p>
        {createCheckboxes(day)}
      </div>
    ));
  }

  // Function to create checkboxes for each hour of the day
  const createCheckboxes = (day) => {
    const checkboxes = [];

    for (let i = 8; i <= 23; i++) {
      const checkboxId = `checkbox_${day.getDate()}_${i}`;
      checkboxes.push(
        <div key={checkboxId}>
          <input type="checkbox" id={checkboxId} name={checkboxId} />
          <label htmlFor={checkboxId}>{i}:00</label>
        </div>
      );
    }

    return checkboxes;
  }

  // Function to change the week based on the direction
  const changeWeek = (direction) => {
    const newDate = new Date(currentWeek[0]);

    if (direction === 'next') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (direction === 'previous') {
      newDate.setDate(newDate.getDate() - 7);
    }

    const newWeek = getCurrentWeek(newDate);
    setCurrentWeek(newWeek);
  }

  // Function to update displayed times based on the selected timezone
  const updateTimezone = () => {
    setTimeZone(document.getElementById('timezone').value);
  }

  return (
    <div>
      <h2>Weekly Schedule</h2>
      <p>
        <button onClick={() => changeWeek('previous')}>Previous</button>
        <span>{currentWeek[0]?.toLocaleDateString()} - {currentWeek[currentWeek.length - 1]?.toLocaleDateString()}</span>
        <button onClick={() => changeWeek('next')}>Next</button>
      </p>
      <p>
        Timezone:
        <select id="timezone" onChange={updateTimezone}>
          <option value="UTC">UTC</option>
          <option value="Asia/Kolkata">Asia/Kolkata</option>
        </select>
      </p>
      <div id="schedule">{loadWeeklySchedule()}</div>
    </div>
  );
}

export default WeeklySchedule;