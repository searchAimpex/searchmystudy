import React from 'react'
import ShopIcon from '@mui/icons-material/Shop';
export default function DownloadApp() {
  return (
    <div className='flex flex-row w-full items-center border-4 border-custom-color border-solid  rounded-md px-3 py-1 space-x-4 justify-between'>
    <div className='text-custom-color font-bold'>
     <ShopIcon />
    </div>
    <div className='flex flex-col w-full  text-custom-color'>
        
            <h1 className='text-xs font-bold'>DOWNLOAD</h1>
        
        <p className='font-bold text-xs'>CAREER PLANER</p>
    </div>
</div>
  )
}
