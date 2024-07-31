import React from 'react'

export default function CourseFinder() {
  return (
    <div className='mx-[100px] my-[20px]'>
        <div className='flex flex-col shadow-xl rounded-md p-5 justify-center items-center'>
            <div>
                <p className=' text-4xl  font-bold  text-gradient'>Find Cousrse</p>
            </div>  
            <div className='my-5'>
               <p className='text-2xl font-bold  text-gradient'>Discover dedicated professionals ready to support you on your journey</p>
            </div>
            <div className='flex flex-row mt-5 pb-10 items-center justify-between w-full space-x-4'>
                <select className='p-2 border border-custom-color text-custom-color rounded-sm'>
                    <option value="">All Universities</option>
                    <option value="">University of Australia</option>
                    <option value="">University of New South Wales</option>
                    <option value="">University of Sydney</option>
                    <option value="">University of Melbourne</option>
                    <option value="">University of Queensland</option>
                    <option value="">University of Western Sydney</option>
                    <option value="">University of Tasmania</option>
                    <option value="">University of Victoria</option>
                    <option value="">University of South Australia</option>
                    <option value="">University of Canberra</option>
                    <option value="">University of Adelaide</option>
                    <option value="">University of Southern Queensland</option>
                    <option value="">University of Hawkebury</option>
                    <option value="">University of Wollongong</option>
                </select>
                <select  className='p-2 border border-custom-color text-custom-color rounded-sm'>
                    <option value="">All Course Categories</option>
                    <option value="">Computer Science</option>
                    <option value="">Business Administration</option>
                    <option value="">Education</option>
                    <option value="">Health &amp; Wellness</option>
                    <option value="">Arts &amp; Humanities</option>
                    <option value="">Science &amp; Engineering</option>
                    <option value="">Language</option>
                    <option value="">Creative Arts</option>
                    <option value="">Travel &amp; Leisure</option>
                    <option value="">Sports &amp; Recreation</option>
                    <option value="">Science &amp; Technology</option>
                    <option value="">Music &amp; Performing Arts</option>
                    <option value="">Health &amp; Wellness</option>
                    <option value="">Arts &amp; Humanities</option>
                    <option value="">Science &amp; Engineering</option>
                </select>
                <select  className='p-2 border border-custom-color text-custom-color rounded-sm'>
                    <option value="">All Course Levels</option>
                    <option value="">Undergraduate</option>
                    <option value="">Postgraduate</option>
                    <option value="">Distance Learning</option>
                    <option value="">International</option>
                    <option value="">Career Counselling</option>
                    <option value="">Diploma</option>
                    <option value="">Advanced Diploma</option>
                    <option value="">Degree</option>
                    <option value="">Professional Certificate</option>
                    <option value="">Diploma in Business Administration</option>
                    <option value="">Diploma in Computer Science</option>
                    <option value="">Diploma in Business Administration</option>
                    <option value="">Diploma in Education</option>
                    <option value="">Diploma in Health &amp; Wellness</option>
                    <option value="">Diploma in Arts &amp; Human</option>
                </select>
                <select  className='p-2 border border-custom-color text-custom-color rounded-sm'>
                    <option value="">All Course Levels</option>
                    <option value="">Undergraduate</option>
                    <option value="">Postgraduate</option>
                    <option value="">Distance Learning</option>
                    <option value="">International</option>
                    <option value="">Career Counselling</option>
                    <option value="">Diploma</option>
                    <option value="">Advanced Diploma</option>
                    <option value="">Degree</option>
                    <option value="">Professional Certificate</option>
                    <option value="">Diploma in Business Administration</option>
                    <option value="">Diploma in Computer Science</option>
                    <option value="">Diploma in Business Administration</option>
                    <option value="">Diploma in Education</option>
                    <option value="">Diploma in Health &amp; Wellness</option>
                    <option value="">Diploma in Arts &amp; Human</option>
                </select>
                <button className='px-10 py-3 text-white rounded-md bg-gradient-to-r from-blue-500 to-purple-500'>Search</button>
            </div>
        </div>
    </div>
  )
}
