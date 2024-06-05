import React from 'react'

const Footer = ({image}) => {
  return (
    <div className=''>
    <div className='w-[70%] m-auto py-[20px] '>
        <h2 className='text-center text-purple-900 text-2xl font-semibold mb-[10px]'>Connect the Nodes to Get your Results</h2>
        {
            image && (
             <div className=''>
              <img
              src={image}
              alt="Detected"
              width={400}
             className="h-[600px] border-4 border-green-700 m-auto"
            />
            </div>
            )
        }
    </div>
    </div>
  )
}

export default Footer