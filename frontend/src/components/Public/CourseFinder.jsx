import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';

const Categories = ['High School', 'UG Diploma/Certificate/Associate Degree', 'UG', 'PG Diploma', 'PG', 'UG+PG(Accelerated)Degree', 'PhD', 'Foundation', 'Short Term Program', 'Pathway Program', 'Twinning Program(UG)', 'Twinning Program(PG)', 'Online Program/Distance Learning'];
const Levels = [
    'Arts', 'Accounts', 'Finance', 'Marketing', 'Science', 'Medical', 'Computers', 'Engineering', 'Law', 'Education', 'Social Sciences', 'Business Administration', 'Psychology', 'Economics', 'Architecture', 'Environmental Science', 'Nursing', 'Hospitality Management', 'Media and Communication', 'Information Technology', 'Pharmacy', 'Agriculture', 'Design', 'Public Health', 'Mathematics', 'Data Science', 'Artificial Intelligence'
];

export default function CourseFinder() {
  const [filters, setFilters] = useState({
    category: '',
    level: '',
    scholarship: ''
  });
  const [countries, setCountries] = useState([]);
  const [fetchCountries] = useCountryFetchMutation();

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await fetchCountries().unwrap();
        if (Array.isArray(result)) {
          setCountries(result);
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    getCountries()
  },[] )

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSearch = () => {
    navigate('/course/all', { state: { filters } });
  };

  return (
    <div className='mx-[200px] my-[20px]'>
      <div className='flex flex-col p-5 justify-center items-center'>
        <div className='flex flex-row w-full space-x-2 justify-center items-center'>
          <span className='text-4xl font-bold text-blue-main'>Find</span>
          <span className='text-4xl font-bold text-gold-main'>Your</span>
          <span className='text-4xl font-bold text-blue-main'>Ideal</span>
          <span className='text-4xl font-bold text-gold-main'>Course</span>

          </div>
        <div className='my-5'>
          <p className='text-lg font-bold text-gray-600'>Discover dedicated professionals ready to support you on your journey</p>
        </div>
        <div className='flex flex-row mt-5 pb-10 items-center justify-between w-full space-x-4'>
          <select name="category" onChange={handleChange} className='p-2 border border-blue-main text-gold-main rounded-lg'>
            <option value="">All Course Categories</option>
            {Categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select name="level" onChange={handleChange} className='p-2 border border-blue-main text-gold-main rounded-lg'>
            <option value="">All Course Levels</option>
            {Levels.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <select
                name="country"
                value={filters.country}
                onChange={handleChange}
                 className='p-2 border border-blue-main text-gold-main rounded-lg'
              >
                <option value="">Select Country</option>
                {countries?.map((country) => (
                  <option key={country} value={country._id}>
                    {country.name}
                  </option>
                ))}
            </select>
          <button onClick={handleSearch} className='px-10 py-3 text-white rounded-md bg-blue-main font-bold'>Search</button>
        </div>
      </div>
    </div>
  );
}
