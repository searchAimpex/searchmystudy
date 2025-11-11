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
import { useTestimonialFetchAllMutation, useServiceDeleteMutation, useTestimonialDeleteMutation, useAllWebinarMutation, useDeleteWebinarMutation, useFetchMediaMutation, useDeleteMediaMutation } from '../../slices/adminApiSlice';
import {  DeleteTestimonial, FetchAllTestimonial } from '../../slices/testimonialSlice';
import CreateTestimonialPop from './PopUps/CreateTestimonialPop';
import ImageViewPop from './PopUps/ImageViewPop';
import { RemoveRedEye } from '@mui/icons-material';
import { DeleteOneWebinar, FetchWebinar } from '../../slices/webinarSlice';
import CreateWebinarPop from './PopUps/CreateWebinarPop';
import CreateMediaPop from './PopUps/CreateMediaPop';
import { DeleteOneMedia, FetchMedias } from '../../slices/mediaSlice';

const headCells = [
    // { id: '_id', numeric: false, disablePadding: true, label: 'ID' },
    { id: 'title', numeric: false, disablePadding: false, label: 'Title' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'rating', numeric: false, disablePadding: false, label: 'Rating' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Created At' }
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
                        slotProps={{ input: { 'aria-label': 'select all testimonials' } }}
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
    const [open, setOpen] = React.useState(false);
    const [viewBannerOpen, setViewBannerOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true);
    const handleViewBannerOpen = () => setViewBannerOpen(true);
    const handleViewBannerClose = () => setViewBannerOpen(false);
    const handleClose = () => setOpen(false);

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
                    TESTIMONIALS
                </Typography>
            )}

            {numSelected > 0 ? (
                <div className='flex flex-row justify-between w-[150px]'>
                    <Tooltip title="Delete Testimonial">
                        <IconButton size="sm" color="danger" variant="solid" onClick={() => onDelete(selectedRow?._id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Testimonial">
                        <IconButton size="sm" color="danger" variant='solid' >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="View Banner">
                        <IconButton size="sm" color="danger" variant="solid" onClick={() => {
                            onViewBanner(selectedRow?.banner);
                            handleViewBannerOpen();
                        }}>
                            <RemoveRedEye />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (
                <Tooltip title="Create Testimonial">
                    <IconButton size="sm" variant="outlined" color="danger" onClick={handleClickOpen}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            )}
            <CreateMediaPop open={open} handleClose={handleClose} />
            <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.imageURL || ''} />
        </Box>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selectedRow: PropTypes.object,
    onViewBanner: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

function MediaTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { media } = useSelector((state) => state.media);
    const services = media || []; // Assuming `testimonial` state holds the array of testimonials
    const [FetchMedia, { isSuccess }] = useFetchMediaMutation()
    const [DeleteMedia, DeleteState] = useDeleteMediaMutation()

    const dispatch = useDispatch();

    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success('Webinar fetched successfully');
    //     }
    //     if (DeleteState.isSuccess) {
    //         toast.success('Webinar deleted successfully');
    //     }
    // }, [isSuccess, DeleteState.isSuccess]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await FetchMedia().unwrap();
                dispatch(FetchMedias(result));
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            }
        };
        fetchData();
    }, [FetchMedia, dispatch]);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = services?.map((n) => n._id);
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
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    const handleViewBanner = (banner) => {
        console.log('Viewing banner:', banner);
    };

    const handleDelete = async (id) => {
        try {
            const res = await DeleteMedia(id).unwrap();
            dispatch(DeleteOneMedia(res));
        } catch (error) {
            toast.error('Error deleting testimonial');
        }
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, services?.length - page * rowsPerPage);


    ////////////////////////////////////////////////////////////////////////convert para into lines
    function truncateDescription(description, wordLimit = 5) {
        if (!description) return '';
    
        const words = description.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    }

    return (
        <Box sx={{ width: '100%', boxShadow: 'md', borderRadius: 'sm' }}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                selectedRow={services?.find((service) => service._id === selected[0])}
                onViewBanner={handleViewBanner}
                onDelete={handleDelete}
            />
            <Table aria-labelledby="tableTitle" hoverRow sx={{
            '--TableCell-headBackground': 'transparent',
            '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
            '& thead th:nth-child(1)': { width: '40px' },
            '& thead th:nth-child(2)': { width: '30%' },
            '& thead th:nth-child(3)': { width: '50%' },
            '& thead th:nth-child(4)': { width: '30%' },
            '& thead th:nth-child(5)': { width: '40%' },
            // '& tr > *:nth-child(n+3)': { textAlign: 'right' },
          }}>
                <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={services?.length}
                />
                <tbody>
                    {stableSort(services, getComparator(order, orderBy))
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
                                    <td>{row?.title}</td>
                                    <td>{row?.description}</td>
                                    <td>{row?.rating}</td>

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
                    {page * rowsPerPage + rowsPerPage > services?.length
                        ? services?.length
                        : page * rowsPerPage + rowsPerPage}{' '}
                    of {services?.length}
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
                        disabled={page >= Math.ceil(services?.length / rowsPerPage) - 1}
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

export default MediaTable;