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
import styled from 'styled-components';
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
    category: state.filters.level || '',
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
        console.log("fitlers", filters)
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
  console.log("course", courses)
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
      console.log("my results------------", result)
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
            {/* {filters.country && (
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
            )} */}
            {/* {filters.province && (
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
            )} */}
            <div className="mb-4">


              <StyledWrapper1>
                <button onClick={handleSearch} className="button w-[100%]">  Search
                </button>
              </StyledWrapper1>
            </div>
          </>
        )}
      </div>

      <div className="w-full lg:w-3/4 ">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-600">Error loading courses</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white flex flex-col md:flex-row  gap-4 rounded-lg "
                style={{
                  boxShadow:
                    '4px 4px 10px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Image Section */}
                <div className="w-full md:w-[45%] relative flex justify-center items-center">
                  <div className="relative w-full  w-full h-[100%] ">
                    {/* Hero Image */}
                    <img
                      className="object-cover w-full h-[100%]"
                      src={course.University.heroURL}
                      alt={course.University.name}
                    />

                    {/* Black Overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 to-transparent z-10"></div>

                  </div>

                  {/* Logo */}
                  <img
                    className="absolute top-2 right-2 w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-full border-2 border-white object-cover bg-white shadow-lg z-20"
                    src={course.University.logo}
                    alt={course.University.name}
                  />

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg z-20">
                    {course.University.type}
                  </div>

                  {/* Admission Badge */}
                  <div className="absolute bottom-2 left-2 px-2 py-1  text-green-500 font-bold text-2xl shadow z-20">
                    Admission open
                  </div>
                </div>

                {/* Details Section */}
                <div className="flex flex-col w-full ">
                  <h1 className="text-lg md:text-2xl my-2 font-bold">
                    {course?.University?.name}
                  </h1>
                  <hr />

                  {/* Program Info */}
                  <div className="flex flex-col md:flex-row m-2 justify-between gap-6">
                    {/* Left Column */}
                    <div className="flex-1 space-y-2">
                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Program Type:</span>
                        <span>{course?.University?.type}</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Program:</span>
                        <span>{course?.ProgramName}</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Category:</span>
                        <span>{course?.Category}</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Fees:</span>
                        <span>{course?.Fees} INR</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Level:</span>
                        <span>{course?.ProgramLevel}</span>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 space-y-2 ">
                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Grade:</span>
                        <span>{course?.University?.grade}</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Intake:</span>
                        <span> {new Date(course?.Intake[0].date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })} - {new Date(course?.Intake[0].expiresAt).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2">
                        <span className="font-semibold">Duration:</span>
                        <span>{course?.Duration}</span>
                      </div>

                      <div className="text-sm sm:text-base flex flex-wrap gap-2 items-center">
                        {/* Star Rating */}
                        <span className="font-semibold">Location:</span>
                        <span>  {course?.Location}</span>

                      </div>


                      <div className="text-sm sm:text-base flex flex-wrap gap-2 items-center">
                        {/* Star Rating */}
                        <span className="font-semibold">Rating:</span>
                        <div className="flex text-yellow-500">

                          {Array.from({ length: course?.University?.rank || 0 }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>



                    </div>
                  </div>

                  <hr />
                  {/* Location & Button */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2 my-6 w-full">
                    <StyledWrapper className="w-full md:w-auto">
                      <button onClick={() => navigate(`/course/${course._id}`)} className="button w-full md:w-auto">
                        View Details
                      </button>
                    </StyledWrapper>

                    <StyledWrapper1 className="w-full md:w-auto">
                      <button onClick={() => navigate(`/course/${course._id}`)} className="button w-full md:w-auto">
                        Download Brochure
                      </button>
                    </StyledWrapper1>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );

  // export default Button;

};
export default AllCourseDetailed;
const StyledWrapper = styled.div`
.button {
 --color: #db7e19 ;
 padding: 0.5em 1.3em;
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 500;
 font-size: 14px;
 border: 2px solid;
 font-family: inherit;
//  text-transform: uppercase;
 color: var(--color);
//  font-weight: 700;     
 z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {

 color: rgb(255, 255, 255);
}

.button:active {
 filter: brightness(.8);
}`;

const StyledWrapper1 = styled.div`
.button {
 --color: #264790 ;
 padding: 0.5em 1.3em;
 background-color: transparent;
 border-radius: .3em;
 position: relative;
 overflow: hidden;
 cursor: pointer;
 transition: .5s;
 font-weight: 500;
 font-size: 14px;
 border: 2px solid;
 font-family: inherit;
//  text-transform: uppercase;
 color: var(--color);
//  font-weight: 700;     
 z-index: 1;
}

.button::before, .button::after {
 content: '';
 display: block;
 width: 50px;
 height: 50px;
 transform: translate(-50%, -50%);
 position: absolute;
 border-radius: 50%;
 z-index: -1;
 background-color: var(--color);
 transition: 1s ease;
}

.button::before {
 top: -1em;
 left: -1em;
}

.button::after {
 left: calc(100% + 1em);
 top: calc(100% + 1em);
}

.button:hover::before, .button:hover::after {
 height: 410px;
 width: 410px;
}

.button:hover {

 color: rgb(255, 255, 255);
}

.button:active {
 filter: brightness(.8);
}`;