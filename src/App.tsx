import './App.css'
import { Route, Routes } from 'react-router-dom'

import Home from './views/Home';
import Login from './views/Login';
import MainNav from './components/MainNav';
import SignUp from './views/SignUp';
import Profile from './views/Profile';

function App() {


  return (
    <>
      <MainNav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App;
