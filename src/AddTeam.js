import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const AddTeam = (props) => {

    const {onSubmit, onCancel, teamData} = props;
    const [data, setData] = useState(teamData);

    const onChange = (field, value) => {
        let newData = {
            ...data,
            [field]: value
        }
        newData = {
            ...newData,
            runRate: newData.run/newData.overs - newData.runAgainst/newData.oversAgainst
        }
        setData(newData);
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
                <Button variant="primary" onClick={() => onSubmit(data)}>Submit</Button>
                <Button variant='danger' onClick={onCancel}>Cancel</Button>
            </div>
        </div>
    )
}

export default AddTeam