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
import { useDeleteProvinceMutation, useFetchProvinceMutation } from '../../slices/adminApiSlice.js';
import { DeleteOneProvince,  FetchProvinces } from '../../slices/provinceSlice.js';
import UpdateProvincePop from './PopUps/UpdateProvincePop.jsx';
import { MenuItem, Pagination } from '@mui/material';

const headCells = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'heading', numeric: false, disablePadding: false, label: 'Heading' },
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
    const [viewBannerOpen, setViewBannerOpen] = React.useState(false);
    const [viewUpdateOpen, setViewUpdateOpen] = React.useState(false);


    const handleClickOpen = () => setOpen(true);
    const handleViewBannerOpen = () => setViewBannerOpen(true);
    const handleViewBannerClose = () => setViewBannerOpen(false);

    const handleViewUpdateOpen = () => setViewUpdateOpen(true);
    const handleViewUpdateClose = () => setViewUpdateOpen(false);
    const handleClose = () => {
        console.log("fix",open)
        setOpen((preValue)=>(preValue ? false: preValue));
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
                    PROVINCE
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
                            <EditIcon  onClick= {()=> {handleViewUpdateOpen()}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Hero Image">
                        <IconButton  size="sm" color="danger" variant="solid">
                            <RemoveRedEye onClick={() => {
                             onViewBanner(selectedRow?.banner);
                            handleViewBannerOpen();
                            }}/>
                            
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (
                <Tooltip title="Create Country">
                    <IconButton size="sm" variant="outlined" color="danger" onClick={handleClickOpen}>
                        <AddIcon />
                        <CreateProvincePop open={open} handleClose={handleClose} />
                    </IconButton>
                </Tooltip>
            )}
            <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.flagURL || ''} />
             <UpdateProvincePop open={viewUpdateOpen} handleClose={handleViewUpdateClose}  provinceData = {selectedRow}/>
        </Box>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedRow: PropTypes.object,
    onViewBanner: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

function ProvinceTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('_id');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(1); // Changed to start from 1
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { province } = useSelector(state => state.province);
    const services = province || [];
    
    const [FetchProvince, { isSuccess }] = useFetchProvinceMutation();
    const [DeleteProvince] = useDeleteProvinceMutation();
    const dispatch = useDispatch();
    console.log("row per page in compionent",rowsPerPage)
    // Calculate pagination values
    const totalPages = Math.ceil(services.length / rowsPerPage);
    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentPageData = stableSort(services, getComparator(order, orderBy))
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
                dispatch(FetchProvinces(result));
            } catch (error) {
                console.error('Failed to fetch services:', error);
                toast.error('Failed to fetch data');
            }
        };
        fetchData();
    }, [FetchProvince, dispatch]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = services.map((n) => n._id);
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
    const isSelected = (_id) => selected.indexOf(_id) !== -1;

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value,10);
        console.log("event target value")
        setRowsPerPage(newRowsPerPage);
        console.log("row per page",newRowsPerPage)
        setPage(1); 
    };
    console.log("row",rowsPerPage)
    console.log("page",page)

    const handleViewBanner = (banner) => {
        console.log('Viewing banner:', banner);
    };

    const handleDelete = async (id) => {
        try {
            const res = await DeleteProvince(id).unwrap();
            dispatch(DeleteOneProvince(res));
            toast.success('Province deleted successfully');
        } catch (error) {
            toast.error('Error deleting province');
        }
    };

    return (
        <Box sx={{ width: '100%', boxShadow: 'md', borderRadius: 'sm' }}>
            <EnhancedTableToolbar 
                numSelected={selected.length} 
                selectedRow={services.find((service) => service._id === selected[0])} 
                onViewBanner={handleViewBanner} 
                onDelete={handleDelete} 
            />
            <Table 
                aria-labelledby="tableTitle" 
                hoverRow 
                sx={{ '--TableCell-headBackground': 'transparent' }}
            >
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={services.length}
                />
                <tbody>
                    {currentPageData.map((service, index) => {
                        const isItemSelected = isSelected(service._id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <tr
                                key={service._id}
                                hover
                                onClick={(event) => handleClick(event, service._id)}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                selected={isItemSelected}
                            >
                                <td>
                                    <Checkbox
                                        checked={isItemSelected}
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </td>
                                <td>{service._id}</td>
                                <td>{service.name}</td>
                                <td>{service.heading}</td>
                                <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                                <td>{new Date(service.updatedAt).toLocaleDateString()}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Box sx={{ 
                flexShrink: 0, 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center',
                gap: 2,
                py: 2,
                px: 2
            }}>
                <Typography level="body-sm">
                    Rows per page:
                </Typography>
                <select
                    value={rowsPerPage}
                    onChange={handleChangeRowsPerPage}
                    size="sm"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                </select>
                <Typography level="body-sm">
                    {`${startIndex + 1}-${Math.min(endIndex, services.length)} of ${services.length}`}
                </Typography>
                <Box>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        size="sm"
                    />
                </Box>
            </Box>
        </Box>
    );
}

export default ProvinceTable;