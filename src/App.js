import React, { useEffect, useState } from 'react'
import AddTeam from './AddTeam'
import { Button } from 'react-bootstrap';
import TeamRunRate from './TeamRunRate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const App = () => {
    const [addTeam, setAddTeam] = useState(false);
    const [teams, setTeams] = useState();

    useEffect(() => {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add("dark-mode")
          }
          else {
            document.body.classList.add("light-mode")
          }
      
          window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', event => {
              if(event.matches) {
                document.body.classList.add("dark-mode")
                document.body.classList.remove("light-mode")
              }
              else {
                document.body.classList.add("light-mode")
                document.body.classList.remove("dark-mode")
              }
      
            });

        let teams = localStorage.getItem('teams');
        if(teams) {
            teams = JSON.parse(teams);
            setTeams(teams);
        }
    }, [])

    const onSubmit = (teamData) => {
        let teams = localStorage.getItem('teams');
        if(teams) {
            teams = JSON.parse(teams);
        }
        teams = teams && teams.length ? teams : [];
        teams.push(teamData);
        localStorage.setItem('teams', JSON.stringify(teams));
        setAddTeam(false);
        setTeams(teams)
    }
    return (
        <div className='app col-md-4 p-4'>
            {teams && 
                <>
                    {teams.map(team => {
                        return <TeamRunRate {...team}/>
                    })}
                </>
            }
            {addTeam && <AddTeam onSubmit={onSubmit} onCancel={() => setAddTeam(false)} teamData={{}}/>}
            {!addTeam && <Button className='btn-add-team' variant="primary" onClick={() => setAddTeam(true)}><FontAwesomeIcon icon={faPlus}/></Button>}
        </div>
    )
}

export default App
