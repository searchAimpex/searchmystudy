import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useFetchAllProfileMutation } from '../../slices/adminApiSlice';
import { fetchAssessment } from '../../slices/assessmentSlice';
import { Download } from '@mui/icons-material';
import JSZip from "jszip";
import { saveAs } from "file-saver"; // To save the file
import { IoEye } from 'react-icons/io5';
import { Grid, Paper } from '@mui/material';

function AssessmentTable() {
  const [openModal, setOpenModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  const { assessment } = useSelector((state) => state.assessment);
  const dispatch = useDispatch();
  const [FetchAllProfile] = useFetchAllProfileMutation();

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const result = await FetchAllProfile().unwrap();
        dispatch(fetchAssessment(result));
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
    fetchData();
  }, [FetchAllProfile, dispatch]);

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStudentId(null);
    setSelectedStatus('');
  };

  const handleOpenViewModal = (student) => {
    setSelectedStudent(student);
    setOpenViewModal(true);
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
    setSelectedStudent(null);
  };

  const handleEdit = (studentId) => {
    setSelectedStudentId(studentId);
    const selectedRow = assessment.find((row) => row._id === studentId);
    setSelectedStatus(selectedRow?.status || '');
    setOpenModal(true);
  };

  // Filter assessments based on search criteria
  const filteredAssessments = assessment.filter((row) => {
    const nameMatch = `${row.firstName} ${row.lastName}`.toLowerCase().includes(nameSearch.toLowerCase());
    const statusMatch = selectedStatus ? row.status === selectedStatus : true;
    const dateMatch = (!dateFrom || new Date(row.createdAt) >= new Date(dateFrom)) && 
                      (!dateTo || new Date(row.createdAt) <= new Date(dateTo));
    return nameMatch && statusMatch && dateMatch;
  });

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDownload = async (data) => {
    const zip = new JSZip(); // Create a new zip object
    // Logic for downloading documents...
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      {/* Filter Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <input
          type="text"
          placeholder="Search by name"
          value={nameSearch}
          onChange={(e) => setNameSearch(e.target.value)}
          style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc', marginLeft: '8px' }}
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shared">Shared</option>
          <option value="eligible">Eligible</option>
          <option value="ineligible">Ineligible</option>
        </select>
        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          style={{ marginLeft: '8px', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          style={{ marginLeft: '8px', padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </Box>

      <Box sx={{ overflowX: 'auto' }}>
        <Table aria-label="student table" stickyHeader>
          <thead>
            <tr>
              <th>Name</th>
              <th>Punched By</th>
              <th>Country</th>
              <th>Course</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Inquiry At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssessments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row._id}>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.firstName} {row.lastName}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row?.User?.role === 'partner' || row?.User?.role === 'franchise' ? row?.User?.CenterCode : row?.User?.createdBy?.CenterCode}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.Country?.name}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.Course}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.mobileNumber}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.emailID}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.status}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row?.createdAt?.split('T')[0]}</td>
                  <td>
                    <Tooltip title="Edit Status">
                      <IconButton onClick={() => handleEdit(row._id)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(row._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download Doc">
                      <IconButton onClick={() => handleDownload(row)}>
                        <Download />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="View Details">
                      <IconButton onClick={() => handleOpenViewModal(row)}>
                        <IoEye />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>

      {/* Pagination component */}
      <TablePagination
        component="div"
        count={filteredAssessments.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />

      {/* Modal for changing student status */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            padding: '3rem',
            backgroundColor: 'white',
            borderRadius: '20px',
            minWidth: '300px',
            maxWidth: '600px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="h6" component="h2">Edit Status</Typography>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ margin: '16px 0', padding: '4px', borderRadius: '4px', border: '1px solid #ccc', width: '100%' }}
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="shared">Shared</option>
            <option value="eligible">Eligible</option>
            <option value="ineligible">Ineligible</option>
          </select>
          <Button variant="outlined" onClick={handleCloseModal}>Save</Button>
        </Box>
      </Modal>

      {/* Modal for viewing student details */}
                 {/* Modal for assessment details */}
                 <Modal
                open={openViewModal}
                onClose={handleCloseViewModal}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Paper
                    sx={{
                        padding: '2rem',
                        borderRadius: '16px',
                        minWidth: '400px',
                        maxWidth: '600px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        Assessment Details
                    </Typography>
                    {selectedStudent && (
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Name:</strong> {selectedStudent.firstName} {selectedStudent.middleName} {selectedStudent.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Tracking ID:</strong> {selectedStudent.trackingId}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Passport Number:</strong> {selectedStudent.passportNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>DOB:</strong> {selectedStudent.dob}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Mobile Number:</strong> {selectedStudent.mobileNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Email ID:</strong> {selectedStudent.emailID}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Country:</strong> {selectedStudent?.Country?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Course:</strong> {selectedStudent.Course}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Last Education:</strong> {selectedStudent.lastEdu}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Year of Passing:</strong> {selectedStudent.yearOfPassing}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Grades in Last Year:</strong> {selectedStudent.gradesInLastYear}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>12th English Grade:</strong> {selectedStudent.english12Grade}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>English Test:</strong> {selectedStudent.englishTest}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Work Experience:</strong> {selectedStudent.workExperience ? 'Yes' : 'No'}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Remarks:</strong> {selectedStudent.remarks}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Status:</strong> {selectedStudent.status}
                                </Typography>
                            </Grid>
                            {/* Documents */}
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Resume:</strong> <a href={selectedStudent.resume} target="_blank" rel="noopener noreferrer">View</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>English Test Scorecard:</strong> <a href={selectedStudent.englishTestScorecard} target="_blank" rel="noopener noreferrer">View</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Academics Document:</strong> <a href={selectedStudent.acadmics} target="_blank" rel="noopener noreferrer">View</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>English Test Document:</strong> <a href={selectedStudent.englishTestDoc} target="_blank" rel="noopener noreferrer">View</a>
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="body1">
                                    <strong>Work Experience Document:</strong> <a href={selectedStudent.workExperienceDoc} target="_blank" rel="noopener noreferrer">View</a>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Box mt={2} display="flex" justifyContent="flex-end">
                        <Button variant="outlined" onClick={handleCloseViewModal}>Close</Button>
                    </Box>
                </Paper>
            </Modal>

    </Box>
  );
}

AssessmentTable.propTypes = {
  assessment: PropTypes.array,
};

export default AssessmentTable;
