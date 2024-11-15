import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLogin from './components/UserLogin';
import UserReg from './components/UserReg';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Index from './components/Index';

// Avoid recursive import
import Home2 from './components/Home2';
import PrayerTimings from './components/PrayerTimings';
import Education from './components/Education';
import Volunteer from './components/Volunteer';
import Adminusers from './components/Adminusers';
import Adminhome from './components/Adminhome';
import Adeducation from './components/Adeducation';
import Advolunteer from './components/Advolunteer';
import Admaint from './components/Admaint';
import Maintenance from './components/Maintenance';
import Usermaint from './components/Usermaint';
import Adminauction from './components/Adminauction';
import Userauc from './components/Userauc';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/userreg" element={<UserReg />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/index" element={<Index />} />
   
        <Route path="/home" element={<Home2 />} />
        <Route path="/prayer-timings" element={<PrayerTimings />} />
        <Route path="/education" element={<Education />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/auser" element={<Adminusers />} />
        <Route path="/ahome" element={<Adminhome />} />
        <Route path="/adedu" element={<Adeducation/>} />
        <Route path="/advolunteer" element={<Advolunteer/>} />
        <Route path="/admaint" element={<Admaint/>} />
        <Route path="/maint" element={<Maintenance/>} />
        <Route path="/umaint" element={<Usermaint/>} />
        <Route path="/adauc" element={<Adminauction/>} />
        <Route path="/uauc" element={<Userauc/>} />
        
        

        {/* Remove the recursive /App route */}
      </Routes>
    </Router>
  );
}

export default App;
