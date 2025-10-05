import Header from './components/Header'
import Home from './pages/Home'
import Register from './pages/user/Register'
import Login from './pages/user/Login'
import Profile from './pages/user/Profile'
import Program from './pages/Program'
import Detail from './pages/Detail'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Success from './pages/Success'

import Admin from './pages/admin/Admin'
import AddProgram from './pages/admin/program/AddProgram'
import EditProgram from './pages/admin/program/EditProgram'
import OrderDetail from './pages/admin/order/OrderDetail'
import ContactAdmin from './pages/admin/contact/Contact'

import Footer from './components/Footer'
import Contact from './pages/Contact'
import Cgv from './pages/Cgv'
import Policy from './pages/Policy'
import './style/style.css'

import {useEffect} from 'react'
import { Helmet } from 'react-helmet'
import {Routes, Route, Navigate, useLocation} from 'react-router-dom'
import RequireAuth from './helpers/Require-auth'

function App() {
  const location = useLocation()

  useEffect(() => {
    document.title = "Greek God Gym"
  }, [location])

  return (
    <>
      <Helmet>
        <title>Greek God Gym</title>
      </Helmet>
      <Header />
      <main>
        <Routes>
          <Route path ='/' element={<RequireAuth child={Home} auth={false} admin={false} />}/>
          <Route path ='/register' element={<Register />}/>
          <Route path ='/login' element={<Login />}/>
          <Route path ='/profile' element={<RequireAuth child={Profile} auth={true} admin={false} />}/>
          <Route path ='/programs' element={<RequireAuth child={Program} auth={true} admin={false} />}/>
          <Route path ='/detail/:id' element={<RequireAuth child={Detail} auth={true} admin={false} />}/>
          <Route path ='/cart' element={<RequireAuth child={Cart} auth={true} admin={false} />}/>
          <Route path ='/payment/:orderId' element={<RequireAuth child={Payment} auth={true} admin={false} />}/>
          <Route path ='/success' element={<RequireAuth child={Success} auth={true} admin={false} />}/>
          <Route path ='/admin' element={<RequireAuth child={Admin} auth={true} admin={true} />}/>
          <Route path ='/addProgram' element={<RequireAuth child={AddProgram} auth={true} admin={true} />}/>
          <Route path ='/editProgram/:id' element={<RequireAuth child={EditProgram} auth={true} admin={true} />}/>
          <Route path ='/orderDetail/:id' element={<RequireAuth child={OrderDetail} auth={true} admin={true} />}/>
          <Route path ='/contactAdmin' element={<RequireAuth child={ContactAdmin} auth={true} admin={true} />}/>
          <Route path ='/contact' element={<RequireAuth child={Contact} auth={false} admin={false} />}/>
          <Route path ='/cgv' element={<RequireAuth child={Cgv} auth={false} admin={false} />}/>
          <Route path ='/policy' element={<RequireAuth child={Policy} auth={false} admin={false} />}/>
          <Route path ='*' element={<Navigate to='/' />}/>
        </Routes>
      </main>
      <Footer />  
    </>
  )
}

export default App
