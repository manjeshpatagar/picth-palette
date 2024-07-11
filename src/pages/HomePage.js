import React, { useEffect } from 'react'
import SideBar from '../component/SideBar/SideBar'
import Navbar from '../component/navbar'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token)
      navigate('/login');
  }, [])
  return (
    <>
      <div
        style={{
          display: "flex",
          overflow: "hidden"
        }}
      >
        <SideBar />
        <Navbar />
      </div>
    </>
  )
}

export default HomePage
