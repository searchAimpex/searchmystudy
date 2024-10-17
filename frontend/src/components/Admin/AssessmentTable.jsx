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
import { useGetAllStudentMutation, useChangeStatusStudentMutation, useStudentDeleteMutation, useFetchAllProfileMutation, useChangeStatusProfileMutation, useProfileDeleteMutation } from '../../slices/adminApiSlice';
import { DeleteOneStudent, FetchAllStudent, statusUpdate } from '../../slices/studentSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { DeleteOneAssessment, fetchAssessment, statusAssessmentUpdate } from '../../slices/assessmentSlice';
import { Download } from '@mui/icons-material';
import JSZip from "jszip";
import { saveAs } from "file-saver"; // To save the file

function AssessmentTable() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { assessment } = useSelector((state) => state.assessment);
  const student = assessment;
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [FetchAllProfile, { isSuccess }] = useFetchAllProfileMutation();
  const [ChangeStatusProfile] = useChangeStatusProfileMutation();
  const [ProfileDelete, data] = useProfileDeleteMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Data fetched successfully');
    }
    if (data.isSuccess) {
      toast.success('Student deleted successfully');
    }
  }, [isSuccess, data.isSuccess]);

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

  const handleEdit = (id) => {
    setSelectedStudentId(id);
    setOpenModal(true);
  };

  const handleUpdate = (student) => {
    // Navigate to the update page and pass student data
    navigate('/admin/student/update', { state: student });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStudentId(null);
    setSelectedStatus('');
  };

  const handleStatusChange = async () => {
    if (selectedStudentId && selectedStatus) {
      try {
        const data = { id: selectedStudentId, raw: { status: selectedStatus } };
        const res = await ChangeStatusProfile(data).unwrap();
        console.log("res",res)
        dispatch(statusAssessmentUpdate(res));
        toast.success('Profile status updated successfully');
        handleCloseModal();
      } catch (error) {
        toast.error('Failed to update status');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await ProfileDelete(id).unwrap();

      dispatch(DeleteOneAssessment(data));
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

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

  // Map of document property names to file names
  const documentMap = {
    resume: "resume.pdf",
    englishTestScorecard: "englishTestScorecard.pdf",
    acadmics: "acadmics.pdf",
    englishTestDoc: "englishTestDoc.pdf",
    workExperienceDoc: "workExperienceDoc.pdf"
  };

  // Iterate over each property in the data object
  for (const key in documentMap) {
    if (data[key]) { // Check if the property exists and has a link
      try {
        const response = await fetch(data[key]); // Fetch the document
        console.log("response",response)
        if (!response.ok) {
          throw new Error(`Failed to fetch ${key}: ${response.statusText}`);
        }

        const blob = await response.blob(); // Convert the response to a binary blob

        // Add the blob file to the zip with its corresponding file name
        zip.file(documentMap[key], blob);
      } catch (error) {
        console.error(`Error fetching ${documentMap[key]}:`, error);
      }
    }
  }

  // Generate the zip file and trigger download
  zip.generateAsync({ type: "blob" }).then((blob) => {
    saveAs(blob, "documents.zip"); // Save the zip file
  });
};
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
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
            {student
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row._id}>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.firstName} {row.lastName}</td>
                

                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}> {row?.User?.role === 'partner' || 'frenchise' ?    row?.User?.CenterCode  :  row?.User?.createdBy?.CenterCode}</td>
               
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
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>

      {/* Pagination component */}
      <TablePagination
        component="div"
        count={student.length}
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
            width: '100%',
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
            Change Student Status
          </Typography>
          <select
            placeholder="Select status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              width: '100%',
              padding: '4px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              marginBottom: '1rem',
            }}
          >
            <option value="pending">Pending</option>
            <option value="shared">Shared</option>
            <option value="eligible">Eligible</option>
            <option value="ineligible">Ineligible</option>
       
          </select>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="outlined" color="primary" onClick={handleStatusChange}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

AssessmentTable.propTypes = {
  students: PropTypes.array.isRequired,
};

export default AssessmentTable;
