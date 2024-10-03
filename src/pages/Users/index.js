import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DataTable from './DataTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllusers, userSelector } from '../../api/user';

function Index() {
    const nav = useNavigate()
    const { all_user } = useSelector(userSelector)
    const dispatch = useDispatch()
    const [filter, setFilter] = useState()

    useEffect(()=>{
      dispatch(fetchAllusers())
    },[])


  return (
    <div>
        <div className='py-5 mr-4 flex justify-end'>
        <Button variant='contained' onClick={()=>nav('/addUser')} ><AddIcon/>Add User</Button>
        </div>
        <div>
            <DataTable data = { filter ? filter : all_user } />
        </div>
    </div>
  )
}

export default Index