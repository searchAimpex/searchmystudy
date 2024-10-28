import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Input from '@mui/joy/Input';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateBannerPop from './PopUps/CreateBannerPop.jsx';
import { useGetAllBannerMutation, useDeleteBannerMutation, useFetchTransactionMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBannerState, FetchBanner } from '../../slices/bannerSlice';
import ImageViewPop from './PopUps/ImageViewPop.jsx';
import CreateCenterTransactionPop from './PopUps/CreateCenterTransactionPop.jsx';
import { FetchAllTransactionss } from '../../slices/transactionSlice.js';

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

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
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const headCells = [
  {
    id: '_id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'centerCode',
    numeric: false,
    disablePadding: false,
    label: 'Center Code',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'transactionDate',
    numeric: false,
    disablePadding: false,
    label: 'Transaction Date',
  },
  {
    id: 'transactionMode',
    numeric: false,
    disablePadding: false,
    label: 'Transaction Mode',
  },
  {
    id: 'remarks',
    numeric: false,
    disablePadding: false,
    label: 'Remarks',
  },
];

function EnhancedTableToolbar({ numSelected, selectedRow, onViewBanner, onDelete, searchTerm, onSearchChange }) {
  const [open, setOpen] = useState(false);
  const [viewBannerOpen, setViewBannerOpen] = useState(false);

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
        <Box sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography level="body-lg" component="div">
            Center Ledger
          </Typography>
          <FormControl size="sm" sx={{ width: 250 }}>
            <Input
              placeholder="Search by Center Code"
              startDecorator={<SearchIcon />}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </FormControl>
        </Box>
      )}

      {numSelected > 0 ? (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Delete Selected">
            <IconButton size="sm" color="danger" variant="solid" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="View Details">
            <IconButton size="sm" color="primary" variant="solid" onClick={handleViewBannerOpen}>
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Tooltip title="Add Transaction">
          <IconButton size="sm" variant="outlined" color="neutral" onClick={handleClickOpen}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
      
      <CreateCenterTransactionPop open={open} handleClose={handleClose} />
      <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.imageURL || ''} />
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedRow: PropTypes.object,
  onViewBanner: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

function CenterLedgerTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('_id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { transaction } = useSelector((state) => state.transaction);
  const [FetchTransaction, { isSuccess }] = useFetchTransactionMutation();
  const [DeleteBanner, DeleteState] = useDeleteBannerMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Data fetched successfully');
    }
    if (DeleteState.isSuccess) {
      toast.success('Records deleted successfully');
    }
  }, [isSuccess, DeleteState.isSuccess]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await FetchTransaction();
        dispatch(FetchAllTransactionss(res.data));
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };
    fetchData();
  }, [FetchTransaction, dispatch]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = transaction.map((n) => n._id);
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
  
  const getLabelDisplayedRowsTo = () => {
    if (transaction?.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1 ? transaction?.length : Math.min(transaction?.length, (page + 1) * rowsPerPage);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const filteredTransactions = transaction?.filter((row) =>
    row.centerCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredTransactions.length) : 0;

  return (
    <Box variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}>
      <EnhancedTableToolbar
        numSelected={selected.length}
        selectedRow={transaction.find((row) => isSelected(row._id))}
        onViewBanner={(imageURL) => {
          console.log('Viewing transaction:', imageURL);
        }}
        onDelete={async () => {
          try {
            await Promise.all(selected.map((id) => DeleteBanner(id)));
            dispatch(DeleteBannerState(selected));
            setSelected([]);
          } catch (error) {
            toast.error('Failed to delete records');
          }
        }}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <Table
        aria-labelledby="tableTitle"
        hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent',
          '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': { width: '40px' },
          '& thead th:nth-child(2)': { width: '30%' },
        }}
      >
        <thead>
          <tr>
            <th>
              <Checkbox
                indeterminate={selected.length > 0 && selected.length < filteredTransactions.length}
                checked={filteredTransactions.length > 0 && selected.length === filteredTransactions.length}
                onChange={handleSelectAllClick}
                slotProps={{ input: { 'aria-label': 'select all transactions' } }}
                sx={{ verticalAlign: 'sub' }}
              />
            </th>
            {headCells.map((headCell) => (
              <th key={headCell.id}>
                <Link
                  underline="none"
                  color="neutral"
                  textColor={orderBy === headCell.id ? 'primary.plainColor' : undefined}
                  component="button"
                  onClick={() => handleRequestSort(null, headCell.id)}
                  fontWeight="lg"
                  startDecorator={headCell.numeric ? <ArrowDownwardIcon sx={{ opacity: orderBy === headCell.id ? 1 : 0 }} /> : null}
                  endDecorator={!headCell.numeric ? <ArrowDownwardIcon sx={{ opacity: orderBy === headCell.id ? 1 : 0 }} /> : null}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                    '&:hover': { '& svg': { opacity: 1 } },
                  }}
                >
                  {headCell.label}
                </Link>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {stableSort(filteredTransactions, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row._id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  onClick={(event) => handleClick(event, row._id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row._id}
                  style={
                    isItemSelected
                      ? {
                          '--TableCell-dataBackground':
                            'var(--TableCell-selectedBackground)',
                        }
                      : {}
                  }
                >
                  <td>
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{ input: { 'aria-labelledby': labelId } }}
                      sx={{ verticalAlign: 'top' }}
                    />
                  </td>
                  <td>{row._id}</td>
                  <td>{row.centerCode}</td>
                  <td>{row.amount}</td>
                  <td>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td>{row.transactionMode}</td>
                  <td>
                    <Tooltip title={row.remarks} placement="top">
                      <span>{row.remarks.length > 20 ? `${row.remarks.substring(0, 20)}...` : row.remarks}</span>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}

          {emptyRows > 0 && (
            <tr style={{ height: `calc(${emptyRows} * 40px)`, '--TableRow-hoverBackground': 'transparent' }}>
              <td colSpan={7} />
            </tr>
          )}
        </tbody>

         {/* Table Footer */}
         <tfoot>
            <tr>
              <td colSpan={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                  {/* Rows Per Page Selector */}
                  <FormControl orientation="horizontal" size="sm">
                    <FormLabel>Rows per page:</FormLabel>
                    <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                      <Option value={5}>5</Option>
                      <Option value={10}>10</Option>
                      <Option value={25}>25</Option>
                    </Select>
                  </FormControl>
  
                  {/* Displayed Rows Label */}
                  <Typography textAlign="center" sx={{ minWidth: 80 }}>
                    {labelDisplayedRows({
                      from: transaction.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: transaction.length === -1 ? -1 : transaction.length,
                    })}
                  </Typography>
  
                  {/* Pagination Buttons */}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={page === 0}
                      onClick={() => handleChangePage(page - 1)}
                      sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowLeftIcon />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="neutral"
                      variant="outlined"
                      disabled={
                        transaction.length !== -1
                          ? page >= Math.ceil(transaction.length / rowsPerPage) - 1
                          : false
                      }
                      onClick={() => handleChangePage(page + 1)}
                      sx={{ bgcolor: 'background.surface' }}
                    >
                      <KeyboardArrowRightIcon />
                    </IconButton>
                  </Box>
                </Box>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Box>
    );
  }
  
  export default CenterLedgerTable;