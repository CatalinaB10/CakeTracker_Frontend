import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';

const UpdateEmployee = ({ employeeId, onUpdateEmployee, onClose }) => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    country: '',
    city: '',
    birthDate: ''
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/employees/${employeeId}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('There was an error fetching the employee!', error);
      }
    };
    fetchEmployee();
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/employees/update/${employeeId}`, employee);
      alert('Employee updated successfully!');
      onUpdateEmployee();
      onClose();
    } catch (error) {
      console.error('There was an error updating the employee!', error);
    }
  };

  return (
    <Modal show={true} onClose={onClose}>
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
        <button type="submit">Update</button>
      </form>
    </Modal>
  );
};

export default UpdateEmployee;
