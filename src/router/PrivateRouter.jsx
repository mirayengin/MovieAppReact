import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contex/GlobalContext';


const PrivateRouter = () => {
  // const userLoginStatus = true
  const {currentUser} = useContext(AuthContext)
  

  return (
    <>
     {currentUser?.email && <Outlet />}
    {!currentUser.email && <Navigate to="/login"/>}
    </>
  )
}

export default PrivateRouter