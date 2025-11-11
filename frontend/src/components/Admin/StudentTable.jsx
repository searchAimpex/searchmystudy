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
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import TablePagination from '@mui/material/TablePagination';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetAllStudentMutation, useChangeStatusStudentMutation, useStudentDeleteMutation } from '../../slices/adminApiSlice';
import { DeleteOneStudent, FetchAllStudent, statusUpdate } from '../../slices/studentSlice';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { DownloadCloud, DownloadCloudIcon } from 'lucide-react';
function StudentTable() {
  // Existing state
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // New filter states
  const [filters, setFilters] = useState({
    centerCode: '',
    trackingId: '',
    userType: '',
    startDate: '',
    endDate: ''
  });
  const [isFiltersVisible, setIsFiltersVisible] = useState(true);

  const { student } = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  // Filter functions
  const filteredStudents = React.useMemo(() => {
    return student.filter(s => {
      const centerCodeMatch = !filters.centerCode || 
        (s?.User?.CenterCode || s?.User?.createdBy?.CenterCode || '')
          .toLowerCase()
          .includes(filters.centerCode.toLowerCase());

      const trackingIdMatch = !filters.trackingId || 
        s.trackingId.toLowerCase().includes(filters.trackingId.toLowerCase());

      const userTypeMatch = !filters.userType || 
        (s?.User?.role === filters.userType || s?.User?.createdBy?.role === filters.userType);

      const createdDate = new Date(s.createdAt);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      const dateMatch = (!startDate || !endDate) ||
        (createdDate >= startDate && createdDate <= endDate);

      return centerCodeMatch && trackingIdMatch && userTypeMatch && dateMatch;
    });
  }, [student, filters]);

  const handleEdit = (id) => {
    setSelectedStudentId(id);
    setOpenModal(true);
  };

  const handleUpdate = (student) => {
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

  const handleResetFilters = () => {
    setFilters({
      centerCode: '',
      trackingId: '',
      userType: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleExcelDownload = () => {
    try {
      // Transform the data for Excel
      const excelData = filteredStudents.map(row => ({
        'Name': `${row.firstName} ${row.lastName}`,
        'Tracking ID': row.trackingId,
        'Center Code': row?.User?.role === 'partner' || row?.User?.role === 'franchise' ? 
          row?.User?.CenterCode : row?.User?.createdBy?.CenterCode,
        'Center Type': row?.User?.role === 'partner' || row?.User?.role === 'franchise' ? 
          row?.User?.role : row?.User?.createdBy?.role,
        'Country': row.Country?.name,
        'Province': row.Province?.name,
        'University': row.University?.name,
        'Course': row.Course?.ProgramName,
        'City': row.city,
        'Gender': row.gender,
        'Phone': row.mobileNumber,
        'Email': row.emailID,
        'Status': row.status,
        'Created At': row.createdAt.split('T')[0]
      }));

      // Create worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);

      // Create workbook
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Students');

      // Generate file name with current date
      const fileName = `students_data_${new Date().toISOString().split('T')[0]}.xlsx`;

      // Save file
      XLSX.writeFile(wb, fileName);
      toast.success('Excel file downloaded successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to download Excel file');
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
      {/* Filter Section */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography level="h4">Student Management</Typography>
          <Button 
            variant="outlined"
            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          >
            {isFiltersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
          <Button
              startDecorator={<DownloadCloudIcon />}
              variant="solid"
              color="primary"
              onClick={handleExcelDownload}
            >
              Download Excel
            </Button>
        </Box>

        {isFiltersVisible && (
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' },
            gap: 2,
            p: 2,
            bgcolor: 'background.level1',
            borderRadius: 'sm',
            mb: 2
          }}>
            <Input
              placeholder="Search by Center Code"
              value={filters.centerCode}
              onChange={(e) => setFilters(prev => ({...prev, centerCode: e.target.value}))}
              fullWidth
            />
            <Input
              placeholder="Search by Tracking ID"
              value={filters.trackingId}
              onChange={(e) => setFilters(prev => ({...prev, trackingId: e.target.value}))}
              fullWidth
            />
            <Select
              placeholder="Select User Type"
              value={filters.userType}
              onChange={(_, value) => setFilters(prev => ({...prev, userType: value}))}
              fullWidth
            >
              <Option value="">All</Option>
              <Option value="partner">Partner</Option>
              <Option value="franchise">Franchise</Option>
            </Select>
            <Input
              type="date"
              placeholder="Start Date"
              value={filters.startDate}
              onChange={(e) => setFilters(prev => ({...prev, startDate: e.target.value}))}
              fullWidth
            />
            <Input
              type="date"
              placeholder="End Date"
              value={filters.endDate}
              onChange={(e) => setFilters(prev => ({...prev, endDate: e.target.value}))}
              fullWidth
            />
            <Button 
              variant="outlined" 
              onClick={handleResetFilters}
              fullWidth
            >
              Reset Filters
            </Button>
          </Box>
        )}
      </Box>

      {/* Table Section */}
      <Box sx={{ overflowX: 'auto' }}>
        <Table aria-label="student table" stickyHeader>
          <thead>
            <tr className='mx-4'>
              <th  className='w-[120px]'>Name</th>
              <th className='w-[120px]'>Tracking ID</th>
              <th className='w-[120px]'>Center Code</th>
              <th  className='w-[120px]'>Center Type</th>
              <th className='w-[120px]'>Country</th>
              <th className='w-[100px]'>Province</th>
              <th className='w-[150px]'>University</th>
              <th  className='w-[120px]'>Course</th>
              <th  className='w-[120px]'>City</th>
              <th className='w-[250px]'>Phone</th>
              <th className='w-[150px]'>Email</th>
              <th  className='w-[120px]'>Status</th>
              <th className='w-[120px]'>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <tr key={row._id}>
                  <td>{row.firstName} {row.lastName}</td>
                  <td>{row.trackingId}</td>
                  <td>{row?.User?.role === 'partner' || row?.User?.role === 'franchise' ? 
                    row?.User?.CenterCode : row?.User?.createdBy?.CenterCode}</td>
                  <td>{row?.User?.role === 'partner' || row?.User?.role === 'franchise' ? 
                    row?.User?.role : row?.User?.createdBy?.role}</td>
                  <td>{row.Country?.name}</td>
                  <td className='w-[100px]'>{row.Province?.name}</td>
                  <td className='w-[150px]'>{row.University?.name}</td>
                  <td>{row.Course?.ProgramName}</td>
                  <td>{row.city}</td>
                  <td >{row.mobileNumber}</td>
                  <td className='w-[120px] '>{row.emailID}</td>
                  <td>{row.status}</td>
                  <td>{row.createdAt.split('T')[0]}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 1 }}>
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
                        <IconButton onClick={() => handleUpdate(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filteredStudents.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[5, 10, 15]}
      />

      {/* Status Change Modal */}
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
            padding: '1rem',
            backgroundColor: 'white',
            borderRadius: '20px',
            minWidth: '300px',
            maxWidth: '600px',
            width: '100%',
            boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography level="h6" sx={{ marginBottom: '1rem' }}>
            Change Student Status
          </Typography>
          <Select
            placeholder="Select status"
            value={selectedStatus}
            onChange={(_, value) => setSelectedStatus(value)}
            sx={{ width: '100%', mb: 2 }}
          >
            <Option value="Inquiry">Inquiry</Option>
            <Option value="Assessment">Assessment</Option>
            <Option value="Offer Letter">Offer Letter</Option>
            <Option value="Fees Paid">Fees Paid</Option>
            <Option value="Acceptance Letter">Acceptance Letter</Option>
            <Option value="VFS date booked">VFS date booked</Option>
            <Option value="Visa Granted">Visa Granted</Option>
            <Option value="Traveling">Traveling</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Canceled">Canceled</Option>
          </Select>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="solid" color="primary" onClick={handleStatusChange}>
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