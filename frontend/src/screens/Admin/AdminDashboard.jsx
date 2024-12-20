import React from 'react'
import WebManagement from '../../assets/WebManagement.png'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate= useNavigate()
  return (
    <div className='mx-[100px] mt-10'>
        <div className='grid grid-cols-4 gap-10'>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/webManager')}>
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>WEBSITE MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer'  onClick={()=>navigate('/admin/blog')}>
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>BLOG MANAGEMENT</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/course')}>
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>COURSE MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/leads')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>LEAD MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/notification')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>NOTIFICATION MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/user')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>USER MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/student')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>STUDENT MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/ticket')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>TICKET MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/assessment')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>ASSESSMENT MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/upload')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>UPLOAD MANAGER</span>
              </div>
            </div>
            <div className='flex flex-col cursor-pointer' onClick={()=>navigate('/admin/transaction')}> 
              <div className='border border-custom-color border-solid flex justify-center items-center p-1 rounded-lg'>
                <img src={WebManagement} alt="web" />
              </div>
              <div className='flex items-center justify-center'>
                <span>TRANSACTION MANAGER</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard