import React, { useState, Fragment, useCallback } from 'react';
import {
  Grid,
  Stack,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Modal,
  IconButton,
  Typography,
} from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

import Offers from 'pages/Offers';
import { text } from 'helper/constants';

import colors from 'helper/colors.sass';
import './dashboard_need.sass';

const DashboardNeedsView = ({
  data,
  dataNeeds,
  value,
  paginNeeds,
  paginDataForward,
  paginDataBack,
  handleChangeNeed,
  updTitle,
  handleUpdTitle,
  updAbility,
  handleUpdAbility,
  updDescription,
  handleUpdDescription,
  handleDelete,
  handleReset,
  handleSave,
  errors,
  refreshNeed,
  setRefreshNeed,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDate = (date) => new Date(date).toLocaleDateString();

  const {
    pages: {
      needsDetails: {
        TITLE,
        ABILITY_TO_PAY,
        DESCRIPTION,
        STATUS,
        SAVE,
        RESET,
        DELETE,
        CONFIRMATION_DELETE,
        YES,
        NO,
        NO_NEEDS,
      },
    },
  } = text;

  const TabPanel = useCallback((props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{
          width: '100%',
        }}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }, []);

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleBackground = (status) => {
    switch (status) {
      case 'in_progress':
        return colors['blue-light'];
      case 'actual':
        return colors['green-light'];
      case 'not_actual':
        return colors['red-light'];
      default:
        break;
    }
  };

  return (
    <div className="wrapper-dashboard-needs-view">
      <Grid container spacing={0} className="container-dashboard-needs-view">
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Stack
            sx={{
              margin: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
            }}
          >
            <Box sx={{ width: '100%' }}>
              <Box ml={3} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                  {paginNeeds > 0 && (
                    <Fragment>
                      <IconButton onClick={paginDataBack}>
                        <ArrowBackIos style={{ color: colors['red-light'] }} />
                      </IconButton>
                    </Fragment>
                  )}
                </Box>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    value={value}
                    onChange={handleChangeNeed}
                    aria-label="basic tabs example"
                  >
                    {dataNeeds.map((item, ind) => (
                      <Tab
                        key={item.id}
                        label={`Need ${ind + (paginNeeds * 5 + 1)}`}
                        {...a11yProps(ind + 1)}
                      />
                    ))}
                  </Tabs>
                </Box>
                <Box>
                  {data.slice(paginNeeds * 5).length > 5 && (
                    <Fragment>
                      <IconButton onClick={paginDataForward}>
                        <ArrowForwardIos
                          style={{ color: colors['red-light'] }}
                        />
                      </IconButton>
                    </Fragment>
                  )}
                </Box>
              </Box>
              <Box>
                {dataNeeds.map((item, ind) => (
                  <TabPanel key={item.id} value={value} index={ind}>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}
                    >
                      <Grid item xs={3} sm={3}>
                        <Typography
                          className="dashboard-needs-view-title"
                          variant="font_12_roboto"
                        >
                          {handleDate(item.createdAt)}
                        </Typography>
                        <TextField
                          label={TITLE}
                          size="small"
                          disabled={item.status === 'in_progress'}
                          value={
                            updTitle[value]
                              ? updTitle[value]
                              : updTitle[value] === ''
                              ? ''
                              : item.title
                          }
                          onChange={handleUpdTitle}
                          fullWidth
                          error={errors[value].title}
                          helperText={
                            errors[value].title && 'Please fill out title'
                          }
                        />
                        <Box
                          sx={{
                            margin: '2px 16px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: '15px',
                          }}
                        >
                          <Box>
                            <Typography variant="font_14_roboto">
                              {STATUS}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              textAlign: 'right',
                              padding: '0px 5px',
                              border: 1,
                              borderRadius: '5px',
                              backgroundColor: handleBackground(item.status),
                            }}
                          >
                            {item.status}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            margin: '20px 0px 0px',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: colors['white'],
                            borderRadius: 1,
                          }}
                        >
                          <TextField
                            label={ABILITY_TO_PAY}
                            size="small"
                            disabled={item.status === 'in_progress'}
                            value={
                              updAbility[value]
                                ? updAbility[value]
                                : updAbility[value] === ''
                                ? ''
                                : item.ability_to_pay
                            }
                            onChange={handleUpdAbility}
                            fullWidth
                            error={errors[value].abilityToPay}
                            helperText={
                              errors[value].abilityToPay && 'Please type number'
                            }
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={1} sm={1} />
                      <Grid
                        item
                        xs={5}
                        sm={5}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <TextField
                          id="outlined-multiline-static"
                          label={DESCRIPTION}
                          disabled={item.status === 'in_progress'}
                          fullWidth
                          multiline
                          rows={5}
                          value={
                            updDescription[value]
                              ? updDescription[value]
                              : updDescription[value] === ''
                              ? ''
                              : item.description
                          }
                          onChange={handleUpdDescription}
                          error={errors[value].description}
                          helperText={
                            errors[value].description &&
                            'Please fill out description'
                          }
                        />
                      </Grid>
                      <Grid item xs={1} sm={1} />
                      <Grid item xs={2} sm={2}>
                        <Box
                          mt={5}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                        >
                          <Box ml={1} mb={1}>
                            <Button
                              color="red_light"
                              size="small"
                              variant="contained"
                              style={{
                                width: '100px',
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpen();
                              }}
                            >
                              {DELETE}
                            </Button>
                            <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box className="modal-create">
                                <Box textAlign="center">
                                  <Typography>{CONFIRMATION_DELETE}</Typography>
                                </Box>
                                <Box display="flex" justifyContent="center">
                                  <Box m={3}>
                                    <Button
                                      color="blue_light"
                                      size="small"
                                      variant="contained"
                                      style={{
                                        width: '100px',
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleClose();
                                        handleDelete(item.title);
                                      }}
                                    >
                                      {YES}
                                    </Button>
                                  </Box>
                                  <Box m={3}>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      style={{
                                        width: '100px',
                                      }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleClose();
                                      }}
                                    >
                                      {NO}
                                    </Button>
                                  </Box>
                                </Box>
                              </Box>
                            </Modal>
                          </Box>
                          <Box m={1}>
                            <Button
                              color="blue_light"
                              size="small"
                              variant="contained"
                              style={{
                                width: '100px',
                              }}
                              onClick={(e) =>
                                handleSave(
                                  e,
                                  item.title,
                                  item.ability_to_pay,
                                  item.description,
                                )
                              }
                              disabled={
                                errors.title ||
                                errors.abilityToPay ||
                                errors.description ||
                                item.status === 'in_progress'
                              }
                            >
                              {SAVE}
                            </Button>
                          </Box>
                          <Box m={1}>
                            <Button
                              variant="outlined"
                              size="small"
                              style={{
                                width: '100px',
                              }}
                              onClick={handleReset}
                            >
                              {RESET}
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Box>
                  </TabPanel>
                ))}
                {!dataNeeds.length && (
                  <Box
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    <Typography variant="font_14_roboto">{NO_NEEDS}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={1} sm={1} />
        <Grid item xs={1} sm={1} />
        <Grid item xs={10} sm={10}>
          <Stack
            sx={{
              margin: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 1,
              backgroundColor: colors['white'],
              borderRadius: 1,
            }}
          >
            <Offers
              isOwnerNeed
              need={dataNeeds[value]}
              refreshNeed={refreshNeed}
              setRefreshNeed={setRefreshNeed}
            />
          </Stack>
        </Grid>
        <Grid item xs={1} sm={1} />
      </Grid>
    </div>
  );
};

export default DashboardNeedsView;
