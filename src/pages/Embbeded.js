import React from 'react'
import Renderrer from '../component/Renderrer'

const Embedded = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          overflow: "hidden"
        }}
      >
        <Renderrer />
      </div>
    </>
  )
}

export default Embedded
