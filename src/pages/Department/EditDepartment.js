import { Button, FormControl, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { departmentSelector, fetchOnedepartment, updatedepartment } from '../../api/department'
import { useNavigate, useParams } from 'react-router-dom'

function EditDepartment() {
    const [formData, setFormData] = useState({
        department_name : ''
    })
    const { currentdepartment } = useSelector(departmentSelector)
    const {id} = useParams()
    const dispatch = useDispatch()
    const nav = useNavigate()

    useEffect(()=>{
        dispatch(fetchOnedepartment(id))
    },[id])

    useEffect(()=>{
        setFormData({
            department_name : currentdepartment?.department_name
        })
    },[currentdepartment])

    const handelValue = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const onFinish = (e) => {
        e.preventDefault()
        dispatch(updatedepartment(id,formData))
        nav(-1)
    }

  return (
    <div className='flex justify-center'>
      <form className="md:w-1/2 w-full px-6 mt-5 " onSubmit={onFinish} >
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
            variant="outlined"
            type="text"
            name="department_name"
            label="Department"
            value={formData?.department_name}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl sx={{ marginTop: "20px"}}>
          <Button size="large" variant="contained" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default EditDepartment