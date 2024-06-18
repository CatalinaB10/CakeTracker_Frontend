import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddEmployee from './AddEmployee';
import UpdateEmployee from './UpdateEmployee';
import { notify } from './Notification';
import { Button } from 'react-bootstrap';
import '../css/employeelist.css'; // Import the CSS file for styling

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  // const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    await axios.get('http://localhost:8080/employees/all')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        notify("Failed to fetch employees.", "error");
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/employees/delete/${id}`)
      .then(() => {
        notify("Employee deleted successfully!");
        fetchEmployees();
      })
      .catch(error => {
        notify("Failed to delete employee.", "error");
        console.error(error);
      });
  };

  const handleAdd = (employee) => {
    setEmployees([...employees, employee]);
  };

  const handleUpdateClick = (employeeId) => {
    setSelectedEmployeeId(employeeId);
  };

  const handleCloseModal = () => {
    setSelectedEmployeeId(null);
  };

  return (
    <div className="employee-list">
      <h2>All Employees</h2>
      <Button className="add-button" onClick={() => setIsAddModalOpen(true)}>➕ Add Employee</Button>
      <ul className='card-list'>
        {employees.map(employee => (
          <li className='card' key={employee.employeeId}>
            <span>{employee.firstName} {employee.lastName}</span>{employee.birthDate}
            <div className="actions">
            <button onClick={() => handleUpdateClick(employee.employeeId)}>✏️ Update</button>
              <button onClick={() => handleDelete(employee.employeeId)}>🗑️ Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {isAddModalOpen && <AddEmployee  className="center" onClose={() => setIsAddModalOpen(false)} onAdd={handleAdd} onAddEmployee={fetchEmployees}/>}
      {selectedEmployeeId && <UpdateEmployee employeeId={selectedEmployeeId} onUpdateEmployee={fetchEmployees} onClose={handleCloseModal} />}    
      </div>
  );
};

export default EmployeeList;
