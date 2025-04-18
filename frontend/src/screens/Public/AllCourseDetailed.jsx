import React, { useState, useEffect } from 'react';
import {
  useAllCourseMutation,
  useCountryFetchMutation,
  useFetchProvinceMutation,
  useFetchUniversityMutation,
} from '../../slices/adminApiSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Filter2Sharp } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const Program = [
  'High School',
  'UG Diploma/Certificate/Associate Degree',
  'UG',
  'PG Diploma',
  'PG',
  'UG+PG(Accelerated)Degree',
  'PhD',
  'Foundation',
  'Short Term Program',
  'Pathway Program',
  'Twinning Program(UG)',
  'Twinning Program(PG)',
  'Online Program/Distance Learning',
];

const categories = [
  'Arts',
  'Accounts',
  'Finance',
  'Marketing',
  'Science',
  'Medical',
  'Computers',
  'Engineering',
  'Law',
  'Education',
  'Social Sciences',
  'Business Administration',
  'Psychology',
  'Economics',
  'Architecture',
  'Environmental Science',
  'Nursing',
  'Hospitality Management',
  'Media and Communication',
  'Information Technology',
  'Pharmacy',
  'Agriculture',
  'Design',
  'Public Health',
  'Mathematics',
  'Data Science',
  'Artificial Intelligence',
];

const AllCourseDetailed = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const state = location.state;
  const [filters, setFilters] = useState({
    country: state.filters.country || '',
    province: '',
    university: '',
    programLevel: state.filters.category || '',
    category:state.filters.level ||  '',
    scholarships: false,
    languageRequirement: '',
    standardizeRequirement: '',
  });

  // console.log("state",state)
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const [AllCourse, { isLoading, isError }] = useAllCourseMutation();
  const [fetchCountries] = useCountryFetchMutation();
  const [fetchProvinces] = useFetchProvinceMutation();
  const [fetchUniversities] = useFetchUniversityMutation();

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

    const fetchInitialCourses = async () => {
      try {
        console.log("fitlers",filters)
        const result = await AllCourse(filters).unwrap();
        if (Array.isArray(result)) {
          setCourses(result);
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error during search:', error);
      }
    };

    getCountries();
    fetchInitialCourses();
  }, [fetchCountries, AllCourse, filters]);
  console.log("course",courses)
  const handleFilterChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFilters(newFilters);

    if (name === 'country') {
      try {
        const result = await fetchProvinces({ country: value }).unwrap();
        if (Array.isArray(result)) {
          setProvinces(result);
          setFilters({ ...newFilters, province: '', university: '' });
          setUniversities([]);
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    }

    if (name === 'province') {
      try {
        const result = await fetchUniversities({ province: value }).unwrap();
        if (Array.isArray(result)) {
          setUniversities(result);
          setFilters({ ...newFilters, university: '' });
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    }
  };

  const handleSearch = async () => {
    try {
      const result = await AllCourse(filters).unwrap();
      console.log("my results------------",result)
      if (Array.isArray(result)) {
        setCourses(result);
      } else {
        console.error('Expected an array but got:', result);
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  const renderLanguageRequirements = (requirements) => {
    if (!requirements) {
      return <p className="text-gray-600">No language requirements available.</p>;
    }

    return Object.keys(requirements).map((key) => {
      const requirement = requirements[key];
      return requirement.status ? (
        <div key={key}>
          <p className="text-gray-600">
            {key}: {requirement.minRequirement}
          </p>
        </div>
      ) : null;
    });
  };

  const renderStandardizedRequirements = (requirements) => {
    if (!requirements) {
      return <p className="text-gray-600">No standardized requirements available.</p>;
    }

    return Object.keys(requirements).map((key) => {
      const requirement = requirements[key];
      return requirement.status ? (
        <div key={key}>
          <p className="text-gray-600">
            {key}: {requirement.minRequirement}
          </p>
        </div>
      ) : null;
    });
  };

  const renderIntakes = (intakes) => {
    if (!intakes || !Array.isArray(intakes)) {
      return <p className="text-gray-600">No intake information available.</p>;
    }

    return intakes.map((intake, index) => {
      return intake.status ? (
        <div key={index}>
          <p className="flex flex-row space-x-2 text-gray-600">
            {intake.date}
          </p>
        </div>
      ) : null;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row mx-[9%0px] my-[50px] space-y-6 lg:space-y-0 lg:space-x-10">
      <div className="w-full lg:w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>

        {isExpanded && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Program Level</label>
              <select
                name="programLevel"
                value={filters.programLevel}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Program Level</option>
                {Program.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Scholarships</label>
              <input
                type="checkbox"
                name="scholarships"
                checked={filters.scholarships}
                onChange={handleFilterChange}
                className="mr-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Language Requirement</label>
              <input
                type="text"
                name="languageRequirement"
                value={filters.languageRequirement}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., IELTS, TOEFL"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Standardized Requirement</label>
              <input
                type="text"
                name="standardizeRequirement"
                value={filters.standardizeRequirement}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., GRE, GMAT"
              />
            </div> 
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Country</label>
              <select
                name="country"
                value={filters.country}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {filters.country && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Province</label>
                <select
                  name="province"
                  value={filters.province}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Province</option>
                  {provinces.map((province) => (
                    <option key={province} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {filters.province && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">University</label>
                <select
                  name="university"
                  value={filters.university}
                  onChange={handleFilterChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select University</option>
                  {universities.map((university) => (
                    <option key={university} value={university._id}>
                      {university.name
                      
                      
                      }
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="mb-4">
              <button
                onClick={handleSearch}
                className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Search
              </button>
            </div>
          </>
        )}
      </div>

      <div className="w-full lg:w-3/4 p-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-600">Error loading courses</p>
        ) : (
          <div className="space-y-4">
         {courses.map((course) => (
  <div
    key={course._id}
    style={{
      boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(0, 0, 0, 0.1)',
    }}
    className="bg-white p-4 flex flex-col md:flex-row gap-6 rounded-lg"
  >
    {/* Image Section */}
    <div className="w-full md:w-[350px] flex justify-center items-center">
      <img
        className="h-[200px] md:h-[250px] w-full object-contain rounded-lg"
        src={course.University.logo}
        alt={course.University.name}
      />
    </div>

    {/* Details Section */}
    <div className="flex flex-col gap-3 w-full">
      {/* University Name */}
      <div className="text-lg md:text-xl font-bold">
        🎓 University: {course?.University?.name}
      </div>

      {/* Program Name and Category */}
      <div className="text-base flex flex-wrap gap-2 font-semibold">
        <span>{course?.ProgramName}</span>
        <span className="text-gray-500">| {course?.Category}</span>
      </div>

      {/* Fees and Duration */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="bg-blue-main text-white px-4 py-2 rounded-xl font-semibold w-fit">
          💸 Fees: {course?.Fees} INR
        </div>
        <div className="text-sm font-medium text-gray-600">
          ⏳ Duration: {course?.Duration}
        </div>
      </div>

      {/* Program Level and Type */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="bg-blue-main text-white px-4 py-2 rounded-xl font-semibold w-fit">
          🎯 Level: {course?.ProgramLevel}
        </div>
        <div className="text-sm font-medium text-gray-600">
          🏫 Type: {course?.University?.type}
        </div>
      </div>

      {/* Rank and Rating */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="text-sm font-medium text-gray-600">
          ⭐ Rank: {course?.University?.rank}
        </div>
        <div className="text-sm font-medium text-gray-600">
          🌟 Rating: {course?.University?.rating}
        </div>
      </div>

      {/* Location and View Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div className="text-base font-semibold text-gray-800">
          📍 Location: {course?.Location}
        </div>
        <button
          className="bg-blue-main hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg font-semibold"
          onClick={() => navigate(`/course/${course._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  </div>
))}

          </div>
        )}
      </div>
    </div>
  );
};
export default AllCourseDetailed;
