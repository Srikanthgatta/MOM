import logo from './logo.svg';
import './App.css';
import Login from './auth/Login';
import Header from './Global/Header'
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './shared/PrivateRoute';
import Dashboard from './pages/Dashboard';
import CreateUser from './pages/Users/CreateUser';
import User from './pages/Users';
import EditUser from './pages/Users/EditUser';
import Department from './pages/Department/index'
import AddDepartment from './pages/Department/AddDepartment';
import EditDepartment from './pages/Department/EditDepartment';
import Meeting from './pages/Meeting'
import CreateMetting from './pages/Meeting/CreateMetting';
import EditMeeting from './pages/Meeting/EditMeeting';
import AddMom from './pages/Meeting/AddMom';

function App() {
  return (
    <div className="App">
      {/* <Header />   */}
      <Routes>
        <Route index element={<Login />} />
        <Route element={<PrivateRoutes/>} >
           <Route path='/dashboard' element={<Header component={<Dashboard/>}/>} />
           <Route path='/users' element={<Header component={<User/>}/>} />
           <Route path='/addUser' element={<Header component={<CreateUser/>}/>} />
           <Route path='/editUser/:id' element={<Header component={<EditUser/>}/>} />
           <Route path='/department' element={<Header component={<Department />}/>} />
           <Route path='/addDepartment' element={<Header component={<AddDepartment />}/>} />
           <Route path='/editDepartment/:id' element={<Header component={<EditDepartment />}/>} />
           <Route path='/meeting' element={<Header component={<Meeting />}/>} />
           <Route path='/createMeeting' element={<Header component={<CreateMetting />}/>} />
           <Route path='/editMeeting/:id' element={<Header component={<EditMeeting />}/>} />
           <Route path='/addMom/:id' element={<Header component={<AddMom />}/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
