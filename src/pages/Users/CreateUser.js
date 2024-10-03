import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createuser } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { departmentSelector, fetchAlldepartment } from '../../api/department';

function CreateUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emp_name: '',
    email: '',
    password: '',
    employeeId:'',
    department:'',
    phone_no:'',
    role:''        
  })
  const dispatch = useDispatch()
  const nav = useNavigate()
  const { department } = useSelector(departmentSelector)

    useEffect(()=>{
      dispatch(fetchAlldepartment())
    },[])

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handelValue = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onFinish = (e) => {
    e.preventDefault()
    dispatch(createuser(formData))
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
            name="emp_name"
            label="Name"
            value={formData?.emp_name}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
            variant="outlined"
            type="text"
            name="email"
            label="E-mail"
            value={formData?.email}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
            variant="outlined"
            type="text"
            name="employeeId"
            label="Employee ID"
            value={formData?.employeeId}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <InputLabel>Department</InputLabel>
        <Select
          required
            name="department"
            label="Department"
            value={formData?.department}
            onChange={handelValue}
          >
            {
              department?.map((item,i)=>{
                return(
                  <MenuItem key={i} value={item?._id}>{item?.department_name}</MenuItem>
                )
              })
            }
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <InputLabel>Role</InputLabel>
        <Select
            required
            name="role"
            label="Role"
            value={formData?.blog_category}
            onChange={handelValue}
          >
            <MenuItem value="Attendee">Attendee</MenuItem>
            <MenuItem value="Meeting Organizer">Meeting Organizer</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        {/* <InputLabel>Category</InputLabel> */}
        <TextField
          required
            variant="outlined"
            type="tel"
            name="phone_no"
            label="Phone Number"
            value={formData?.phone_no}
            onChange={handelValue}
          />
        </FormControl>
        <FormControl fullWidth required sx={{marginTop:'20px'}} >
        <InputLabel>Password</InputLabel>
        <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  label="Password"
                  name="password"
                  value={formData?.password}
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

export default CreateUser