import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/joy/Link';
import Pagination from '@mui/material/Pagination';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import {
    useCounsellerFetchLeadMutation,
} from '../../slices/adminApiSlice';
import { FetchCounsellerLead } from '../../slices/counsellerLeadSlice';

// Head cells for the table
const headCells = [
    { id: 'name', label: 'Name' },
    { id: 'phone', label: 'Phone' },
    { id: 'email', label: 'Email' },
    { id: 'type', label: 'Type' },
    { id: 'interestedCountry', label: 'Interested Country' },
    { id: 'interestedCourse', label: 'Interested Course' },
    { id: 'test', label: 'Test' },
    { id: 'score', label: 'Score' },
    { id: 'createdAt', label: 'Created At' },

    

];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => onRequestSort(event, property);

    return (
        <thead>
            <tr>
                <th>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </th>
                {headCells.map((headCell) => (
                    <th key={headCell.id}>
                        <Link
                            underline="none"
                            color="neutral"
                            onClick={createSortHandler(headCell.id)}
                            fontWeight="lg"
                            sx={{ cursor: 'pointer', '&:hover': { color: 'primary.main' } }}
                        >
                            {headCell.label}
                        </Link>
                    </th>
                ))}
            </tr>
        </thead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function CounsellerLeadTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const dispatch = useDispatch();
    const [CounsellerFetchLead] = useCounsellerFetchLeadMutation();
    const { counsellerLead } = useSelector((state) => state.counsellerLead);

    useEffect(() => {
        const fetchLeads = async () => {
            try {
                const result = await CounsellerFetchLead().unwrap();
                dispatch(FetchCounsellerLead(result));
                toast.success('Leads fetched successfully');
            } catch (error) {
                toast.error('Failed to fetch leads');
            }
        };
        fetchLeads();
    }, [CounsellerFetchLead, dispatch]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handlePageChange = (event, value) => setPage(value);
    const handleRowsPerPageChange = (event) => setRowsPerPage(parseInt(event.target.value, 10));

    // Date Filter Logic
    const filteredLeads = counsellerLead.filter((lead) => {
        const leadDate = new Date(lead.createdAt); // Assuming each lead has a `date` field
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start && leadDate < start) return false;
        if (end && leadDate > end) return false;
        return true;
    });

    const paginatedLeads = filteredLeads.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    // Download CSV logic
    const downloadCSV = () => {
        const headers = ['Name', 'Phone', 'Email', 'Interested Country'];
        const rows = filteredLeads.map((lead) => [
            lead.name,
            lead.phone,
            lead.email,
            lead.interestedCountry,
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map((row) => row.join(',')),
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'leads.csv';
        link.click();
    };

    return (
        <Box sx={{ width: '100%', p: 2, boxShadow: 3, borderRadius: 2, bgcolor: '#fff' }}>
            {/* Filters */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    mb: 2,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                    <Select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        size="small"
                        sx={{ width: 100 }}
                    >
                        {[5, 10, 25].map((rows) => (
                            <MenuItem key={rows} value={rows}>
                                {rows} Rows
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadCSV}
                    sx={{ textTransform: 'none' }}
                >
                    Download CSV
                </Button>
            </Box>

            {/* Table */}
            <Table hoverRow>
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={() => {}}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredLeads.length}
                />
                <tbody>
                    {paginatedLeads.map((row) => (
                        <tr key={row._id} style={{ cursor: 'pointer', '&:hover': { background: '#f7f9fc' } }}>
                            <td>
                                <Checkbox />
                            </td>
                            <td>{row?.name}</td>
                            <td>{row?.phone}</td>
                            <td>{row?.email}</td>
                            <td>{row?.type}</td>

                            <td>{row?.intersetedCountry}</td>
                            <td>{row?.intersetedCourse}</td>
                            <td>{row?.Test}</td>

                            <td>{row?.Score}</td>
                            <td>{row?.createdAt?.split("T")[0]}</td>


                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography>Total Leads: {filteredLeads.length}</Typography>
                <Pagination
                    count={Math.ceil(filteredLeads.length / rowsPerPage)}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>
        </Box>
    );
}
