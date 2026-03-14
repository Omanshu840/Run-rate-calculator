import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function evalString(str) {
    if(str) {
        let numbers = str.split(/\+|\-|\*|\//);
        let sum = 0;
        numbers.forEach(number => {
            sum += parseFloat(number);
        })
        return sum.toString();
    }
}

const AddMatch = (props) => {
    const {addMatch, setAddMatch, teams, onAddMatch} = props;
    const [match, setMatch] = useState({});

    const onChange = (field, value) => {
        setMatch({
            ...match,
            [field]: value
        })
    }

    const onSubmitClick = () => {
        const team1 = teams.filter(team => team.name === match.team1);
        const team2 = teams.filter(team => team.name === match.team2);
        let newTeams = JSON.parse(JSON.stringify(teams));
        if(team1 && team2 && team1.length && team2.length) {
            for(let t = 0; t<newTeams.length; t++) {
                let currTeam = newTeams[t];
                if(currTeam.name === team1[0].name) {
                    currTeam.overs = evalString(`${currTeam.overs}+${match.overs1}`);
                    currTeam.oversAgainst = evalString(`${currTeam.oversAgainst}+${match.overs2}`);
                    currTeam.run = evalString(`${currTeam.run}+${match.runs1}`);
                    currTeam.runAgainst = evalString(`${currTeam.runAgainst}+${match.runs2}`);
                    currTeam.runRate = currTeam.run/currTeam.overs - currTeam.runAgainst/currTeam.oversAgainst;
                    newTeams[t] = currTeam;
                } else if(currTeam.name === team2[0].name) {
                    currTeam.overs = evalString(`${currTeam.overs}+${match.overs2}`);
                    currTeam.oversAgainst = evalString(`${currTeam.oversAgainst}+${match.overs1}`);
                    currTeam.run = evalString(`${currTeam.run}+${match.runs2}`);
                    currTeam.runAgainst = evalString(`${currTeam.runAgainst}+${match.runs1}`);
                    currTeam.runRate = currTeam.run/currTeam.overs - currTeam.runAgainst/currTeam.oversAgainst;
                    newTeams[t] = currTeam;
                }
            }
        } else if(!(team1 && team1.length) && !(team2 && team2.length)) {
            let newTeam1 = {
                name: match.team1,
                overs: match.overs1,
                oversAgainst: match.overs2,
                run: match.runs1,
                runAgainst: match.runs2,
                runRate: match.runs1/match.overs1 - match.runs2/match.overs2
            }
            let newTeam2 = {
                name: match.team2,
                overs: match.overs1,
                oversAgainst: match.overs2,
                run: match.runs1,
                runAgainst: match.runs2,
                runRate: match.runs2/match.overs2 - match.runs1/match.overs1
            }
            newTeams.push(newTeam1);
            newTeams.push(newTeam2);
        }
        onAddMatch(newTeams);
        setAddMatch(false);
    }

    const getRunRate = (teamName, runs1, overs1, runs2, overs2) => {
        let team = teams.filter(team => team.name === teamName);
        if(team && team.length) {
            let currTeam = team[0];
            const runRate = evalString(`${currTeam.run}+${runs1}`)/evalString(`${currTeam.overs}+${overs1}`) - evalString(`${currTeam.runAgainst}+${runs2}`)/evalString(`${currTeam.oversAgainst}+${overs2}`);
            return (runRate) ? runRate.toPrecision(4) : "";
        }
        return "";
    }

    if(addMatch) {
        return (
            <div className='add-team row m-4 p-4'>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Team 1' value={match.team1} onChange={(e) => onChange("team1", e.target.value)}/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Team 2' value={match.team2} onChange={(e) => onChange("team2", e.target.value)}/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Runs' value={match.runs1} onChange={(e) => onChange("runs1", e.target.value)}/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Runs' value={match.runs2} onChange={(e) => onChange("runs2", e.target.value)}/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Overs' value={match.overs1} onChange={(e) => onChange("overs1", e.target.value)}/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Overs' value={match.overs2} onChange={(e) => onChange("overs2", e.target.value)}/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Run Rate' value={getRunRate(match.team1, match.runs1, match.overs1, match.runs2, match.overs2)} disabled/>
                </div>
                <div className='col-6 p-2'>
                    <Form.Control type="text" placeholder='Run Rate' value={getRunRate(match.team2, match.runs2, match.overs2, match.runs1, match.overs1)} disabled/>
                </div>
                <div className='col-12 mt-2' style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button variant="primary" onClick={onSubmitClick}>Submit</Button>
                    <Button variant='danger' onClick={() => setAddMatch(false)}>Cancel</Button>
                </div>
            </div>
        )
    } else {
        return (
            <Button variant="primary" onClick={() => setAddMatch(true)}>Add Match</Button>
        )
    }
}

export default AddMatch;