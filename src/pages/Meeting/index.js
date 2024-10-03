import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import DataTable from './DataTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllmeeting, meetingSelector } from '../../api/meeting'

function Index() {
    const nav = useNavigate()
    const {meeting} = useSelector(meetingSelector)
    const [filter, setFilter] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(fetchAllmeeting())
    },[])

    
  return (
    <div>
        <div className='py-5 mr-4 flex justify-end'>
        <Button variant='contained' onClick={()=>nav('/createMeeting')} ><AddIcon/>New Meeting</Button>
        </div>
        <div>
            <DataTable data={filter ? filter : meeting} />
        </div>
    </div>
  )
}

export default Index