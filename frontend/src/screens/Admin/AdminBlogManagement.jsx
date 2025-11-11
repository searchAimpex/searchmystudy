import { IconButton } from '@mui/material'
import React from 'react'
import { IoArrowBackCircle } from 'react-icons/io5'
import BlogTable from '../../components/Admin/BlogTable'
import { useNavigate } from 'react-router-dom'

export default function AdminBlogManagement() {
    const navigate = useNavigate()
  return (
    <div className='mx-[100px] mt[20px]'>
        <div className='flex flex-col'>
            <div className='my-[20px]'>
                <span className='text-4xl font-bold'>BLOG MANAGEMENT</span>
            </div>
            <div className='my-[20px]'>
                <div className='text-xl'>
                    <IconButton className='text-xl'content='GO BACK'  size='large' onClick={()=>navigate("/admin/dashboard")}>
                        <IoArrowBackCircle size={20}  />
                    </IconButton>
                </div>
            </div>
            <div className='my-[20px]'>
                <BlogTable />
            </div>
        </div>
    </div>
  )
}