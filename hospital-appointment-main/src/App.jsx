 import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PaymentSuccess from './components/Payment-Success'
import About from './pages/About'
import Appoinment from './pages/Appoinment'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Login from './pages/Login'
import MyAppoinments from './pages/MyAppoinments'
import MyProfile from './pages/MyProfile'
 
 const App = () => {
   return (
     <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar/>
      <Routes>
        <Route path='/' element={ <Home/> } />
        <Route path='/doctors' element={ <Doctors/> } />
        <Route path='/doctors/:speciality' element={ <Doctors/> } />
        <Route path='/login' element={ <Login/> } />
        <Route path='/about' element={ <About/> } />
        <Route path='/contact' element={ <Contact/> } />
        <Route path='/my-profile' element={ <MyProfile/> } />
        <Route path='/my-appointments' element={ <MyAppoinments/> } />
        <Route path='/appointment/:docId' element={ <Appoinment/> } />
        <Route path='/success' element={ <PaymentSuccess/>  } />
      </Routes>
      <Footer/>
     </div>
   )
 }
 
 export default App
