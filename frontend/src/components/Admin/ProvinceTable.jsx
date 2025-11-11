import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Box,
    Typography,
    Table,
    Checkbox,
    Select,
    MenuItem,
    Pagination,
    InputLabel,
    FormControl
} from '@mui/material';
import { Card, CardContent } from '@mui/joy';
import { toast } from 'react-toastify';
import {
    useFetchProvinceMutation,
    useDeleteProvinceMutation,
    useCountryFetchMutation,
    useCountryAllFetchMutation
} from '../../slices/adminApiSlice';
import { FetchProvinces, DeleteOneProvince } from '../../slices/provinceSlice';
import { FetchCountry } from '../../slices/countrySlice';
import CreateProvincePop from './PopUps/CreateProvincePop';
import UpdateProvincePop from './PopUps/UpdateProvincePop';
import { useNavigate } from 'react-router-dom';

// Utility functions for sorting
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// Table header component
const EnhancedTableHead = ({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) => {
    const headCells = [
        { id: 'name', label: 'Name' },
        { id: 'country', label: 'Country' },
        { id: 'createdAt', label: 'Created Date' },
        { id: 'updatedAt', label: 'Updated Date' },
    ];

    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <thead>
            <tr>
                <th style={{ width: '100%' }}>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </th>
                {headCells.map((headCell) => (
                    <th
                        key={headCell.id}
                        onClick={createSortHandler(headCell.id)}
                        style={{
                            cursor: 'pointer',
                            width: '300px', // Add a width style to header cells
                            padding: '2px',
                        }}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <span>{order === 'desc' ? ' ▼' : ' ▲'}</span>
                        ) : null}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

// Table toolbar component
const EnhancedTableToolbar = ({ numSelected, selectedRow, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [viewBannerOpen, setViewBannerOpen] = React.useState(false);
    const [viewUpdateOpen, setViewUpdateOpen] = React.useState(false);
    const navigate = useNavigate()
    const handleClickOpen = () => setOpen(true);
    const handleViewBannerOpen = () => setViewBannerOpen(true);
    const handleViewBannerClose = () => setViewBannerOpen(false);

    const handleViewUpdateOpen = () => setViewUpdateOpen(true);
    const handleViewUpdateClose = () => setViewUpdateOpen(false);
    const handleClose = () => {
        console.log("fix",open)
        setOpen((preValue)=>(preValue ? false: preValue));
    }
    return (
        <Box sx={{ 
            px: 2, 
            py: 1, 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
        }}>
            <Typography level="h6" component="div">
                {numSelected > 0 ? `${numSelected} selected` : 'Provinces'}
            </Typography>

            {numSelected === 1  ? 
                <div className='flex space-x-5'>
                    <button
                        onClick={() => onDelete(selectedRow?._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                    <button
                        onClick= {()=> {handleViewUpdateOpen()}}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Update
                    </button>
                </div>
                  
            : 
        
        <div>
             <button
                 onClick={handleClickOpen}
                 className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-600"
             >
                 Create
             </button>
             <CreateProvincePop open={open} handleClose={handleClose} />
         </div>
            }
                <UpdateProvincePop open={viewUpdateOpen} handleClose={handleViewUpdateClose}  provinceData = {selectedRow}/>
        </Box>
    );
};

// Main component
function ProvinceTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('_id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedCountry, setSelectedCountry] = useState('all');

    const { province } = useSelector(state => state.province);
    const { countries } = useSelector(state => state.country);
    const services = province || [];

    const [FetchProvince, { isSuccess }] = useFetchProvinceMutation();
    const [DeleteProvince] = useDeleteProvinceMutation();
    const [CountryFetch] = useCountryAllFetchMutation();
    const dispatch = useDispatch();

    // Filter provinces based on selected country
    const filteredServices = selectedCountry === 'all'
        ? services
        : services.filter(service => service?.Country?._id === selectedCountry);

    // Calculate pagination values
    const totalPages = Math.ceil(filteredServices.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = stableSort(filteredServices, getComparator(order, orderBy))
        .slice(startIndex, endIndex);

    useEffect(() => {
        if (isSuccess) {
            toast.success('Data fetched successfully');
        }
    }, [isSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchProvince().unwrap();
                console.log(result,"+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+/+");
                
                const result1 = await CountryFetch().unwrap();
                dispatch(FetchCountry(result1));
                dispatch(FetchProvinces(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
                toast.error('Failed to fetch data');
            }
        };
        fetchData();
    }, [FetchProvince, CountryFetch, dispatch]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = services.map((n) => n?._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(newRowsPerPage);
        setPage(1);
    };

    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setPage(1);
    };

    const handleDelete = async (id) => {
        try {
            const res = await DeleteProvince(id).unwrap();
            dispatch(DeleteOneProvince(res));
            setSelected([]);
            toast.success('Province deleted successfully');
        } catch (error) {
            toast.error('Error deleting province');
        }
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    return (
<Box sx={{ width: '100%', boxShadow: 'md', borderRadius: 'sm' }}>
    <Card className="mb-4" sx={{ p: 2 }}>
        <CardContent>
            <div className="flex items-center gap-4">
                <Typography level="body-sm" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                    Filter by Countra:
                </Typography>
                <Select
                    value={selectedCountry}
                    onChange={(e) => handleCountryChange(e.target.value)}
                    displayEmpty
                    style={{ width: '200px', marginBottom: '16px' }}
                    sx={{
                        backgroundColor: 'white',
                        borderRadius: '4px',
                        boxShadow: 2,
                        '& .MuiSelect-icon': {
                            color: 'primary.main',
                        },
                    }}
                >
                    <MenuItem value="all">All Countries</MenuItem>
                    {countries?.map((country) => (
                        <MenuItem key={country?._id} value={country?._id}>
                            {country.name}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </CardContent>
    </Card>

    <EnhancedTableToolbar
        numSelected={selected.length}
        selectedRow={filteredServices.find((service) => service?._id === selected[0])}
        onDelete={handleDelete}
    />

<Table
    aria-labelledby="tableTitle"
    hover
    style={{ tableLayout: 'fixed', width: '100%' }}
    sx={{
        borderCollapse: 'collapse',  // Ensures no gap between cells
        borderSpacing: 0,
    }}
>
    <EnhancedTableHead
        numSelected={selected.length}
        order={order}
        orderBy={orderBy}
        onSelectAllClick={handleSelectAllClick}
        onRequestSort={handleRequestSort}
        rowCount={filteredServices.length}
        sx={{
            // Align header text and provide padding consistency
            th: {
                padding: '12px 16px',  // Adjust padding as needed
                textAlign: 'left',  // Or 'center', depending on the content
            },
        }}
    />
    <tbody>
        {currentPageData.map((service, index) => {
            const isItemSelected = isSelected(service?._id);
            const labelId = `checkbox-${index}`;

            return (
                <tr
                    key={service?._id}
                    hover
                    onClick={(event) => handleClick(event, service?._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    selected={isItemSelected}
                    sx={{
                        '&:hover': { backgroundColor: '#f5f5f5' },
                        cursor: 'pointer',
                    }}
                >
                    <td style={{ padding: '12px 16px', textAlign: 'left', width: '50px' }}>
                        <Checkbox
                            checked={isItemSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                        />
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'center' }}>{service.name}</td>
                     <td style={{ padding: '14px 18px', textAlign: 'center' }}> {countries.find((c) => c?._id === service?.Country?._id)?.name} </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{service.updatedAt?.split('T')[0]}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'center' }}>{service.createdAt?.split('T')[0]}</td>

                    {/* Add more columns as necessary */}
                </tr>
            );
        })}
    </tbody>
</Table>

    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
        />
    </Box>
</Box>
    );
}

export default ProvinceTable;
