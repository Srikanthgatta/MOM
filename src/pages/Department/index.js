import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { departmentSelector, fetchAlldepartment } from '../../api/department';

function Index() {
    const nav = useNavigate()
    const [filter, setFilter] = useState()
    const { department } = useSelector(departmentSelector)
    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(fetchAlldepartment())
    },[])

  return (
    <div>
        <div className='py-5 mr-4 flex justify-end'>
        <Button variant='contained' onClick={()=>nav('/addDepartment')} ><AddIcon/>Add Department</Button>
        </div>
        <div>
            <DataTable data={filter ? filter : department} />
        </div>
    </div>
  )
}

export default Index