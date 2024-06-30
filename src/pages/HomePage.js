import React from 'react'
import SideBar from '../component/SideBar/SideBar'
import Navbar from '../component/navbar'
const HomePage = () => {
  return (
    <>
      <div
      style={{
        display: "flex",
        overflow:"hidden"
      }}
    >
      <SideBar/>
      <Navbar />
    </div>
    </>
  )
}

export default HomePage
