import React, { useState, useEffect } from 'react';
import {
  useAllCourseMutation,
  useCountryFetchMutation,
  useFetchProvinceMutation,
  useFetchUniversityMutation,
} from '../../slices/adminApiSlice';
import ErrorIcon from '@mui/icons-material/Error';
import { Range } from "react-range";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Filter2Sharp } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
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
  const [courses, setCourses] = useState([]);
  console.log(courses, "+++++++++++++++++++++++++++++++++++")
  const navigate = useNavigate()
  const location = useLocation();
  const state = location.state;

  const [values, setValues] = useState([2000, 10000000]); // [min, max]

  const [filters, setFilters] = useState({
    country: state.filters?.country || '',
    // province: '',
    university: '',
    type: "",
    programLevel: state.filters?.category || '',
    category: state.filters?.level || '',
    // scholarships: false,
    // languageRequirement: '',
    // standardizeRequirement: '',
    gradeRank: '',
    intakeDate: '',
    universityName: '',
    mciApproval: false,
    ecfmgApproval: false,
    nmcApproval: false,
    whoApproval: false,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log(filters, ":::::::::::::::::::::::::::::::::::::::");
        const result = await AllCourse(filters).unwrap();
        if (Array.isArray(result)) {
          setCourses(result);
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);
  // console.log("state",state)
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [FetchUniversity, { isRunning }] = useFetchUniversityMutation();

  const [isExpanded, setIsExpanded] = useState(true);
  const { singleCourse } = useSelector((state) => state.course);
  const [AllCourse, { isLoading, isError }] = useAllCourseMutation();
  const [fetchCountries] = useCountryFetchMutation();
  const [fetchProvinces] = useFetchProvinceMutation();
  const [fetchUniversities] = useFetchUniversityMutation();
  const [university, setUniversity] = useState()
  const unversity = async () => {
    try {
      const result = await FetchUniversity().unwrap();
      setUniversity(result)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await fetchCountries().unwrap();
        unversity()

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

        const result = await AllCourse().unwrap();

        if (Array.isArray(result)) {
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
  // console.log("course", courses)
  // console.log("fitlers", filters)




  const handleSearch = async () => {
    try {
      const searchFilters = {
        ...filters,
        minFees: values[0],
        maxFees: values[1]
      };
      const result = await AllCourse(searchFilters).unwrap();
      console.log("my results------------", searchFilters)
      // if (Array.isArray(result)) {
        setCourses(result.courses);
      // } else {
        // console.error('Expected an array but got:', result);
      // }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };



  const handleFilterChange = async (e) => {
    const { name, value, type, checked } = e.target;
    const newFilters = {
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFilters(newFilters);

    const searchFilters = {
      ...newFilters,
      minFees: values[0],
      maxFees: values[1]
    };

    const result = await AllCourse(searchFilters).unwrap();
    console.log(newFilters, "************************************{{{{{{{{{{{{{{{{{{{{{{{{{{{{****************");

    if (Array.isArray(result)) {
      setCourses(result);
    }
    // console.log('Country selected:', value);
    // console.log('Updated filters:', newFilters);
  };
  const openBrochure = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
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
    <div className="flex flex-col lg:flex-row mx-[9%0px] pt-4 bg-gray-100 space-y-6 lg:space-y-0 lg:space-x-10">
      <div className="w-full lg:w-1/4 p-4 bg-white rounded-lg ">
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
                value={filters?.programLevel}
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
                value={filters?.category}
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
            {/* <div className="mb-4">
              <label className="block mb-2 font-semibold">Scholarships</label>
              <input
                type="checkbox"
                name="scholarships"
                checked={filters?.scholarships}
                onChange={handleFilterChange}
                className="mr-2"
              />
            </div> */}






            <div className="mb-4">
              <label className="block mb-2 font-semibold">Country</label>
              <select
                name="country"
                value={filters?.country}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select Country</option>
                {countries?.map((country) => (
                  <option key={country} value={country?._id}>
                    {country?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-gray-700 font-medium text-lg">
                Fees Range
              </label>

              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Min {values[0].toLocaleString()}</span>
                <span>Max {values[1].toLocaleString()}</span>
              </div>

              <Range
                step={500}
                min={1000}
                max={10000000}
                values={values}
                onChange={(vals) => setValues(vals)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className="relative h-3 w-full rounded-full bg-gray-200"
                  >
                    <div
                      className="absolute h-3 rounded-full bg-blue-500"
                      style={{
                        left: `${((values[0] - 1000) / (10000000 - 1000)) * 100}%`,
                        width: `${((values[1] - values[0]) / (10000000 - 1000)) * 100}%`,
                      }}
                    />
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="h-5 w-5 bg-white border-2 border-blue-500 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform"
                  />
                )}
              />
            </div>


            <div className="mb-4">
              <label className="block mb-2 font-semibold">Type</label>
              <select
                name="type"
                value={filters?.type}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {
                  ["Public", "Private"].map((ele) => {
                    return (
                      <option value={ele}>{ele}</option>
                    );
                  })
                }
                {/* <option value="private">Private</option> */}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Intake Date</label>
              <input
                type="date"
                name="intakeDate"
                // value={filters?.intakeDate}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">University Name</label>
              <select
                name="university"
                // value={filters?.university}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {
                  university?.map((ele) => {
                    return (
                      <option value={ele._id}>{ele.name}</option>
                    );
                  })
                }
              </select>
            </div>

            <div className="mb-6">
              <label className="block mb-3 text-gray-700 font-medium text-lg">
                Approvals
              </label>

              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
                <label className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="mciApproval"
                    checked={filters?.mciApproval || false}
                    onChange={handleFilterChange}
                    className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">MCI Approved</span>
                </label>

                <label className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="ecfmgApproval"
                    checked={filters?.ecfmgApproval}
                    onChange={handleFilterChange}
                    className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">ECFMG Approved</span>
                </label>

                <label className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="whoApproval"
                    checked={filters?.whoApproval}
                    onChange={handleFilterChange}
                    className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">WHO Approved</span>
                </label>

                <label className="flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded transition">
                  <input
                    type="checkbox"
                    name="nmcApproval"
                    checked={filters?.nmcApproval}
                    onChange={handleFilterChange}
                    className="mr-3 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 font-medium">NMC Approved</span>
                </label>
              </div>
            </div>




            {/* <div className="mb-4">
              <label className="block mb-2 font-semibold">Language Requirement</label>
              <input
                type="text"
                name="languageRequirement"
                value={filters?.languageRequirement}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., IELTS, TOEFL"
              />
            </div> 
            {/* <div className="mb-4">
              <label className="block mb-2 font-semibold">Standardized Requirement</label>
              <input
                type="text"
                name="standardizeRequirement"
                value={filters?.standardizeRequirement}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="e.g., GRE, GMAT"
              />
            </div> */}
            {/* {filters?.country && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">Province</label>
                <select
                  name="province"
                  value={filters?.province}
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
            {/* {filters?.province && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">University</label>
                <select
                  name="university"
                  value={filters?.university}
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
          <div className="flex flex-col gap-8">
            {courses.map((course) =>
              course?.University?.Country?.mbbsAbroad ? (
                <div
                  key={course._id}
                  className="bg-white h-auto flex flex-col md:flex-row  rounded-lg shadow-md overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="w-full md:w-[45%] relative flex justify-center items-center">
                    <div className="relative w-full ">
                      <img
                        className="w-full h-full"
                        src={course?.University?.heroURL}
                        alt={course?.University?.name}
                      />
                      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 to-transparent z-10" />
                    </div>

                    {/* University Logo */}
                    <img
                      className="absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white object-cover bg-white shadow-lg z-20"
                      src={course?.University?.logo}
                      alt={course?.University?.name}
                    />

                    {/* University Type */}
                    <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg z-20">
                      {course?.University?.type}
                    </div>

                    {/* Admission Open (Desktop/Tablet Only) */}
                    <div className="absolute bottom-2 left-2 px-2 py-1 text-green-500 font-bold text-lg sm:text-xl z-20 hidden sm:block">
                      Admission Opend
                    </div>

                    {/* Admission Open (Mobile Only - Centered) */}
                    <div className="absolute inset-0 flex items-center justify-center sm:hidden z-20">
                      <span className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-lg shadow-lg">
                        Admission Open
                      </span>
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="flex flex-col w-full ">

                    {course.University?.intake?.status ? (
                      <div className='text-gray-800' style={{ background: "#db7e1963", padding: "4px 30px 4px 30px" }}>Admission is Closed for Jan Intake</div>

                    ) : (
                      <div className='text-gray-800' style={{ background: "#2647903b", padding: "4px 30px 4px 30px" }}>Admission Open for Jan Intake</div>

                    )}


                    <div className='px-3 mt-3'>


                      <div className="  flex flex-wrap items-center gap-2  text-sm sm:text-base">
                        <h1 className="text-lg mt-2 sm:text-xl md:text-xl font-semibold mb-2 break-words">
                          {course?.University?.name}
                        </h1>
                        <p className="text-gold-main font-semibold">{course?.ProgramName}</p>
                        <span className="hidden sm:block border h-5" />
                        <p>{course?.ProgramLevel}</p>
                        <span className="hidden sm:block border h-5" />
                        <p>{course?.University?.Country?.name}</p>
                      </div>

                      <hr className="" />

                      {/* Info Section */}
                      <div className="mt-3 flex flex-col md:flex-row gap-4">
                        {/* Column 1 */}

                        <div className="flex w-full md:w-1/2">
                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            <p><span className="font-semibold">University Type</span></p>
                            <p><span className="font-semibold">University Grade</span></p>
                            {/* <p><span className="font-semibold">World Rank</span></p> */}
                            <p><span className="font-semibold">Total Years/Sem</span></p>
                            <p><span className="font-semibold">Location</span></p>
                            {/* {course?.University?.ECFMG && <p><span className="font-semibold">FMGE</span></p>} */}
                            {/* {course?.University?.NMC && <p><span className="font-semibold">NMC</span></p>} */}
                          </div>

                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            <p>: {course?.University?.type}</p>
                            <p>: {course?.University?.grade}</p>
                            {/* <p>: {course?.University?.rank}</p> */}
                            <p>: {course?.Fees?.breakdown.length} {course?.Fees?.mode}s</p>
                            <p>: {course?.Location}</p>
                            {/* {course?.University?.MCI && <p>: Approved</p>} */}
                            {/* {course?.University?.WHO && <p>: Approved</p>} */}
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="flex w-full md:w-1/2">
                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            {/* <p><span className="font-semibold">Category</span></p> */}
                            <p><span className="font-semibold">University Grade</span></p>
                            <p><span className="font-semibold">Duration</span></p>
                            <p><span className="font-semibold">Complete Fees</span></p>
                            {/* {course?.University?.MCI && <p><span className="font-semibold">MCI</span></p>} */}
                            {/* {course?.University?.WHO && <p><span className="font-semibold">NMC</span></p>} */}
                            <p><span className="font-semibold">Intake</span></p>
                          </div>

                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            {/* <p>: {course?.Category}</p> */}
                            <p>: {course?.ProgramLevel}</p>
                            <p>: {course?.Duration}</p>
                            <p>: {course?.completeFees?.amount} {course?.completeFees?.currency}</p>
                            {/* {course?.University?.MCI && <p>: Approved</p>} */}
                            {/* {course?.University?.WHO && <p>: Approved</p>}
                         */}

                            {/* Intake Badges */}
                            <div className="flex flex-wrap gap-2">
                              {course?.Intake?.slice(0, 2).map((intake, index) => {
                                // const isExpired = new Date(intake?.end_date) < new Date();
                                return (
                                  <div key={index} className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-0.5 rounded-md text-xs ${!intake?.status ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                                        }`}
                                    >
                                      {intake?.status ? "Open" : "Closed"}
                                    </span>
                                    <span className="border px-2 py-1 rounded-lg text-xs sm:text-sm">
                                      <ErrorIcon sx={{ fontSize: "16px" }} />
                                      <span className="ml-1">
                                        {intake?.end_date
                                          ? new Date(intake.end_date).toLocaleDateString("en-GB", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "2-digit",
                                          })
                                          : ""}
                                      </span>

                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="" />

                      {/* CTA Buttons */}
                      <div className="mt-3 mb-2 flex flex-col sm:flex-row gap-3">
                        <StyledWrapper className="w-full sm:w-auto">
                          <button
                            onClick={() => navigate(`/course/${course._id}`)}
                            className="button w-full"
                          >
                            View Details
                          </button>
                        </StyledWrapper>


                        {
                          course?.broucherURL ? (
                            <a target='_blank' href={`${course?.broucherURL}`}>
                              <StyledWrapper1 className="w-full sm:w-auto">
                                <button
                                  onClick={() => navigate()}
                                  className="button w-full"
                                >
                                  Download Brochure
                                </button>
                              </StyledWrapper1>
                            </a>
                          ) : (
                            <div></div>
                          )
                        }


                      </div>
                    </div>
                  </div>
                </div>

              ) : (
                <div key={course._id}>

                  <div
                    className="bg-white flex flex-col md:flex-row gap-4 rounded-lg shadow-md overflow-hidden"
                  >

                    {/* Image Section */}
                    <div className="w-full md:w-[45%] relative flex justify-center items-center">
                      <div className="relative ">
                        <img
                          className=" w-full h-full"
                          src={course?.University?.heroURL}
                          alt={course?.University?.name}
                        />
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      </div>

                      <img
                        className="absolute top-2 right-2 w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white object-cover bg-white shadow-lg z-20"
                        src={course?.University?.logo}
                        alt={course?.University?.name}
                      />

                      <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs sm:text-sm font-semibold rounded-lg z-20">
                        {course?.University?.type}
                      </div>

                      <div className="absolute bottom-2 left-2 px-2 py-1 text-green-500 font-bold text-base sm:text-lg z-20 ">
                        Admission Open
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex flex-col w-full px-3 sm:px-4 py-2">
                      {course?.Intake && course.Intake.length > 0 ? (
                        course.Intake.some(intake => intake.status === false) ? (
                          <div
                            className="text-gray-800"
                            style={{ background: "#db7e1963", padding: "4px 30px" }}
                          >
                            Admission is Closed for{" "}
                            {course.Intake.find(intake => intake.status === false)?.date || "N/A"} Intake
                          </div>
                        ) : (
                          <div
                            className="text-gray-800"
                            style={{ background: "#2647903b", padding: "4px 30px" }}
                          >
                            Admission Open for{" "}
                            {course.Intake.find(intake => intake.status === true)?.date || "N/A"} Intake
                          </div>
                        )
                      ) : (
                        <div className="text-gray-800" style={{ background: "#ccc", padding: "4px 30px" }}>
                          Admission is not available
                        </div>
                      )}


                      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm sm:text-base">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-bold  break-words">
                          {course?.University?.name}

                        </h1>
                        <p className=" uppercase text-gold-main font-semibold">{course?.ProgramName}</p>
                        <span className="hidden sm:block border h-5" />
                        <p>{course?.ProgramLevel}</p>
                        <span className="hidden sm:block border h-5" />
                        <p>{course?.University?.Country?.name} </p>
                      </div>

                      <hr className="mt-2" />

                      {/* Info Section */}
                      <div className="flex flex-col md:flex-row gap-4 mt-2">
                        {/* Column 1 */}
                        <div className="flex w-full md:w-1/2" >
                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            {/* <p><span className="font-semibold">University Type</span></p> */}
                            <p><span className="font-semibold">University Grade</span></p>
                            <p><span className="font-semibold">World Rank</span></p>
                            <p><span className="font-semibold">Total Years/Sem</span></p>
                            <p><span className="font-semibold">Location</span></p>
                            <p><span className="font-semibold">University Type</span></p>

                            {/* {course?.University?.ECFMG && <p><span className="font-semibold">FMGE</span></p>}
                            {course?.University?.NMC && <p><span className="font-semibold">NMC</span></p>} */}
                          </div>

                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            {/* <p>: {course?.University?.type}</p> */}
                            <p>: {course?.University?.grade}</p>
                            <p>: {course?.University?.rank}</p>
                            <p>: {course?.Fees?.breakdown.length} {course?.Fees?.mode}s</p>
                            <p>: {course?.Location}</p>
                            <p>: {course?.University?.type}</p>
                            {/* {course?.University?.MCI && <p>: Approved</p>} */}
                            {/* {course?.University?.WHO && <p>: Approved</p>} */}
                          </div>
                        </div>

                        {/* Column 2 */}
                        <div className="flex w-full md:w-1/2">
                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            {/* <p><span className="font-semibold">Category</span></p> */}
                            <p><span className="font-semibold">Complete Fees</span></p>
                            <p><span className="font-semibold">Duration</span></p>

                            {course?.University?.MCI && <p><span className="font-semibold">MCI</span></p>}
                            {course?.University?.WHO && <p><span className="font-semibold">NMC</span></p>}
                            <p><span className="font-semibold">Intake</span></p>
                          </div>

                          <div className="flex-1 space-y-2 text-sm sm:text-base">
                            {/* <p>: {course?.Category}</p> */}
                            <p>: {course?.completeFees?.amount} {course?.completeFees?.currency}</p>
                            <p>: {course?.Duration}</p>
                            {/* {course?.University?.MCI && <p>: Approved</p>}
                            {course?.University?.WHO && <p>: Approved</p>} */}

                            <div className="flex flex-wrap gap-2">
                              {course?.Intake?.slice(0, 2).map((intake, index) => {
                                const isExpired = new Date(intake?.end_date) < new Date();
                                return (
                                  <div key={index} className="flex items-center gap-2">
                                    <span
                                      className={`px-2 py-0.5 rounded-md text-xs ${isExpired ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
                                        }`}
                                    >
                                      {isExpired ? "Closed" : "Open"}
                                    </span>
                                    <span className="border px-2 py-1 rounded-lg text-xs sm:text-sm">
                                      <ErrorIcon sx={{ fontSize: "16px" }} />
                                      <span className="ml-1">{intake?.date}</span>
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="my-3" />

                      {/* CTA Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <StyledWrapper className="w-full sm:w-auto">
                          <button
                            onClick={() => navigate(`/course/${course._id}`)}
                            className="button w-full"
                          >
                            View Details
                          </button>
                        </StyledWrapper>

                         {
                          course?.broucherURL ? (
                            <a target='_blank' href={`${course?.broucherURL}`}>
                              <StyledWrapper1 className="w-full sm:w-auto">
                                <button
                                  onClick={() => navigate()}
                                  className="button w-full"
                                >
                                  Download Brochure
                                </button>
                              </StyledWrapper1>
                            </a>
                          ) : (
                            <div></div>
                          )
                        }
                      </div>
                    </div>
                  </div>
                </div>
                // <></>
              )
            )}
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