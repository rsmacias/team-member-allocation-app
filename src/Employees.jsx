import { useState } from 'react';
import data from './data.json';
import femaleProfile from './images/femaleProfile.jpg';
import maleProfile from './images/maleProfile.jpg';

const Employees = () => {

    const [employees, setEmployees] = useState([...data]);
    const [selectedTeam, setTeam] = useState("TeamB");

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
        <main className='container'>
            <div className="row justify-content-center mt-3 mb-3">
                <div className="col-6">
                    <select className='form-select form-select-lg' value={selectedTeam} onChange={handleTeamSelectionChange}>
                        <option value="TeamA">TeamA</option>
                        <option value="TeamB">TeamB</option>
                        <option value="TeamC">TeamC</option>
                        <option value="TeamD">TeamD</option>
                    </select>
                </div>
            </div>

            <div className='row justify-content-center mt-3 mb-3'>
                <div className="col-8">
                    <div className="card-collection">
                    {
                        employees.map((employee) => (
                            <div id={employee.id} 
                                 className={(employee.teamName === selectedTeam? 'card m-2 standout' : 'card m-2')} 
                                 style={{ cursor: "pointer"}} 
                                 onClick={handleEmployeeCardClick}>
                                <img src={ employee.gender == 'female'? femaleProfile : maleProfile } className='card-img-top' />
                                <div className='card-body'>
                                    <h5 className="card-tittle">Full Name: {employee.fullName}</h5>
                                    <p className="card-text"><b>Designation:</b> {employee.designation}</p>
                                </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Employees;