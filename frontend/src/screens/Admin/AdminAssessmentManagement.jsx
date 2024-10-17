import { IconButton } from '@mui/material'
import React from 'react'
import { IoArrowBackCircle } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import CourseTab from '../../components/Admin/CourseTab';
import LeadTab from '../../components/Admin/LeadTab';
import StudentTab from '../../components/Admin/StudentTab';
import TicketTab from '../../components/Admin/TicketTab';
import AssessmentTab from '../../components/Admin/AssessmentTab';
export default function AdminAssessmentManagement() {
const navigate = useNavigate()

  return (
    <div>

    <div className='mx-[100px] mt-10'>
        <div className='flex flex-col'>
            <div className='flex justify-center'>
                <div className='flex flex-row items-center px-5 py-2 justify-between border border-[#9C2949] border-solid rounded-[21px] bg-[rgba(178,178,178,0.20)] shadow-[0_4px_4px_rgba(0,0,0,0.50)]'> 
                    <div>
                        <img className='w-[100px] h-[100px]'  alt="web" />
                    </div>
                    <div>
                        <span className='font-bold text-[#484848]'>ASSESSMENT MANAGER</span>
                        <p>Manage your assessment content</p>
                    </div>
                </div>

            </div>
            <div className='text-xl'>
                <IconButton className='text-xl' size='large' onClick={()=>navigate("/admin/ticket")}>
                    <IoArrowBackCircle size={20}  />
                </IconButton>
            </div>
            <div>
                <AssessmentTab />
            </div>
        </div>
    </div>
    </div>
  )
}

