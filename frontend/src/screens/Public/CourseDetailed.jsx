import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ChecklistRtlSharpIcon from '@mui/icons-material/ChecklistRtlSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import VolunteerActivismSharpIcon from '@mui/icons-material/VolunteerActivismSharp';
import { useCreateLeadMutation, useFetchOneCourseMutation } from '../../slices/adminApiSlice';
import { FetchOneCourses } from '../../slices/courseSlice';
import {
  Box,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Modal,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventNoteIcon from '@mui/icons-material/EventNote';
import SchoolIcon from '@mui/icons-material/School';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import TimerIcon from '@mui/icons-material/Timer';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function CourseDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCourse } = useSelector((state) => state.course);
  const [singlecourses, setsinglecourses] = useState({})

  const [FetchOneCourse] = useFetchOneCourseMutation();
  const [tabValue, setTabValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const EligibilityText = singleCourse.Eligibility
    ?.replace(/<\/p>/g, '\n')
    .replace(/<li>/g, '• ')
    .replace(/<\/li>/g, '\n')
    .replace(/<[^>]+>/g, '') // Remove remaining tags
    .trim();
  // const hostel = singleCourse.University.hostel?.replace(/^<p>|<\/p>$/g, '');
  useEffect(() => {
    setsinglecourses(singleCourse)
  }, [singleCourse])
  console.log(singlecourses, "----------------------------------------------------------");

  // const Eligibility = singlecourses.Eligibility?.replace(/^<p>|<\/p>$/g, '');
  // const campusLifee = singlecourses?.University?.campusLife
  //   ? singlecourses.University.campusLife.replace(/^<p>|<\/p>$/g, '')
  //   : 'Not available';

  // const hostel = singlecourses?.University?.hostel
  //   ? singlecourses.University.hostel.replace(/^<p>|<\/p>$/g, '')
  //   : 'Not available';


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchOneCourse(id).unwrap();
        dispatch(FetchOneCourses(result));
      } catch (error) {
        console.error('Failed to fetch course:', error);
      }
    };
    fetchData();
  }, [id, dispatch, FetchOneCourse]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const openBrochure = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openKnowMore = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const stripHtml = (html) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  // const aboutUniversity = stripHtml(singleCourse?.University?.description || "No university description available.");

  const unilink = stripHtml(singleCourse?.University?.UniLink || "No university link available.");
  return (
    <motion.div
      style={{ background: "#f3f4f6b5" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <PopUp isModalOpen={isModalOpen} handleModalClose={handleModalClose} />
      {singleCourse && (
        <>
          <motion.div className="relative mb-6" initial={{ scale: 0.95 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
            <CardMedia component="img" height="250" image={singleCourse?.University?.bannerURL} alt={singleCourse?.University?.name} className="object-cover w-full " />
            <div className="flex flex-col sm:flex-row items-center mt-6 space-y-6 sm:space-y-0 sm:space-x-6">
              <motion.img
                src={singleCourse?.University?.logo}
                alt={singleCourse?.University?.name}
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-white shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              />
              <CardContent className="flex flex-col items-start space-y-2 w-full sm:w-auto">
                <Box className="flex flex-col sm:flex-row gap-4 mb-2">
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ boxShadow: 2, fontWeight: 'bold', textTransform: 'none' }}
                    onClick={handleModalOpen}
                  >
                    Apply
                  </Button>
                  {singleCourse?.broucherURL? 
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => openBrochure(singleCourse?.broucherURL)}
                    sx={{ boxShadow: 1, fontWeight: 'bold', textTransform: 'none' }}
                  >
                    Brochure
                  </Button> : <></>  
                }
                  
                </Box>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>{singleCourse?.ProgramName}</Typography>
                <Typography variant="h6" component="div">{singleCourse?.University?.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">{singleCourse?.Location}</Typography>
              </CardContent>
            </div>
          </motion.div>

          <div className=''>
            <Box>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="course tabs"
                className="mb-4"
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Details" icon={<InfoIcon />} iconPosition="start" />
                <Tab label="Intake" icon={<EventNoteIcon />} iconPosition="start" />
                <Tab label="Eligiblity" icon={<ChecklistRtlSharpIcon />} iconPosition="start" />
                <Tab label="Language Requirement" icon={<SchoolIcon />} iconPosition="start" />
                <Tab label="Fees" icon={<SchoolIcon />} iconPosition="start" />
                <Tab label="Campus Life" icon={<VolunteerActivismSharpIcon />} iconPosition="start" />
                <Tab label="Hostel" icon={<HomeSharpIcon />} iconPosition="start" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                <Box className="" >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold' }}
                    className=" sm:text-xl md:text-2xl text-center sm:text-left"
                  >
                    <span className="  sm:text-xl md:text-2xl sm:text-left">Program Details in   {singleCourse?.University?.name}
                    </span>

                  </Typography>



                  <div className='flex flex-col lg:flex-row w-full my-2 gap-10'>
                    {/* Left Section */}
                    <div className='px-5 w-full lg:w-[70%]'>
                      <div className="flex flex-col w-full">

                        <div key={singleCourse._id}>

                          <div
                            className="bg-white flex flex-col md:flex-row gap-4 rounded-lg shadow-md overflow-hidden"
                          >



                            {/* Details Section */}
                            <div className="flex flex-col w-full px-3 sm:px-4 py-2">



                              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm sm:text-base">

                                <p className=" uppercase text-gold-main font-semibold">{singleCourse?.ProgramName}</p>
                                <span className="hidden sm:block border h-5" />
                                <p>{singleCourse?.ProgramLevel}</p>
                                <span className="hidden sm:block border h-5" />
                                <p>{singleCourse?.University?.Country?.name} </p>
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

                                    {singleCourse?.University?.ECFMG && <p><span className="font-semibold">FMGE</span></p>}
                                    {singleCourse?.University?.NMC && <p><span className="font-semibold">NMC</span></p>}
                                  </div>

                                  <div className="flex-1 space-y-2 text-sm sm:text-base">
                                    {/* <p>: {singleCourse?.University?.type}</p> */}
                                    <p>: {singleCourse?.University?.grade}</p>
                                    <p>: {singleCourse?.University?.rank}</p>
                                    <p>: {singleCourse?.Fees?.breakdown.length} {singleCourse?.Fees?.mode}s</p>
                                    <p>: {singleCourse?.Location}</p>
                                    <p>: {singleCourse?.University?.type}</p>
                                    {singleCourse?.University?.MCI && <p>: Approved</p>}
                                    {singleCourse?.University?.WHO && <p>: Approved</p>}
                                  </div>
                                </div>

                                {/* Column 2 */}
                                <div className="flex w-full md:w-1/2">
                                  <div className="flex-1 space-y-2 text-sm sm:text-base">
                                    {/* <p><span className="font-semibold">Category</span></p> */}
                                    <p><span className="font-semibold">Complete Fees</span></p>
                                    <p><span className="font-semibold">Duration</span></p>

                                    {singleCourse?.University?.MCI && <p><span className="font-semibold">MCI</span></p>}
                                    {singleCourse?.University?.WHO && <p><span className="font-semibold">NMC</span></p>}
                                    <p><span className="font-semibold">Intake</span></p>
                                  </div>

                                  <div className="flex-1 space-y-2 text-sm sm:text-base">
                                   <p>: {singleCourse?.Fees?.breakdown?.length || 0} {singleCourse?.Fees?.mode || ""}s</p>
<p>: {singleCourse?.Fees?.breakdown?.length > 0 ? singleCourse.Fees.breakdown[0]?.label : "N/A"}</p>

                                    <p>: {singleCourse?.Duration}</p>
                                    {singleCourse?.University?.MCI && <p>: Approved</p>}
                                    {singleCourse?.University?.WHO && <p>: Approved</p>}
                                  </div>
                                </div>
                              </div>


                            </div>
                          </div>
                        </div>

                        {/* Intake Year Section */}
                        <div className="p-2 my-4">
                          <h1 className='font-semibold text-2xl'>Intake Year</h1>
                          {singleCourse?.Intake?.length > 0 ? (
                            <div className="my-3 overflow-x-auto rounded-lg bg-white shadow border">
                              <table className="min-w-full table-auto text-center">
                                <thead className="bg-blue-main">
                                  <tr>
                                    <th className="px-6 py-2 text-white text-lg font-semibold">Intake</th>
                                    <th className="px-6 py-2 text-white text-lg font-semibold">Deadline</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {singleCourse.Intake.map((intakeItem, index) => (
                                    <tr key={intakeItem._id || index} className="border-t">
                                      <td className="px-6 py-2">
                                        {intakeItem?.date
                                          ? new Date(intakeItem.date) < new Date()
                                            ?
                                            <div>
                                              <span style={{
                                                backgroundColor: "#f800003b",
                                                padding: "1px 6px",
                                                marginLeft: "5px",
                                                borderRadius: "10px",
                                              }}>Closed</span>
                                              {intakeItem?.date}</div>
                                            :
                                            <div>
                                              <span style={{
                                                backgroundColor: "#1bf8003b",
                                                padding: " 8px",
                                                marginRight: "8px",
                                                borderRadius: "10px",
                                              }}>
                                                Open
                                              </span>
                                              {intakeItem?.date} </div>
                                          : "N/A"}
                                      </td>
                                      <td className="px-6 py-4">
                                        {intakeItem?.end_date
                                          ? new Date(intakeItem.end_date).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                          })
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>

                              </table>
                            </div>
                          ) : (
                            <div className="text-gray-500">No intake dates available.</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right Section (Form) */}
                    <div className='w-full lg:w-[30%] mt-6 lg:mt-0 px-5'>
                      <form className="bg-white w-full border rounded-lg shadow-xl p-4">
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                          <input id="name" type="text" placeholder="Enter your name"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                          <input id="email" type="email" placeholder="Enter your email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
                        </div>
                        <div className="mb-4">
                          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                          <input id="phone" type="tel" placeholder="Enter your phone number"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-main" />
                        </div>
                        <button
                          type="submit"
                          className="w-full bg-blue-main text-white font-bold py-2 px-4 rounded-md hover:bg-blue-dark transition duration-300"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>



                  <div className="px-4 ">
                    <h3 className="font-semibold text-2xl px-2 mb-2">About University</h3>
                    <p className="text-gray-600 px-3  ">
                      {/* {aboutUniversity} */}

                      <div
                        className="prose text-xl max-w-none"
                        dangerouslySetInnerHTML={{ __html: singleCourse?.University?.description }}
                      />

                      <Link
                        to={unilink}
                        target='_blank'
                        className="mt-4 flex align-center w-[200px] mx-auto justify-center inline-block px-4 py-2 bg-gold-main text-white  hover:bg-gold-400 transition font-semibold"
                        style={{ borderRadius: "20px" }}
                      >
                        Explore University
                      </Link>
                      {/* //////////////////////////////////////////////////////////// */}
                    </p>
                  </div>


                </Box>
              </TabPanel>


              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Intake Details</Typography>

                <div className="w-[90%] p-2 my-4">
                  {singleCourse?.Intake?.length > 0 ? (
                    <div className=" my-3 overflow-x-auto rounded-lg shadow border">
                      <table className="min-w-full table-auto text-center">
                        <thead className="bg-blue-main">
                          <tr>
                            <th className="px-6 py-2 text-white text-lg font-semibold">Intake </th>
                            <th className="px-6 py-2 text-white text-lg font-semibold">Deadline</th>
                          </tr>
                        </thead>
                        <tbody>
                          {singleCourse.Intake.map((intakeItem, index) => (
                            <tr key={intakeItem._id || index} className="border-t">
                              <td className="px-6 py-2">
                                {intakeItem?.date
                                  ? new Date(intakeItem.date) < new Date()
                                    ?
                                    <div>
                                      <span style={{
                                        backgroundColor: "#f800003b",
                                        padding: "1px 6px",
                                        marginLeft: "5px",
                                        borderRadius: "10px",
                                      }}>Closed</span>
                                      {intakeItem?.date}</div>
                                    :
                                    <div>
                                      <span style={{
                                        backgroundColor: "#1bf8003b",
                                        padding: " 8px",
                                        marginRight: "8px",
                                        borderRadius: "10px",
                                      }}>
                                        Open
                                      </span>
                                      {intakeItem?.date} </div>
                                  : "N/A"}
                              </td>
                              <td className="px-6 py-4">
                                {intakeItem?.end_date
                                  ? new Date(intakeItem.end_date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                  : "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-500">No intake dates available.</div>
                  )}
                </div>
                {/* {singleCourse?.Intake?.map((intake, index) => (
                  <Accordion key={index} className="my-2">
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                      <Typography>Intake {index + 1}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>Status: {intake.status ? 'Yes' : 'No'}</Typography>
                      <Typography>Date: {intake.date}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))} */}
              </TabPanel>




              <TabPanel value={tabValue} index={2}>
                <div
                  
                  className="prose max-w-none text-xl marker:text-gray-900 marker:font-bold"
                  dangerouslySetInnerHTML={{ __html: singleCourse.Eligibility }}
                />


              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Language Requirements</Typography>
                {singleCourse?.LanguageRequirements ? (
                  Object.entries(singleCourse.LanguageRequirements).map(([key, req]) => (
                    <Accordion key={key} className="my-2">
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                        <Typography>{key}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>Status: {req.status ? 'Required' : 'Not Required'}</Typography>
                        <Typography>Description: {req.description}</Typography>
                        <Typography>Minimum Requirement: {req.minRequirement}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : <Typography>No language requirements available</Typography>}

                <Typography variant="h6" className="mt-6" sx={{ fontWeight: 'bold' }}>Standardized Requir ements</Typography>
                {singleCourse?.StandardizeRequirement ? (
                  Object.entries(singleCourse.StandardizeRequirement).map(([key, req]) => (
                    <Accordion key={key} className="my-2">
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} className="bg-gray-100">
                        <Typography>{key}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>Status: {req.status ? 'Required' : 'Not Required'}</Typography>
                        <Typography>Description: {req.description}</Typography>
                        <Typography>Minimum Requirement: {req.minRequirement}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))
                ) : <Typography>No standardized requirements available</Typography>}
              </TabPanel>


              <TabPanel value={tabValue} index={4}>
  <div className="space-y-8">



    {/* 🔹 Fee Structure Section */}
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Fee Structure</h2>

      {/* Breakdown Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-main text-white">
            <tr>
              <th className="px-6 py-3 text-left text-lg font-semibold">Year</th>
              <th className="px-6 py-3 text-left text-lg font-semibold">Amount ({singleCourse?.Fees?.currency})</th>
            </tr>
          </thead>
          <tbody>
            {singleCourse?.Fees?.breakdown?.map((fee, index) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-3 text-gray-800 font-medium">{fee.label}</td>
                <td className="px-6 py-3 text-gray-700">{fee.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Fees */}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold text-gray-900">
          Total: {singleCourse?.Fees?.currency}{" "}
          {singleCourse?.Fees?.totalAmount?.toLocaleString()}
        </p>
       
      </div>
    </div>
  </div>
</TabPanel>




              <TabPanel value={tabValue} index={5}>
                <Box>
                  <div
                    // style={{ lineHeight: "30px" }}
                    className="prose max-w-none text-xl marker:text-gray-900 marker:font-bold"
                    dangerouslySetInnerHTML={{ __html: singlecourses?.University?.campusLife }}
                  />



                </Box>
              </TabPanel>
            </Box>


            {/* <Tab label="Hostel" icon={<SchoolIcon />} iconPosition="start" /> */}

            <TabPanel value={tabValue} index={6}>
              <div
                className="prose max-w-none marker:text-gray-900 marker:font-bold text-xl"
                // style={{ lineHeight: "10px" }}
                dangerouslySetInnerHTML={{ __html: singlecourses?.University?.hostel }}
              />

            </TabPanel>




          </div>


        </>
      )}
    </motion.div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function PopUp({ isModalOpen, handleModalClose }) {
  const [name, setName] = useState('');
  const  [message, setMessage] = useState('')
  const [email, setEmail] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [createLead, { isLoading, isSuccess, isError, error }] = useCreateLeadMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Thank you for applying, we will get back to you shortly!');
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const leadData = { name, email, phoneNo, message };
      const res= await createLead(leadData).unwrap();
        console.log(res,"+++++++++++++++++++++++");
        
      setName('');
      setEmail('');
      setPhoneNo('');
      handleModalClose();
    } catch (err) {
      console.error('Failed to submit form:', err.message || err.data);
    }
  };

  return (
    <Modal open={isModalOpen} onClose={handleModalClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute left-[35%] top-[30%] p-6 rounded-lg bg-white shadow-2xl w-[90%] max-w-md"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Apply for the Course</Typography>
          <span onClick={handleModalClose} className="cursor-pointer hover:text-red-500">X</span>
        </Box>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
            <input
            type="text"
            placeholder="Message"
            // value={phoneNo}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />

          <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </form>

        {isError && <Typography color="error" mt={2}>{error?.data?.message || 'Something went wrong. Please try again.'}</Typography>}
      </motion.div>
    </Modal>
  );
}
