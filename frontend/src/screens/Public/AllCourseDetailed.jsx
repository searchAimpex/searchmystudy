import React, { useState, useEffect } from 'react';
import {
  useAllCourseMutation,
  useCountryFetchMutation,
  useFetchProvinceMutation,
  useFetchUniversityMutation,
} from '../../slices/adminApiSlice';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
  const [filters, setFilters] = useState({
    country: '',
    province: '',
    university: '',
    programLevel: '',
    category: '',
    scholarships: false,
    languageRequirement: '',
    standardizeRequirement: '',
  });

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
    getCountries();
  }, [fetchCountries]);

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

    return Object.keys(requirements)
      .filter((key) => requirements[key]?.status)
      .map((key) => (
        <div className="flex flex-row space-x-2">
          <p key={key} className="text-gray-600">
            {key}: {requirements[key].minRequirement}
          </p>
        </div>
      ));
  };

  const renderStandardizedRequirements = (requirements) => {
    if (!requirements) {
      return <div className="flex flex-row"><p className="text-gray-600">No standardized requirements available.</p></div>;
    }

    return Object.keys(requirements)
      .filter((key) => requirements[key]?.status)
      .map((key) => (
        <div className="flex flex-row space-x-2">
          <p key={key} className="flex flex-row space-x-2 text-gray-600">
            {key}: {requirements[key].minRequirement}
          </p>
        </div>
      ));
  };

  const renderIntakes = (intakes) => {
    if (!intakes || !Array.isArray(intakes)) {
      return <p className="text-gray-600">No intake information available.</p>;
    }

    return intakes
      .filter((intake) => intake.status)
      .map((intake, index) => (
        <div>
          <p key={index} className="flex flex-row space-x-2 text-gray-600">
            Intake Date: {intake.date}
          </p>
        </div>
      ));
  };

  return (
    <div className="flex flex-col lg:flex-row mx-[100px] my-[50px] space-y-6 lg:space-y-0 lg:space-x-10">
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
                placeholder="e.g., SAT, GRE"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full py-2 px-4 bg-blue-main text-white rounded hover:bg-white hover:text-blue-main font-bold transition-colors"
            >
              Search
            </button>
          </>
        )}
      </div>
      <div className="flex flex-col space-y-4 w-full lg:w-3/4">
        {courses.map((course, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <div className="grid grid-cols-3 gap-4 items-center">
              <div>
                <img
                  src={course.University.heroURL}
                  alt={course.ProgramName}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="col-span-2">
                <h3 className="text-xl font-bold mb-2">{course.ProgramName}</h3>
                <p className="text-gray-600 mb-2">{course.University.name}</p>
                <p className="text-gray-600 mb-2">{course.Location}</p>
                <div className="grid grid-cols-2 gap-4">
                  {course.Intake && (
                    <div>
                      <h4 className="text-md font-bold">Intake:</h4>
                      {renderIntakes(course.Intake)}
                    </div>
                  )}
                  {course.Duration && (
                    <div>
                      <h4 className="text-md font-bold">Duration:</h4>
                      <p className="text-gray-600">{course.Duration}</p>
                    </div>
                  )}
                  {course.Fees && (
                    <div>
                      <h4 className="text-md font-bold">Fees:</h4>
                      <p className="text-gray-600">{course.Fees}</p>
                    </div>
                  )}
                  {course.LanguageRequirements && (
                    <div>
                      <h4 className="text-md font-bold">Language Requirements:</h4>
                      {renderLanguageRequirements(course.LanguageRequirements)}
                    </div>
                  )}
                  {course.StandardizeRequirement && (
                    <div>
                      <h4 className="text-md font-bold">Standardized Requirements:</h4>
                      {renderStandardizedRequirements(course.StandardizeRequirement)}
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-4 space-x-4">
                  <button className="bg-blue-main text-white py-2 px-4 rounded hover:bg-blue-dark transition-colors">
                    Add Brochure
                  </button>
                  <button className="bg-blue-main text-white py-2 px-4 rounded hover:bg-blue-dark transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCourseDetailed;
