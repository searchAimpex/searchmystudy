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
import { useCountryFetchMutation, useDeleteUniversityMutation, useFetchProvinceMutation, useFetchUniversityMutation } from '../../slices/adminApiSlice.js';
import { FetchProvinces } from '../../slices/provinceSlice.js';
import { DeleteOneUniversity, FetchUniversitys } from '../../slices/universitySlice.js';
import CreateUniversityPop from './PopUps/CreateUniversityPop.jsx';
import UpdateUniversityPop from './PopUps/UpdateUniversityPop.jsx';
import { FetchCountry } from '../../slices/countrySlice.js';
import { Card, CardContent, MenuItem, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const headCells = [
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'province', numeric: false, disablePadding: false, label: 'Province' },
    { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
    { id: 'updatedAt', numeric: false, disablePadding: false, label: 'Updated At' },

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
    const navigate = useNavigate()
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
                    UNIVERSITY
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
                        onClick={() => { handleViewUpdateOpen() }}
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
                    <CreateUniversityPop open={open} handleClose={handleClose} />

                </div>
            )}
            <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.flagURL || ''} />
            <UpdateUniversityPop open={viewUpdateOpen} handleClose={handleViewUpdateClose} initialData={selectedRow} />

        </Box>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedRow: PropTypes.object,
    onViewBanner: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
function UniversityTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { university } = useSelector(state => state.university);
// Filter only those with mbbsAbroad === true
const filteredUniversities = university.filter(u => u.Country?.mbbsAbroad === false);


    const services = university;

    const [FetchUniversity, { isSuccess }] = useFetchUniversityMutation();
    const [DeleteUniversity] = useDeleteUniversityMutation();
    const dispatch = useDispatch();

    const [CountryFetch] = useCountryFetchMutation();
    const [FetchProvince] = useFetchProvinceMutation();

    const { province } = useSelector(state => state.province);
    const { countries } = useSelector(state => state.country);

    const [selectedCountry, setSelectedCountry] = useState('all');
    const [selectedProvince, setSelectedProvince] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchUniversity().unwrap();
                // console.log(dispatch(FetchUniversitys(result)),"++++++++++++++++++++++++++++++++++++++++++++")
                dispatch(FetchUniversitys(result));
                const result2 = await FetchProvince().unwrap();
                const result3 = await CountryFetch().unwrap();
                dispatch(FetchCountry(result3));
                dispatch(FetchProvinces(result2));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [FetchUniversity, dispatch]);

    // Filter universities based on selected country and province
    const filteredServices = services.filter((service) => {
        const matchesCountry = selectedCountry === 'all' || service?.Province?.Country === selectedCountry;
        const matchesProvince = selectedProvince === 'all' || service?.Province?._id === selectedProvince;
        return matchesCountry && matchesProvince;
    });

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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredServices?.length - page * rowsPerPage);

    const handleViewBanner = (banner) => {
        console.log('Viewing banner:', banner);
    };

    const handleDelete = async (id) => {
        try {
            const res = await DeleteUniversity(id).unwrap();
            dispatch(DeleteOneUniversity(res))
        } catch (error) {
            toast.error('Error deleting banner');
        }
    };


    const handleCountryChange = (event) => {
        setSelectedCountry(event.target.value);
        setSelectedProvince('all'); // Reset province when country changes
    };

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);
    };
    console.log("country ===>", selectedCountry)
    console.log("provincve", selectedProvince)

    // Calculate pagination values
    const totalPages = Math.ceil(filteredServices.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = stableSort(filteredServices, getComparator(order, orderBy))
        .slice(startIndex, endIndex);

    return (
        <Box sx={{ width: '100%', boxShadow: 'md', borderRadius: 'sm' }}>
            <Card>
                <CardContent>

                    <Box sx={{ p: 2, display: 'flex justify-between', gap: 2 }}>
                        <div className="flex items-center gap-4">
                            <Typography level="body-sm" sx={{ fontWeight: 'bold', fontSize: '16px' }}>
                                Filter by Country:
                            </Typography>
                            <select
                                variant="outlined"
                                size="sm"
                                value={selectedCountry}
                                onChange={handleCountryChange}
                                className='border p-2 rounded-sm'

                            >
                                <option value="all">All Countries</option>
                                {countries?.map((country) => (
                                    <option key={country?._id} value={country?._id}>
                                        {country.name}
                                    </option>
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
                                className='border p-2 rounded-sm'
                                value={selectedProvince}
                                onChange={handleProvinceChange}
                            >
                                <option value="all">All Provinces</option>
                                {province
                                    ?.filter((prov) => prov.Country?._id === selectedCountry)
                                    .map((prov) => (
                                        <option key={prov?._id} value={prov?._id}>
                                            {prov.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </Box>
                </CardContent>
            </Card>

            <EnhancedTableToolbar numSelected={selected.length} selectedRow={filteredServices?.find((service) => service?._id === selected[0])} onViewBanner={handleViewBanner} onDelete={handleDelete} />
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
                    {filteredUniversities
                        ?.map((row, index) => {
                            const isItemSelected = isSelected(row?._id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                             <>
                                {/* <tr>
                                    
                                </tr> */}
                                <tr
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
                                    <td id={labelId}>{row?.name}</td>
                                    <td>{province?.find((c) => c?._id === row?.Province?._id || "None")?.name}</td>
                                    
                                    <td>{countries?.find((c) => c?._id === row?.Country)?.name}</td>
                                    <td>{row?.createdAt?.split('T')[0]}</td>
                                    <td>{row?.updatedAt?.split('T')[0]}</td>
                                </tr></>
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
export default UniversityTable;
