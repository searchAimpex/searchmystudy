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
import { useServiceFetchAllMutation, useDeleteBannerMutation, useServiceDeleteMutation, useCounsellerFetchLeadMutation, useGetLeadMutation, useHomeLeadDeleteMutation, useFetchLoanMutation, useDeleteLoansMutation, useGetQueryMutation } from '../../slices/adminApiSlice';

import { DownloadDone, RemoveRedEye } from '@mui/icons-material';
import { useState } from 'react';
import { DeleteLoan, FetchLoans } from '../../slices/loanSlice.js';
import UpdateLoanStatus from './PopUps/UpdateLoanStatusPop.jsx';
import DetailedLoanPop from './PopUps/DetailedLoanPop.jsx';

const headCells = [
    { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'Name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'Email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'Phone Number', numeric: false, disablePadding: false, label: 'Phone' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' },
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

function EnhancedTableToolbar({ numSelected, selectedRow, onViewBanner, onDelete,downloadfile }) {
    const [open, setOpen] = useState(false);
    const [viewBannerOpen, setViewBannerOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleViewBannerOpen = () => setViewBannerOpen(true);
    const handleViewBannerClose = () => setViewBannerOpen(false);

    const [openStatus, setOpenStatus] = useState(false);
    const handleViewStatusOpen = () => setOpenStatus(true);
    const handleViewStatusClose = () => setOpenStatus(false);

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
                    QUERY APPLICATIONs
                </Typography>
            )}

            {numSelected > 0 ? (
                <div className='flex flex-row justify-between w-[150px]'>
                    <Tooltip title="Delete Banner">
                        <IconButton size="sm" color="danger" variant="solid" onClick={() => onDelete(selectedRow?._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Status">
                        <IconButton size="sm" color="danger" variant='solid' >
                            <EditIcon onClick = {()=>{
                                handleViewStatusOpen()
                            }} />
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
                <Tooltip title="Download File">
                <DownloadDone size="sm" variant="outlined" color="danger" onClick={()=>downloadfile()}>
                    <AddIcon />
                </DownloadDone>
            </Tooltip>
            )}
            <DetailedLoanPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow || {}} />
            <UpdateLoanStatus ticketId= {selectedRow?._id}  open={openStatus}  handleClose={handleViewStatusClose} />
        </Box>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedRow: PropTypes.object,
    onViewBanner: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

function QueryTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { loan } = useSelector((state) => state.loan);

    const  counsellerLead  =loan
    
    const [GetQuery, { isSuccess }] = useGetQueryMutation();

    const [DeleteLoans, DeleteState] = useDeleteLoansMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {

            // toast.success('Data fetched successfully');
        }
        if (DeleteState.isSuccess) {
            toast.success('Service deleted successfully');
        }
    }, [isSuccess, DeleteState.isSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await GetQuery().unwrap();
                // console.log(result,":::::::::::::::::::::::::::::::::::::::::::::::::::::::");
                dispatch(FetchLoans(result.data));
            } catch (error) {
                console.error('Failed to fetch services:', error);
            }
        };
        fetchData();
    }, [GetQuery, dispatch]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = counsellerLead?.map((n) => n._id);
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

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, counsellerLead?.length - page * rowsPerPage);

    const handleViewBanner = (banner) => {
        console.log('Viewing banner:', banner);
    };

    const handleDelete = async (id) => {
        try {
            const res = await DeleteLoans(id).unwrap();
            dispatch(DeleteLoan(res))
        } catch (error) {
            toast.error('Error deleting banner');
        }
    };
    const handleDownload = () => {
        const headers = [ 'Name', 'Phone', 'Email', 'Interested Country'];
      
    
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', 'counseller_leads.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

    return (
        <Box sx={{ width: '100%', boxShadow: 'md', borderRadius: 'sm' }}>
            <EnhancedTableToolbar numSelected={selected.length} selectedRow={counsellerLead?.find((service) => service._id === selected[0])} onViewBanner={handleViewBanner} onDelete={handleDelete} downloadfile={handleDownload} />
            <Table aria-labelledby="tableTitle" hoverRow sx={{ '--TableCell-headBackground': 'transparent' }}>
               <thead>
  <tr>
    <th></th> {/* for the checkbox */}
    <th>Name</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Created At</th>
  </tr>
</thead>

                <tbody>
                    {stableSort(counsellerLead, getComparator(order, orderBy))
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
                                    {/* <td id={labelId}>{row?._id}</td> */}
                                    <td>{row?.name}  </td>
                                    <td>{row?.email}</td>
                                    <td>{row?.phone}</td>
                                    <td>{row?.createdAt}</td>
                                </tr>
                            );
                        })}
                    {emptyRows > 0 && (
                        <tr style={{ height: 53 * emptyRows }}>
                            <td colSpan={6} />
                        </tr>
                    )}
                </tbody>
            </Table>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: 2,
                    p: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    bgcolor: 'background.level1',
                    borderBottomLeftRadius: 'var(--unstable_actionRadius)',
                    borderBottomRightRadius: 'var(--unstable_actionRadius)',
                }}
            >
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
                    {page * rowsPerPage + rowsPerPage > counsellerLead?.length
                        ? counsellerLead?.length
                        : page * rowsPerPage + rowsPerPage}{' '}
                    of {counsellerLead?.length}
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
                        <ArrowDownwardIcon
                            fontSize="small"
                            sx={{ transform: 'rotate(90deg)' }}
                        />
                    </IconButton>
                    <IconButton
                        size="sm"
                        color="neutral"
                        variant="outlined"
                        disabled={page >= Math.ceil(counsellerLead?.length / rowsPerPage) - 1}
                        onClick={() => handleChangePage(null, page + 1)}
                        sx={{ bgcolor: 'background.surface' }}
                    >
                        <ArrowDownwardIcon
                            fontSize="small"
                            sx={{ transform: 'rotate(-90deg)' }}
                        />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
}
export default QueryTable;
