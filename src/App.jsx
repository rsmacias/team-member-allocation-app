import './App.css';

import Header from './Header';
import Employees from './Employees';
import Footer from './Footer';

import { useState, useEffect } from 'react';
import data from './data.json';

function App() {

  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem('employeeList')) || [...data]);
  const [selectedTeam, setTeam] = useState(JSON.parse(localStorage.getItem('selectedItem')) || "TeamB");

  useEffect(() => {
    // How to read this method: When employees state changes, we update the local storage 
    localStorage.setItem('employeeList', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('selectedItem', JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  function handleTeamSelectionChange (event) {
      console.log(event.target.value);
      setTeam(event.target.value);
  }

  function handleEmployeeCardClick (event) {
      console.log(event.target.value);
      const transformedEmployees = employees.map((employee) => {
          if(employee.id === parseInt(event.currentTarget.id)) {
              if(employee.teamName === selectedTeam) {
                  return { ...employee, teamName: ''}
              } else {
                  return { ...employee, teamName: selectedTeam };
              }
          } else {
              return employee;
          } 
      });

      setEmployees(transformedEmployees);
  }

  return (
    <div>
      <Header
        selectedTeam={selectedTeam}
        teamMemberCount={employees.filter((employee) => employee.teamName === selectedTeam).length}/>
      <Employees 
        employees={employees}
        selectedTeam={selectedTeam}
        handleTeamSelectionChange={handleTeamSelectionChange}
        handleEmployeeCardClick={handleEmployeeCardClick} />
      <Footer/>
    </div>
  );
}

export default App;
