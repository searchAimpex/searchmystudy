import React, { useState, useEffect } from 'react';
import {
  useAllCourseMutation,
  useCountryFetchMutation,
  useFetchProvinceMutation,
  useFetchUniversityMutation,
} from '../../slices/adminApiSlice';
import { Card, CardContent, CardMedia, Typography, Chip } from '@mui/material';

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

  const [AllCourse, { isLoading, isError }] = useAllCourseMutation();
  const [fetchCountries] = useCountryFetchMutation();
  const [fetchProvinces] = useFetchProvinceMutation();
  const [fetchUniversities] = useFetchUniversityMutation();

  useEffect(() => {
    // Fetch countries on component mount
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
      // Fetch provinces when country changes
      try {
        const result = await fetchProvinces({ country: value }).unwrap();
        if (Array.isArray(result)) {
          setProvinces(result);
          setFilters({ ...newFilters, province: '', university: '' }); // Reset province and university
          setUniversities([]);
        } else {
          console.error('Expected an array but got:', result);
        }
      } catch (error) {
        console.error('Error fetching provinces:', error);
      }
    }

    if (name === 'province') {
      // Fetch universities when province changes
      try {
        const result = await fetchUniversities({ province: value }).unwrap();
        if (Array.isArray(result)) {
          setUniversities(result);
          setFilters({ ...newFilters, university: '' }); // Reset university
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

  return (
    <div className="flex mx-[100px] my-[100px]">
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block mb-2">Country</label>
          <select
            name="country"
            value={filters.country}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country._id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Province</label>
          <select
            name="province"
            value={filters.province}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province._id} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">University</label>
          <select
            name="university"
            value={filters.university}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select University</option>
            {universities.map((university) => (
              <option key={university._id} value={university.name}>
                {university.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Program Level</label>
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
          <label className="block mb-2">Category</label>
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
          <label className="block mb-2">Scholarships</label>
          <input
            type="checkbox"
            name="scholarships"
            checked={filters.scholarships}
            onChange={handleFilterChange}
            className="mr-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Language Requirement</label>
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
          <label className="block mb-2">Standardize Requirement</label>
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
          className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Courses</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error loading courses.</p>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {courses.map((course) => (
              <Card key={course._id} className="bg-white rounded shadow-lg">
                <CardMedia
                  component="img"
                  height="140"
                  image="https://via.placeholder.com/150"
                  alt="Course Image"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {course.ProgramName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {course.University.name}, {course.University.Province.name}, {course.University.Province.Country.name}
                  </Typography>
                  <div className="mt-2">
                    <Chip label={course.ProgramLevel} />
                    <Chip label={course.Category} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default AllCourseDetailed;
