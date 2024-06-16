import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { notify } from '../components/Notification';
import '../css/todaybirthdays.css'; // Import the CSS file for styling
import Confetti from 'react-confetti'

const TodayBirthdays = () => {
  const [birthdays, setBirthdays] = useState([]);
  const width = window.innerWidth;
  const height = window.innerHeight;

  useEffect(() => {
    axios.get('http://localhost:8080/employees/birthday_today')
      .then(response => {
        setBirthdays(response.data);
      })
      .catch(error => {
        notify("Failed to fetch today's birthdays.", "error");
        console.error(error);
      });
  }, []);

  return (
    <div className="today-birthdays">
         <Confetti
      width={width}
      height={height}
    />
      <h2>Today's Birthdays</h2>
      {birthdays.length === 0 && (
        <p>Celebrating life today!</p>
      )}
      <ul>
        {birthdays.map(employee => (
          <li key={employee.id}>
            <span>{employee.firstName} {employee.lastName}</span>  {employee.birthDate}
            <span className="birthday-cake">🎂</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodayBirthdays;
