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
import { useGetAllStudentMutation, useChangeStatusStudentMutation, useStudentDeleteMutation } from '../../slices/adminApiSlice';
import { DeleteOneStudent, FetchAllStudent, statusUpdate } from '../../slices/studentSlice';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function StudentTable() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [GetAllStudent, { isSuccess }] = useGetAllStudentMutation();
  const [ChangeStatusStudent] = useChangeStatusStudentMutation();
  const [StudentDelete, data] = useStudentDeleteMutation();

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
        const result = await GetAllStudent().unwrap();
        dispatch(FetchAllStudent(result));
      } catch (error) {
        console.error('Failed to fetch students:', error);
      }
    };
    fetchData();
  }, [GetAllStudent, dispatch]);

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
        const res = await ChangeStatusStudent(data).unwrap();
        dispatch(statusUpdate(res));
        toast.success('Student status updated successfully');
        handleCloseModal();
      } catch (error) {
        toast.error('Failed to update status');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const data = await StudentDelete(id).unwrap();
      dispatch(DeleteOneStudent(data));
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

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Table aria-label="student table" stickyHeader>
          <thead>
            <tr>
              <th>Name</th>
              <th>Create By</th>
              <th>Role</th>
              <th>Country</th>
              <th>Province</th>
              <th>University</th>
              <th>Course</th>
              <th>City</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {student
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row._id}>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.firstName} {row.lastName}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row?.User?.email}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row?.User?.role?.toUpperCase()}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.Country?.name}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.Province?.name}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.University?.name}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.Course?.ProgramName}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.city}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.gender}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.mobileNumber}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.emailID}</td>
                  <td style={{ wordWrap: 'break-word', maxWidth: '100px' }}>{row.status}</td>
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
                    <Tooltip title="Edit Student">
                      <IconButton onClick={() => handleUpdate(row)}> {/* Pass the entire row object */}
                        <EditIcon />
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
            <option value="Inquiry">Inquiry</option>
            <option value="Assessment">Assessment</option>
            <option value="Offer Letter">Offer Letter</option>
            <option value="Fees Paid">Fees Paid</option>
            <option value="Acceptance Letter">Acceptance Letter</option>
            <option value="VFS date booked">VFS date booked</option>
            <option value="Visa Granted">Visa Granted</option>
            <option value="Traveling">Traveling</option>
            <option value="Traveling">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleStatusChange}>
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

StudentTable.propTypes = {
  students: PropTypes.array.isRequired,
};

export default StudentTable;
