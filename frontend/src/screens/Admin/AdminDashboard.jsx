import React from 'react'
import WebManagement from '../../assets/WebManagement.png'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate= useNavigate()
  return (
    <div className='mx-[100px] mt-10'>
        <div className='grid grid-cols-4 gap-24'>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/webManager')}>
              <div className='border border-custom-color border-solid flex justify-center items-center p-10 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>WEBSITE MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer'  onClick={()=>navigate('/admin/blog')}>
              <div className='border border-custom-color border-solid flex justify-center items-center p-10 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>BLOG MANAGEMENT</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/course')}>
              <div className='border border-custom-color border-solid flex justify-center items-center p-10 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>COURSE MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/leads')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-10 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>LEAD MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/leads')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-10 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>NOTIFICATION MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/user')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-10 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>USER MANAGER</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard