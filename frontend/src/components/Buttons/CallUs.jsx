import React from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
export default  function CallUs() {
  return (
    <div className='flex flex-row w-full items-center border-4 border-custom-color border-solid  rounded-md px-3 py-1 space-x-4 justify-between'>
        <div className='text-custom-color font-bold'>
         <LocalPhoneIcon />
        </div>
        <div className='flex flex-col justify-start text-custom-color'>
            <div className='flex justify-center'>
                <h1 className='text-xs font-bold'>CALL US NOW</h1>
            </div>
            <p className='font-bold text-xs'>+911234567890</p>
        </div>
    </div>
  )
}

