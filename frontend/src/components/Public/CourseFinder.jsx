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
  }, [])

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
    <div className='rounded-3xl relative bottom-[50px] pb-5 bg-white m-auto course_finder my-[20px] w-[80%] shadow-[0_0_12px_#0004]
' style={{ border: "0px solid black" }}>
      <div 

      
      className='flex flex-col p-5 justify-center items-center'>
        <div className="flex flex-wrap  gap-x-2 gap-y-1 ">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">Find</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-main">Your</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-main">Ideal</span>
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold-main">Course</span>
        </div>
        <div className='my-5'>
          <p className="text-lg text-left sm:text-base md:text-lg lg:text-xl font-semibold text-gray-500  ">
            Discover dedicated professionals ready to support you on your journey</p>
        </div>
        <div className='course_checker flex flex-row mt-5  items-center justify-center w-full gap-10'>
          <div>
            <select name="category" onChange={handleChange} className='course p-2 w-[200px] border border-gray-400  rounded-lg'
            >
              <option value="">All Course Categories</option>
              {Categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <select name="level" onChange={handleChange} className='level p-2 w-[200px] border border-gray-400  rounded-lg'>
              <option value="">All Course Levels</option>
              {Levels.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>


          <div>
            <select
              name="country"
              value={filters.country}
              onChange={handleChange}
              className='country p-2 w-[200px] border border-gray-400  rounded-lg'
            >
              <option value="">Select Country</option>
              {countries?.map((country) => (
                <option key={country} value={country._id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleSearch} className='subt_btn px-10 py-3 text-white rounded-md bg-blue-main font-bold'>Search</button>
        </div>
      </div>
    </div>
  );
}
