import React, { useState } from 'react'
import AddTeam from './AddTeam';

const TeamRunRate = (props) => {

    const [data, setData] = useState(props);
    const [isEdit, setEdit] = useState(false);

    const onSubmit = (teamData) => {
        let teams = localStorage.getItem('teams');
        if(teams) {
            teams = JSON.parse(teams);
        }
        teams = teams && teams.length ? teams : [];
        for(let i = 0; i<teams.length; i++) {
            if(teams[i].name === teamData.name) {
                teams[i] = teamData;
            }
        }
        localStorage.setItem('teams', JSON.stringify(teams));
        setData(teamData)
        setEdit(false);
    }

    const {run, runAgainst, overs, oversAgainst, runRate, name} = data;

    if(!isEdit) {
        return (
            <div className='team-container m-3 p-3' onClick={() => setEdit(true)}>
                <div style={{textAlign: 'center', fontSize: '18px'}}><b>{name}</b></div>
                <div className='team'>
                    <div className='team-pair'>
                        <div className='field-value'>
                            <b>Runs</b> 
                            <div>{run}</div>
                        </div>
                        <div className='field-value'>
                            <b>Against</b> 
                            <div>{runAgainst}</div>
                        </div>
                        
                    </div>
                    <div className='team-pair'>
                        <div className='field-value'>
                            <b>Overs</b> 
                            <div>{overs}</div>
                        </div>
                        <div className='field-value'>
                            <b>Overs</b> 
                            <div>{oversAgainst}</div>
                        </div>
                    </div>
                </div>
                <div style={{textAlign: 'center', fontSize: '18px'}}>{runRate.toPrecision(4)}</div>
            </div>
        )
    } else {
        return (
            <AddTeam teamData={data} onSubmit={onSubmit} onCancel={() => setEdit(false)}/>
        )
    }
}

export default TeamRunRate