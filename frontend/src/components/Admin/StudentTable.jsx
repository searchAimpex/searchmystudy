import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/joy/Modal';
import Button from '@mui/joy/Button';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetAllStudentMutation, useChangeStatusStudentMutation } from '../../slices/adminApiSlice';
import { FetchAllStudent, statusUpdate } from '../../slices/studentSlice';

function StudentTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('_id');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const [GetAllStudent, { isSuccess }] = useGetAllStudentMutation();
  const [ChangeStatusStudent] = useChangeStatusStudentMutation();

  // Handle success feedback
  useEffect(() => {
    if (isSuccess) {
      toast.success('Data fetched successfully');
    }
  }, [isSuccess]);

  // Fetch all students
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

  // Handle modal open for editing student status
  const handleEdit = (id) => {
    setSelectedStudentId(id);
    setOpenModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedStudentId(null);
    setSelectedStatus('');
  };

  // Update status logic
  const handleStatusChange = async () => {
    if (selectedStudentId && selectedStatus) {
      try {
        const data =  { 
            id: selectedStudentId, 
            raw:{
            status: selectedStatus
            } 
        }
        console.log("data i am sending",data)
         const res = await ChangeStatusStudent(data).unwrap();
         console.log("data i am sending",res)
         dispatch(statusUpdate(res))
        toast.success('Student status updated successfully');
        handleCloseModal();
      } catch (error) {
        console.error('Failed to update student status:', error);
        toast.error('Failed to update status');
      }
    }
  };

  // Handle delete functionality (dummy for now)
  const handleDelete = (id) => {
    // Replace with actual delete logic
    console.log(`Delete student with ID: ${id}`);
    toast.info('Delete functionality not implemented');
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Table aria-label="student table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Gender</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {student.map((row) => (
            <tr key={row._id}>
              <td>{row.firstName} {row.lastName}</td>
              <td>{row.address}</td>
              <td>{row.city}</td>
              <td>{row.gender}</td>
              <td>{row.status}</td>
              <td>
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEdit(row._id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton onClick={() => handleDelete(row._id)}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for changing student status */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ padding: '2rem', backgroundColor: 'white', borderRadius: '8px', minWidth: '300px' }}>
          <Typography variant="h6">Change Student Status</Typography>
          <select
            placeholder="Select status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            sx={{ marginTop: '1rem', marginBottom: '1rem' }}
          >
        
              <option  value='Stage 1'>
                Stage 1
              </option>
              
              <option  value='Stage 2'>
                Stage 2
              </option>

           
          </select>
          <Button variant="contained" onClick={handleStatusChange}>
            Update Status
          </Button>
          <Button variant="outlined" onClick={handleCloseModal} sx={{ marginLeft: '1rem' }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}

export default StudentTable;
