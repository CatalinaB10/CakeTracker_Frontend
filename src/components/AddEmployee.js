import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { Button } from 'react-bootstrap';

const AddEmployee = ({ onAddEmployee }) => {
  const [showForm, setShowForm] = useState(true);
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    birthDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getFullYear() - dob.getFullYear();
    const month = today.getMonth() - dob.getMonth();
    if(age < 18 || (age === 18 && month < 0)) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:8080/employees/create', employee);
      alert('Employee added successfully!');
      setEmployee({
        firstName: '',
        lastName: '',
        country: '',
        city: '',
        birthDate: ''
      });
      setShowForm(false);
      onAddEmployee();
    } catch (error) {
      console.error('There was an error adding the employee!', error);
    }
  };

  function validateForm() {
    const age = calculateAge(employee.birthDate);
    if (age < 18) {
      alert('Employee must be at least 18 years old.');
      return false;
    }
  }

  return (
    <div>
      {/* <Button className='add-button' onClick={() => setShowForm(true)}>
      ➕ Add Employee
      </Button> */}
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input 
              type="text" 
              name="firstName" 
              value={employee.firstName} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input 
              type="text" 
              name="lastName" 
              value={employee.lastName} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>Country:</label>
            <input 
              type="text" 
              name="country" 
              value={employee.country} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>City:</label>
            <input 
              type="text" 
              name="city" 
              value={employee.city} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <div>
            <label>Birth Date:</label>
            <input 
              type="date" 
              name="birthDate" 
              value={employee.birthDate} 
              onChange={handleInputChange} 
              required 
            />
          </div>
          <button type="submit" onClick={validateForm}>Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default AddEmployee;
