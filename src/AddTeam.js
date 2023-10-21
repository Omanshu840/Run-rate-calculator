import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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

const AddTeam = (props) => {

    const {onSubmit, onCancel, teamData} = props;
    const [data, setData] = useState(teamData);

    useEffect(() => {
        setData(props.teamData);
    }, [props.teamData])

    const onChange = (field, value) => {
        let newData = {
            ...data,
            [field]: value
        }
        newData = {
            ...newData,
            runRate: evalString(newData.run)/evalString(newData.overs) - evalString(newData.runAgainst)/evalString(newData.oversAgainst)
        }
        setData(newData);
    }

    const onSubmitClick = () => {
        const submitData = {
            ...data,
            run: evalString(data.run),
            overs: evalString(data.overs),
            runAgainst: evalString(data.runAgainst),
            oversAgainst: evalString(data.oversAgainst)
        }
        onSubmit(submitData);
    }

    return (
        <div className='add-team row m-4 p-4'>
            <div className='col-12 p-2'>
                <Form.Control type="text" placeholder='Team Name' value={data.name} onChange={(e) => onChange("name", e.target.value)}/>
            </div>
            <div className='col-6 p-2'>
                <Form.Control type="text" placeholder='Runs' value={data.run} onChange={(e) => onChange("run", e.target.value)}/>
            </div>
            <div className='col-6 p-2'>
                <Form.Control type="text" placeholder='Overs' value={data.overs} onChange={(e) => onChange("overs", e.target.value)}/>
            </div>
            <div className='col-6 p-2'>
                <Form.Control type="text" placeholder='Against' value={data.runAgainst} onChange={(e) => onChange("runAgainst", e.target.value)}/>
            </div>
            <div className='col-6 p-2'>
                <Form.Control type="text" placeholder='Overs' value={data.oversAgainst} onChange={(e) => onChange("oversAgainst", e.target.value)}/>
            </div>
            <div className='col-12 p-2'>
                <Form.Control type="text" value={data.runRate} disabled/>
            </div>
            <div className='col-12' style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button variant="primary" onClick={onSubmitClick}>Submit</Button>
                <Button variant='danger' onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    )
}

export default AddTeam