import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllCourseMutation, useCountryFetchMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';

const Categories = [
  'High School', 'UG Diploma/Certificate/Associate Degree', 'UG', 'PG Diploma', 'PG',
  'UG+PG(Accelerated)Degree', 'PhD', 'Foundation', 'Short Term Program',
  'Pathway Program', 'Twinning Program(UG)', 'Twinning Program(PG)', 'Online Program/Distance Learning'
];

const Levels = [
  'Arts', 'Accounts', 'Finance', 'Marketing', 'Science', 'Medical', 'Computers',
  'Engineering', 'Law', 'Education', 'Social Sciences', 'Business Administration',
  'Psychology', 'Economics', 'Architecture', 'Environmental Science', 'Nursing',
  'Hospitality Management', 'Media and Communication', 'Information Technology',
  'Pharmacy', 'Agriculture', 'Design', 'Public Health', 'Mathematics', 'Data Science',
  'Artificial Intelligence'
];

export default function CourseFinder() {
    const [AllCourse, { isLoading, isError }] = useAllCourseMutation();
      const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    programLevel: '',
    country: ''
  });
  const [countries, setCountries] = useState([]);
  const [fetchCountries] = useCountryFetchMutation();
  const navigate = useNavigate();

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
    getCountries();
  }, [fetchCountries]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };


    const handleSearch = async () => {
    try {
      const result = await AllCourse(filters).unwrap();
      console.log("my results------------", filters)
      if (Array.isArray(result)) {
        setCourses(result);
 navigate('/course/all', { state: { filters } });
      } else {
        console.error('Expected an array but got:', result);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  // const handleSearch = () => {
  //   const { category, level, country } = filters;
  //   if (category && level) {
  //     navigate('/course/all', { state: { filters } });
  //   } else {
  //     toast.error("category and level are required.");
  //   }
  // };

  return (
    <div className='rounded-3xl relative md:bottom-[30px]  bg-white mx-auto  w-[90%] md:w-[80%] shadow-[0_0_12px_#0004]'>
      <div className='flex flex-col p-5 justify-center items-center'>
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-center justify-center">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Find</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">Your</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-main">Ideal</span>
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold-main">Course</span>
        </div>
        <p className="mt-3 text-center text-sm sm:text-base md:text-lg font-semibold text-gray-500 max-w-2xl">
          Discover dedicated professionals ready to support you on your journey
        </p>

        <div className='mt-6 flex flex-col lg:flex-row gap-4 items-center justify-center w-full flex-wrap'>
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className='p-2 w-[250px] border border-gray-300 rounded-lg'
          >
            <option value="">All Course Categories</option>
            {Categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <select
            name="level"
            value={filters.level}
            onChange={handleChange}
            className='p-2 w-[250px] border border-gray-300 rounded-lg'
          >
            <option value="">All Course Levels</option>
            {Levels.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <select
            name="country"
            value={filters.country}
            onChange={handleChange}
            className='p-2 w-[250px] border border-gray-300 rounded-lg'
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className='px-10 py-3 text-white bg-blue-main rounded-md font-bold hover:bg-blue-700 transition duration-200'
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

