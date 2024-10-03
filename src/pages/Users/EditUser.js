import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneuser, updateuser, userSelector } from '../../api/user';
import { departmentSelector, fetchAlldepartment } from '../../api/department';

function EditUser() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emp_name: '',
    email: '',
    employeeId:'',
    department:'',
    phone_no:'',
    role:''        
  })
  const { department } = useSelector(departmentSelector)
  const {current_user} = useSelector(userSelector)
  const dispatch = useDispatch()
  const {id} = useParams()
  const nav = useNavigate()

  useEffect(()=>{
    dispatch(fetchAlldepartment())
  },[])

  useEffect(()=>{
    dispatch(fetchOneuser(id))
  },[id])
  
  useEffect(()=>{
    setFormData({
        emp_name: current_user?.emp_name,
        email: current_user?.email,
        employeeId:current_user?.employeeId,
        department:current_user?.department?._id,
        phone_no:current_user?.phone_no,
        role:current_user?.role        
      })
  },[current_user])

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handelValue = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const onFinish = (e) => {
    e.preventDefault()
    dispatch(updateuser(id, formData))
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
            value={formData?.role}
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
        <FormControl sx={{ marginTop: "20px"}}>
          <Button size="large" variant="contained" type="submit">
            Submit
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

export default EditUser