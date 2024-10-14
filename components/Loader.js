import React from 'react'
function Loader() {
  return (
    <div className='loader-container w-full absolute flex flex-col justify-center top-0 left-0'>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Farmers:Sowing Seeds, Feeding Souls! </h2>
        <span className="loader"></span>
    </div>
  )
}

export default Loader