import React from 'react'
import ContactUsForm from './ContactUsForm'

function ContactSection() {
  return (
    <div className='mt-[100px] py-2'>
    <div className='bg-custom-primary '>
        <div className='flex flex-col justify-center items-center p-[100px]'>
            <ContactUsForm />
        </div>
    </div>
    </div>
  )
}

export default ContactSection