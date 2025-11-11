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
import { useEffect, useState } from 'react';
import { useCountryFetchMutation, useCountryDeleteMutation, useCountryAllFetchMutation } from '../../slices/adminApiSlice';
import ImageViewPop from './PopUps/ImageViewPop.jsx';
import { RemoveRedEye } from '@mui/icons-material';
import CreateCountryPop from './PopUps/CreateCountryPop.jsx';
import { DeleteCountry, FetchCountry } from '../../slices/countrySlice.js';
import StatusUpdatePop from './StatusUpdatePop.jsx';
import UpdateCountryPop from './PopUps/UpdateCountryPop.jsx';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CreateBannerPop from './PopUps/CreateBannerPop.jsx';
import MbbsCreateCountryPopup from './PopUps/MbbsCreateCountryPopup.jsx';

const headCells = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'mbbsAbroad', numeric: false, disablePadding: false, label: 'MBBS' },
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
    const [viewBannerOpen, setViewBannerOpen] = useState(false);
    const [viewUpdateOpen, setViewUpdateOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const navigate = useNavigate()


    function handleClickOpen() {
        setOpen(true)
        console.log(open)
    }
    const handleViewBannerOpen = () => setViewBannerOpen(true);
    const handleViewBannerClose = () => setViewBannerOpen(false);


    const handleClose = () => {
        console.log("Closing dialog", open);  // Verify if this logs
        setOpen(false);  // Ensure this updates `open`
    };
    console.log("fix", open)
    const handleViewUpdateOpen = () => setViewUpdateOpen(true);
    const handleViewUpdateClose = () => setViewUpdateOpen(false);

    const handleViewOpen = () => setViewOpen(true);
    const handleViewClose = () => setViewOpen(false);


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
                    COUNTRIES
                </Typography>
            )}

            {numSelected > 0 ? (
                <div className='flex flex-row justify-between w-[150px]'>
                    <Tooltip title="Delete Country">
                        <IconButton size="sm" color="danger" variant="solid" onClick={() => onDelete(selectedRow?._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Country">
                        <IconButton size="sm" color="danger" variant='solid' >
                            <EditIcon
                                onClick={() => {
                                    handleViewOpen()
                                }} />
                        </IconButton>
                    </Tooltip>
                        {/* <Tooltip title="MBBS Status Country">
                            <IconButton size="sm" color="danger" variant='solid' >
                                <EditIcon
                                    onClick={() => {
                                        handleViewUpdateOpen()
                                    }}
                                />
                            </IconButton>
                        </Tooltip> */}
                    <Tooltip title="View Hero Image">
                        <IconButton size="sm" color="danger" variant="solid">
                            <RemoveRedEye onClick={() => {
                                onViewBanner(selectedRow?.banner);
                                handleViewBannerOpen();
                            }} />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (
                <Tooltip title="Create Country">
                    <IconButton size="sm" variant="outlined" color="danger" >
                        <AddIcon onClick={handleClickOpen} />
                        <MbbsCreateCountryPopup open={open} onClose={handleClose} />

                    </IconButton>
                </Tooltip>
            )}
            <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.flagURL || ''} />
            <StatusUpdatePop open={viewUpdateOpen} handleClose={handleViewUpdateClose} countryId={selectedRow?._id} statuss={selectedRow?.mbbsAbroad} />
            <UpdateCountryPop open={viewOpen} handleClose={handleViewClose} countryData={selectedRow} />
        </Box>
    );
}
EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedRow: PropTypes.object,
    onViewBanner: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

const MbbsCountrytable = () => {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(1); // Changed to 1-based pagination
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { countries } = useSelector((state) => state.country);
    const services = countries;
    const [CountryFetch, { isSuccess }] = useCountryAllFetchMutation();
    const [CountryDelete, DeleteState] = useCountryDeleteMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await CountryFetch().unwrap();
                dispatch(FetchCountry(result));
            } catch (error) {
                toast.error('Something went wrong while fetching the countries.');
            }
        };
        fetchData();
    }, [CountryFetch, dispatch]);

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

    const handleClick = (event, _id) => {
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, _id);
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
        setPage(1); // Reset to first page when changing rows per page
    };

    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    const handleDelete = async (id) => {
        try {
            await CountryDelete(id).unwrap();
            dispatch(DeleteCountry(id));
            toast.success('Country deleted successfully');
            // Reset to first page if current page becomes empty after deletion
            const remainingItems = services.length - 1;
            const maxPage = Math.ceil(remainingItems / rowsPerPage);
            if (page > maxPage) {
                setPage(maxPage || 1);
            }
        } catch (error) {
            toast.error('Something went wrong while deleting the country.');
        }
    };

    const handleViewBanner = (banner) => {
        // Do something with the banner image, e.g., set state to show it in a modal
    };

    // Calculate the current page's data
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    
    const currentData = stableSort(services, getComparator(order, orderBy))
    .slice(startIndex, endIndex)
    .filter(item => item.mbbsAbroad === true); // 👈 filter only where mbbsAbroad is true
  
  console.log(currentData, "=======================================================");
  
    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(services.length / rowsPerPage));

    return (
        <Box sx={{ width: '100%', mt: 3 }}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                selectedRow={services.find((row) => row?._id === selected[0])}
                onViewBanner={handleViewBanner}
                onDelete={handleDelete}
            />
            <Table sx={{ minWidth: 750 }}>
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    numSelected={selected.length}
                    rowCount={services.length}
                />
                <tbody>
                    {currentData?.map((service) => (
                        <tr
                            key={service?._id}
                            onClick={(event) => handleClick(event, service?._id)}
                            role="checkbox"
                            aria-checked={isSelected(service?._id)}>
                            <td><Checkbox checked={isSelected(service?._id)} /></td>
                            {/* <td>{service?._id}</td> */}
                            <td>{service?.name}</td>
                            <td>{service?.mbbsAbroad ? "YES" : "NO"}</td>
                            <td>{service?.mbbsAbroad ? "YES" : "NO"}</td>
                            <td>{service?.createdAt}</td>
                            <td>{service?.updatedAt}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChangePage}
                    siblingCount={1}
                    boundaryCount={1}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </Box>

            
        </Box>
    );
};
export default MbbsCountrytable