import * as React from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateBannerPop from './PopUps/CreateBannerPop.jsx';
import { useGetAllBannerMutation,useDeleteBannerMutation, useGetAllPromotionalMutation, useDeletePromotionalMutation, useFetchNavMutation, useDeleteMyNavMutation, useFetchFileMutation, useDeleteMyFileMutation } from '../../slices/adminApiSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteBannerState, FetchBanner } from '../../slices/bannerSlice';
import ImageViewPop from './PopUps/ImageViewPop.jsx';
import CreatePromotionalPop from './PopUps/CreatePromotionalPop.jsx';
import { DeletePromotionalState, FetchPromotional } from '../../slices/promotionalSlice.js';
import { DeleteOneNavs, FetchNavs } from '../../slices/navSlice.js';
import CreateExtraPop from './PopUps/CreateExtraLinkPop.jsx';
import { DeleteOneFiles, FetchFiles } from '../../slices/fileSlice.js';
import CreatePromotionalItemsPop from './PopUps/CreatePromotionItemsPop.jsx';
import { MenuItem } from '@mui/material';
import { useState } from 'react';

function createData(id, title, altName, createdAt) {
    return {
      id,
      title,
      altName,
      createdAt,
    };
  }



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

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
      id: 'country',
      numeric: false,
      disablePadding: true,
      label: 'COUNTRY',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      label: 'NAME',
    },
    {
      id: 'type',
      numeric: false,
      disablePadding: false,
      label: 'TYPE',
    },
    {
        id: 'updatedAt',
        numeric: false,
        disablePadding: false,
        label: 'FILEs',
      },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: 'CREATED AT',
    },
  
 
  ];
  

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  
  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                'aria-label': 'select all desserts',
              },
            }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells?.map((headCell) => {
            console.log("head cell",headCell)
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active ? { asc: 'ascending', desc: 'descending' }[order] : undefined
              }
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell?.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
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
          FILE 
        </Typography>
      )}

      {numSelected > 0 ? (

        <div className='flex flex-row justify-between w-[100px]'>
        <Tooltip title="Delete Banner">
          <IconButton size="sm" color="danger" variant="solid"    
            onClick={() => {
                onDelete(selectedRow?._id);
              }}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="View Banner">
          <IconButton size="sm" color="danger" variant="solid"      onClick={() => {
                onViewBanner(selectedRow?.imageURL);
                handleViewBannerOpen();
              }}>
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
      
        </div>
      ) : (
        <Tooltip title="Create Banner">
          <IconButton size="sm" variant="outlined" color="neutral">
            <AddIcon  onClick={handleClickOpen}/>
            <CreatePromotionalItemsPop open={open} handleClose={handleClose} />
          </IconButton>
        </Tooltip>
      )}
      <ImageViewPop open={viewBannerOpen} handleClose={handleViewBannerClose} imageURL={selectedRow?.imageURL || ''} />
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedRow: PropTypes.object,
  onViewBanner: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired, // Add onDelete prop type
};

function FileTable() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('_id');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { file } = useSelector((state) => state.file);
    const banner = file
    const [FetchFile, { isSuccess }] = useFetchFileMutation();
    const [DeleteMyFile,DeleteState] = useDeleteMyFileMutation(); // Hook for deleting banner
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (isSuccess) {
        toast.success('Data fetched successfully');
      }
      if(DeleteState.isSuccess){
        toast.success('Banner deleted successfully');
       
      }
    }, [isSuccess,DeleteState.isSuccess]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await FetchFile();
    
          dispatch(FetchFiles(res.data));
        } catch (error) {
          toast.error('Failed to fetch data');
        }
      };
  
      fetchData();
    }, [FetchFile]);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = banner.map((n) => n._id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
    const [type,setType] = useState('TEMPLATE')
    const filteredRows = banner?.filter(row =>row?.type === type);

    const handleClick = (event, id) => {
      const selectedIndex = selected?.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected?.slice(1));
      } else if (selectedIndex === selected?.length - 1) {
        newSelected = newSelected.concat(selected?.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected?.slice(0, selectedIndex), selected?.slice(selectedIndex + 1));
      }
  
      setSelected(newSelected);
    };
  
    const handleChangePage = (newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event, newValue) => {
      setRowsPerPage(parseInt(newValue.toString(), 10));
      setPage(0);
    };
  
    const getLabelDisplayedRowsTo = () => {
      if (banner?.length === -1) {
        return (page + 1) * rowsPerPage;
      }
      return rowsPerPage === -1 ? banner?.length : Math.min(banner?.length, (page + 1) * rowsPerPage);
    };
  
    const isSelected = (id) => selected.indexOf(id) !== -1;
  
    const deleteSelectedBanners = async () => {
      try {
        const res = await Promise.all(selected.map(async (id) => {
          await DeleteMyFile(id);
          return id; 
        }));
        console.log("Delete res",res);
        dispatch(DeleteOneFiles(res))
        setSelected([]);
      } catch (error) {
        toast.error('Failed to delete banners');
      }
    };
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - banner?.length) : 0;
  
    return (
      <Box variant="outlined" sx={{ width: '100%', boxShadow: 'sm', borderRadius: 'sm' }}>
        <EnhancedTableToolbar
          numSelected={selected?.length}
          selectedRow={banner?.find((row) => isSelected(row._id))}
          onViewBanner={(imageURL) => {
            // Implement logic to display the banner view popup
            console.log('Viewing banner with imageURL:', imageURL);
          }}
          onDelete={deleteSelectedBanners} // Pass delete function
        /><Box>
          Filter By Type:
                  <select
                      size="small"
                      className='p-2 border'
                      sx={{ width: 100 }}
                      onChange={(e)=>setType(e.target.value)}
                      value = {type}
                    >
                       
                            <option value='TEMPLATE'>
                                TEMPLATE
                            </option>
                              
                            <option value='BROUCHER'>
                              BROUCHER
                            </option>
                    </select>
                </Box>
        <Table
          aria-labelledby="tableTitle"
          hoverRow
          sx={{
            '--TableCell-headBackground': 'transparent',
            '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
            '& thead th:nth-child(1)': { width: '40px' },
            '& thead th:nth-child(2)': { width: '30%' },
            '& tr > *:nth-child(n+3)': { textAlign: 'right' },
          }}
        >
          {/* Table Header */}
          <thead>
            <tr>
              <th>
                {/* Select All Checkbox */}
                <Checkbox
                  indeterminate={selected?.length > 0 && selected?.length < banner?.length}
                  checked={banner?.length > 0 && selected?.length === banner?.length}
                  onChange={handleSelectAllClick}
                  slotProps={{ input: { 'aria-label': 'select all desserts' } }}
                  sx={{ verticalAlign: 'sub' }}
                />
              </th>
              {/* Table Head Cells */}
              {headCells?.map((headCell) => (
                <th key={headCell?.id}>
                  {/* Sort Link */}
                  <Link
                    underline="none"
                    color="neutral"
                    textColor={orderBy === headCell?.id ? 'primary.plainColor' : undefined}
                    component="button"
                    onClick={() => handleRequestSort(headCell?.id)}
                    fontWeight="lg"
                    startDecorator={headCell?.numeric ? <ArrowDownwardIcon /> : null}
                    endDecorator={!headCell?.numeric ? <ArrowDownwardIcon /> : null}
                    sx={{
                      '& svg': { transition: '0.2s', transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)' },
                      '&:hover': { '& svg': { opacity: 1 } },
                    }}
                  >
                    {headCell?.label}
                    {/* Visually Hidden Sort Direction */}
                    {orderBy === headCell?.id ? (
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                    
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
  
          {/* Table Body */}
          <tbody>
            {filteredRows
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
                        ? { '--TableCell-dataBackground': 'var(--TableCell-selectedBackground)' }
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
                    <td id={labelId} scope="row">
                      {row?.SecondCountry?.name}
                    </td>
                    <td>{row.name}</td>
                    <td>{row.type}</td>
                    <td>
                        {row.type === 'TEMPLATE' ? (
                            <button onClick={() => window.open(row.template, '_blank')}>View</button>
                        ) : (
                            <button onClick={() => window.open(row.broucher, '_blank')}>View</button>
                        )}
                    </td>

                    <td>{new Date(row.createdAt).toLocaleString()}</td>
                  </tr>
                );
              })}
  
            {/* Empty Rows Placeholder */}
            {emptyRows > 0 && (
              <tr style={{ height: `calc(${emptyRows} * 40px)`, '--TableRow-hoverBackground': 'transparent' }}>
                <td colSpan={6} aria-hidden />
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
                      from: banner?.length === 0 ? 0 : page * rowsPerPage + 1,
                      to: getLabelDisplayedRowsTo(),
                      count: banner?.length === -1 ? -1 : banner?.length,
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
                        banner?.length !== -1
                          ? page >= Math.ceil(banner?.length / rowsPerPage) - 1
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
  
  export default FileTable;