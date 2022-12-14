import data from './data.json';
const { createContext, useState, useEffect } = require("react");

const DataContext = createContext({});

export const DataProvider = ({children}) => {

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
          setTeam(event.target.value);
      }
    
      function handleEmployeeCardClick (event) {
          const transformedEmployees = employees.map((employee) => {
            if(employee.id !== parseInt(event.currentTarget.id)) 
                return employee;

            return { 
                ...employee, 
                teamName: employee.teamName === selectedTeam ? '' : selectedTeam
            };
          });
    
          setEmployees(transformedEmployees);
      }

      return <DataContext.Provider value={{employees, selectedTeam, handleTeamSelectionChange, handleEmployeeCardClick, setTeam}}>
        {children}
      </DataContext.Provider>
}

export default DataContext;