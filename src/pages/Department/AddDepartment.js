import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createdepartment } from '../../api/department'
import { useNavigate } from 'react-router-dom'

function AddDepartment() {
    const [formData, setFormData] = useState({
        department_name : ''
    })
    const dispatch = useDispatch()
    const nav = useNavigate()


    const handelValue = (e) =>{
        setFormData({...formData,[e.target.name]: e.target.value})
    }

    const onFinish = (e) => {
        e.preventDefault()
        dispatch(createdepartment(formData))
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

export default AddDepartment