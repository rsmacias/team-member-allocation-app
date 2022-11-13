import { useContext, useState } from "react";
import DataContext from "./context/DataContext";

const GroupedTeamMembers = () => {

    const {employees, selectedTeam, setTeam} = useContext(DataContext);
    const [groupedEmployees, setGroupedData] = useState(groupTeamMembers());

    function groupTeamMembers() {
        const allowedTeams = ['TeamA', 'TeamB', 'TeamC', 'TeamD']; // This could be fetched by an API call
        let teams = [];

        teams = allowedTeams.map(team => {
            return {
                team:team, 
                members:employees.filter((employee) => employee.teamName === team), 
                collapsed: selectedTeam === team ? false : true
            };
        });

        return teams;
    }

    function handleTeamClick (event) {
        const transformedGroupData = groupedEmployees.map((groupedData) => groupedData.team === event.currentTarget.id 
                                                                           ? {...groupedData, collapsed:!groupedData.collapsed}
                                                                           : groupedData);
        setGroupedData(transformedGroupData);
        setTeam(event.currentTarget.id); // This communicate the selectedTeam to Employees component
    }

    return (
        <main className="container">
            {
                groupedEmployees.map((item) => {
                    return (
                        <div key={item.team} className='card mt-2' style={{cursor: "pointer"}}>
                            <h4 id={item.team} 
                                className='card-header text-secondary bg-white'
                                onClick={handleTeamClick}>
                                Team Name: {item.team}
                            </h4>
                            <div id={"collapse_" + item.team}
                                 className={item.collapsed === true? 'collapse':''}>
                                <hr/>
                                {
                                    item.members.map(member => {
                                        return (
                                            <div key={member.id} className='mt-2'>
                                                <h5 className='card-title mt-2'>
                                                    <span className='text-dark'>Full Name: {member.fullName}</span>
                                                </h5>
                                                <p>Designation: {member.designation}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </main>
    );
}

export default GroupedTeamMembers;