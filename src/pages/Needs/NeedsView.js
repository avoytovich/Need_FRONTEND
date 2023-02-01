import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Modal,
  Box,
  Stack,
  Paper,
  Autocomplete,
  TextField,
  Tooltip,
  IconButton,
  Popover,
  Pagination,
} from '@mui/material';
import { FilterList as FilterListIcon } from '@mui/icons-material';

import { TableFilters } from '../../components';
import NeedAdd from './NeedAdd';

import './needs.sass';
import colors from './../../helper/colors.sass';

const NeedsView = ({
  showFilters,
  setShowFilters,
  filtersCount,
  setFilterCount,
  actual,
  setActual,
  noActual,
  setNoActual,
  inProgress,
  setInProgress,
  search,
  setSearch,
  selected,
  setSelected,
  page,
  count,
  totalItems,
  handleChange,
  data,
  options,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const searchEndAdornment = (
    <>
      <Box ml={1}>
        <Tooltip disableInteractive arrow title="Filter" placement="top">
          <IconButton
            className="filter-button"
            disableRipple
            onClick={(e) => setShowFilters(e.currentTarget)}
            edge="start"
            aria-label="refresh"
            size="large"
          >
            <FilterListIcon color={showFilters ? 'primary' : ''} />
            {filtersCount > 0 && (
              <Box
                position="absolute"
                width="18px"
                height="18px"
                bgcolor={colors['blue-light']}
                fontSize="12px"
                color={colors['white']}
                top="-6px"
                right="-7px"
                lineHeight="18px"
                borderRadius="50%"
              >
                {filtersCount}
              </Box>
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Popover
          open={!!showFilters}
          anchorEl={showFilters}
          onClose={() => setShowFilters(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          style={{ marginLeft: '-15px' }}
        >
          <TableFilters
            onClose={() => setShowFilters(null)}
            actual={actual}
            setActual={setActual}
            noActual={noActual}
            setNoActual={setNoActual}
            inProgress={inProgress}
            setInProgress={setInProgress}
          />
        </Popover>
      </Box>
    </>
  );

  const handleBackground = (status) => {
    switch (status) {
      case 'in progress':
        return colors['blue-light'];
      case 'actual':
        return colors['green-light'];
      case 'not actual':
        return colors['red-light'];
      default:
        break;
    }
  };

  const handleDate = (date) => new Date(date).toLocaleDateString();

  return (
    <div className="wrapper-needs">
      <Grid container spacing={0} className="container-needs">
        <Grid item xs={1} sm={1} />
        <Grid item xs={2} sm={2}>
          <Box m={2}>
            <Typography variant="font_24_serif">{totalItems} Needs</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sm={6} display="flex" justifyContent="center">
          <Stack
            direction="row"
            sx={{
              width: 250,
              margin: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
            }}
          >
            <Autocomplete
              freeSolo
              className="search-input"
              size="small"
              disableClearable
              fullWidth
              PaperComponent={({ children }) => (
                <Paper style={{ marginBottom: 10 }}>{children}</Paper>
              )}
              options={options.map((option) => ({
                id: option.id,
                label: option.title,
              }))}
              value={search}
              onChange={(e, newValue) => {
                setSearch(newValue.label || newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search NEED"
                  variant="outlined"
                  style={{
                    backgroundColor: colors['white'],
                  }}
                  value={selected}
                  onChange={(e) => {
                    setSelected(e.target.value);
                    if (e.target.value === '') {
                      setSearch('');
                    }
                  }}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    style: {
                      color: colors['blue-light'],
                    },
                    endAdornment: searchEndAdornment,
                  }}
                />
              )}
            />
          </Stack>
        </Grid>
        <Grid item xs={2} sm={2} display="flex" justifyContent="flex-end">
          <Box m={2}>
            <Button
              color="green_light"
              variant="contained"
              onClick={handleOpen}
            >
              Create
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box>
                <NeedAdd />
              </Box>
            </Modal>
          </Box>
        </Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={8} sm={8}>
          <Box m={2} display="flex" justifyContent="flex-start" flexWrap="wrap">
            {data.map(({ id, ability_to_pay, createdAt, status, title }) => (
              <Box
                key={id}
                sx={{
                  flex: '0 0 29%',
                  justifyContent: 'center',
                  margin: '10px',
                  border: 1,
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/needs/${id}`);
                }}
              >
                <Box
                  sx={{
                    marginTop: '10px',
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="font_22_serif">{title}</Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="font_10_roboto">
                    {handleDate(createdAt)}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    margin: '0px 35px 0px',
                    textAlign: 'center',
                    backgroundColor: handleBackground(status),
                  }}
                >
                  <Typography variant="font_14_uppercase">{status}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '5px',
                  }}
                >
                  <Typography variant="font_12_roboto">
                    {`ability to pay: ${ability_to_pay} grn`}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box
            m={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default NeedsView;
