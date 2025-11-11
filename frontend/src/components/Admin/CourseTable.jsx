import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Checkbox from '@mui/joy/Checkbox';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import IconButton from '@mui/joy/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
// import {  useCountryFetchMutation, useCountryDeleteMutation } from '../../slices/adminApiSlice';

import ImageViewPop from './PopUps/ImageViewPop.jsx';
import { RemoveRedEye } from '@mui/icons-material';
import { useState } from 'react';

import CreateProvincePop from './PopUps/CreateProvincePop';
import { useCountryFetchMutation, useDeleteCourseMutation, useDeleteProvinceMutation, useDeleteUniversityMutation, useFetchCourseMutation, useFetchProvinceMutation, useFetchUniversityMutation } from '../../slices/adminApiSlice.js';
import { DeleteOneProvince,  FetchProvinces } from '../../slices/provinceSlice.js';
import { DeleteOneUniversity, FetchUniversitys } from '../../slices/universitySlice.js';
import CreateUniversityPop from './PopUps/CreateUniversityPop.jsx';
import CreateCoursePop from './PopUps/CreateCoursePop.jsx';
import { DeleteCourse, FetchCourses } from '../../slices/courseSlice.js';
import UpdateCoursePop from './PopUps/UpdateCoursePop.jsx';
import { FetchCountry } from '../../slices/countrySlice.js';
import { Card, CardContent } from '@mui/material';

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'university', numeric: false, disablePadding: false, label: 'University' },

    { id: 'pronvice', numeric: false, disablePadding: false, label: 'Pronvice' },

    { id: 'country', numeric: false, disablePadding: false, label: 'Country' },

    { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}

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
                        slotProps={{ input: { 'aria-label': 'select all services' } }}
                        sx={{ verticalAlign: 'sub' }}
                    />
                </th>
                {headCells?.map((headCell) => (
                    <th
                        key={headCell.id}
                        aria-sort={orderBy === headCell.id ? order : undefined}
                    >
                        <Link
                            underline="none"
                            color="neutral"
                            textColor={orderBy === headCell.id ? 'primary.plainColor' : undefined}
                            component="button"
                            onClick={createSortHandler(headCell.id)}
                            fontWeight="lg"
                            startDecorator={
                                headCell.numeric ? (
                                    <ArrowDownwardIcon sx={{ opacity: orderBy === headCell.id ? 1 : 0 }} />
                                ) : null
                            }
                            endDecorator={
                                !headCell.numeric ? (
                                    <ArrowDownwardIcon sx={{ opacity: orderBy === headCell.id ? 1 : 0 }} />
                                ) : null
                            }
                            sx={{
                                '& svg': {
                                    transition: '0.2s',
                                    transform: orderBy === headCell.id && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                                },
                                '&:hover': { '& svg': { opacity: 1 } },
                            }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            )}
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
function EnhancedTableToolbar({ numSelected, selectedRow, onViewBanner, onDelete }) {
    const [open, setOpen] = useState(false);
    const [viewBannerOpen, setViewBannerOpen] = React.useState(false);
    const [viewUpdateOpen, setViewUpdateOpen] = React.useState(false);
    const handleViewUpdateOpen = () => setViewUpdateOpen(true);
    const handleViewUpdateClose = () => setViewUpdateOpen(false);
    

    const handleClickOpen = () => setOpen(true);
    const handleViewBannerOpen = () => setViewBannerOpen(true);
    const handleViewBannerClose = () => setViewBannerOpen(false);
    const handleClose = () => {
        setOpen(false);
    }
    useEffect(() => {
        console.log("Dialog open state:", open);
      }, [open]);
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                py: 1,
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: 'background.level1',
                }),
                borderTopLeftRadius: 'var(--unstable_actionRadius)',
                borderTopRightRadius: 'var(--unstable_actionRadius)',
            }}
        >
            {numSelected > 0 ? (
                <Typography sx={{ flex: '1 1 100%' }} component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    level="body-lg"
                    sx={{ flex: '1 1 100%' }}
                    id="tableTitle"
                    component="div"
                >
                    COURSE
                </Typography>
            )}

            {numSelected > 0 ? (
                  <div className='flex flex-row justify-between space-x-4 w-[200px]'>
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
            ) : (
                <div>
                    <button
                        onClick={handleClickOpen}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                        Create
                    </button>
                        <CreateCoursePop open={open} handleClose={handleClose} />

                </div>
                
            )}
            <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.flagURL || ''} />
            <UpdateCoursePop open = {viewUpdateOpen} handleClose={handleViewUpdateClose} courseData = {selectedRow} />
        </Box>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedRow: PropTypes.object,
    onViewBanner: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
function CourseTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { courses } = useSelector(state => state.course);
    const services = courses;
    const [FetchCourse] = useFetchCourseMutation();
    const [DeleteUniversity,{isSuccess}] = useDeleteCourseMutation();
    const dispatch = useDispatch();

    const [CountryFetch] = useCountryFetchMutation();
    const [FetchProvince] = useFetchProvinceMutation();
    const [FetchUniversity] = useFetchUniversityMutation();
    const { province } = useSelector(state => state.province);
    const { countries } = useSelector(state => state.country);
    const { university } = useSelector(state => state.university);
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [selectedProvince, setSelectedProvince] = useState('all');
    const [selectedUniversity, setSelectedUniversity] = useState('all');

    // Add handlers for filter changes
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedProvince('all'); // Reset province when country changes
        setSelectedUniversity('all'); // Reset university when country changes
    };

    const handleProvinceChange = (e) => {
        setSelectedProvince(e.target.value);
        setSelectedUniversity('all'); // Reset university when province changes
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchCourse().unwrap();
                dispatch(FetchCourses(result));
                const resul2 = await FetchUniversity().unwrap();
                dispatch(FetchUniversitys(resul2));
                const result3 = await FetchProvince().unwrap();
                const result4 = await CountryFetch().unwrap();
                dispatch(FetchCountry(result4));
                dispatch(FetchProvinces(result3));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [FetchCourse, dispatch]);
    useEffect(()=>{
        if(isSuccess){
            toast.success("Deleted Successfully");
        }

    },[isSuccess])
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = services?.map((n) => n?._id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, services?.length - page * rowsPerPage);

    const handleDelete = async (id) => {
        try {
            const res = await DeleteUniversity(id).unwrap();
            dispatch(DeleteCourse(res));
        } catch (error) {
            toast.error('Error deleting banner');
        }
    };

    // Filtered Services
    const filteredServices = services?.filter(service => {
        const matchesCountry = selectedCountry === 'all' || service?.Country === selectedCountry;
        const matchesProvince = selectedProvince === 'all' || service?.University?.Province === selectedProvince;
        const matchesUniversity = selectedUniversity === 'all' || service?.University?._id === selectedUniversity;
        return matchesCountry && matchesProvince && matchesUniversity;
    });
    console.log("course",selectedCountry)
    console.log("Country",selectedProvince)
    console.log("services",services)
    return (
        <Box sx={{ width: '100%', boxShadow: 'md', borderRadius: 'sm' }}>
            <Card>
            <CardContent>
            
            {/* Filters Section */}
            <Box sx={{ display: 'flex justify-between', gap: 2, p: 2 }}>
                <div className="flex items-center gap-4">
                    <Typography level="body-sm" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Filter by Country:
                    </Typography>
                    <select
                        variant="outlined"
                        size="sm"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                    >
                        <option value="all">All Countries</option>
                        {countries?.map(country => (
                            <option key={country?._id} value={country?._id}>{country.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-4">
                    <Typography level="body-sm" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Filter by Province:
                    </Typography>

                    <select
                        variant="outlined"
                        size="sm"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                    >
                        <option value="all">All Provinces</option>
                        {province?.filter(p => p?.Country?._id === selectedCountry)?.map(p => (
                            <option key={p?._id} value={p?._id}>{p.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-4">
                    <Typography level="body-sm" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                        Filter by University:
                    </Typography>            
                    <select
                        variant="outlined"
                        size="sm"
                        value={selectedUniversity}
                        onChange={(e) => setSelectedUniversity(e.target.value)}
                    >
                        <option value="all">All Universities</option>
                        {university?.filter(u => u?.Province?._id === selectedProvince)?.map(u => (
                            <option key={u?._id} value={u?._id}>{u?.name}</option>
                        ))}
                    </select>
                </div>
                </Box>
               </CardContent>
                </Card>
            <EnhancedTableToolbar
                numSelected={selected.length}
                selectedRow={services?.find((service) => service?._id === selected[0])}
                onDelete={handleDelete}
            />
            
            {/* Table Section */}
            <Table aria-labelledby="tableTitle" hoverRow sx={{ '--TableCell-headBackground': 'transparent' }}>
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={filteredServices?.length}
                />
                <tbody>
                    {/* {console.log(filteredServices,"---------------------------")}
                    {stableSort(filteredServices, getComparator(order, orderBy))
                        ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        ?.map((row, index) => {
                            const isItemSelected = isSelected(row?._id);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                                <tr
                                    hover
                                    onClick={(event) => handleClick(event, row?._id)}
                                    role="checkbox"
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row?._id}
                                    selected={isItemSelected}
                                >
                                    <td>
                                        <Checkbox
                                            color={isItemSelected ? 'primary' : 'neutral'}
                                            checked={isItemSelected}
                                            slotProps={{ input: { 'aria-labelledby': labelId } }}
                                            sx={{ verticalAlign: 'sub' }}
                                        />
                                    </td>
                                    <td>{row?.ProgramName}</td>
                                    <td>{row?.University?.name}</td>
                                    <td> {province?.find((c) => c?._id === row?.University?.Province)?.name} </td>
                                    <td> {countries?.find((c) => c?._id === row?.Country)?.name} </td>
                                    <td>{row?.Category}</td>
                                    <td>{row?.Location}</td>
                                </tr>
                            );
                        })}
                    {emptyRows > 0 && (
                        <tr style={{ height: 53 * emptyRows }}>
                            <td colSpan={6} />
                        </tr>
                    )} */}
                </tbody>
            </Table>

            {/* Pagination Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 2, p: 2 }}>
                <Select
                    variant="outlined"
                    size="sm"
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                >
                    {[5, 10, 25]?.map((rowsPerPageOption) => (
                        <Option key={rowsPerPageOption} value={rowsPerPageOption}>
                            {rowsPerPageOption} rows
                        </Option>
                    ))}
                </Select>
                <Typography textColor="text.secondary" fontSize="sm">
                    {page * rowsPerPage + 1}-
                    {page * rowsPerPage + rowsPerPage > filteredServices?.length
                        ? filteredServices?.length
                        : page * rowsPerPage + rowsPerPage}{' '}
                    of {filteredServices?.length}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page === 0}
                        onClick={() => handleChangePage(null, page - 1)}
                        sx={{ bgcolor: 'background.surface' }}
                    >
                        <ArrowDownwardIcon fontSize="small" sx={{ transform: 'rotate(90deg)' }} />
                    </IconButton>
                    <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page >= Math.ceil(filteredServices?.length / rowsPerPage) - 1}
                        onClick={() => handleChangePage(null, page + 1)}
                        sx={{ bgcolor: 'background.surface' }}
                    >
                        <ArrowDownwardIcon fontSize="small" sx={{ transform: 'rotate(-90deg)' }} />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}

export default CourseTable;
