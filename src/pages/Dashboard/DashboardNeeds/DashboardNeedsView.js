import React, {
  useState,
  Fragment,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Stack,
  Box,
  Tabs,
  Tab,
  Button,
  Modal,
  IconButton,
  Typography,
} from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';
import { toast } from 'react-toastify';

import {
  CustomTitle,
  CustomAbilityToPay,
  CustomDescription,
} from './CustomComponents';
import { withLayout } from 'hocs';
import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';

import colors from 'helper/colors.sass';
import './dashboard_need.sass';

const DashboardNeedsView = ({ data }) => {
  const [value, setValue] = useState(0);
  const [paginNeeds, setPaginNeeds] = useState(0);
  const [dataNeeds, setDataNeeds] = useState(data.slice(0, 5));
  const [open, setOpen] = useState(false);

  const reducerTitle = (state, action) => {
    switch (action.type) {
      case 'TITLE':
        return { ...state, [value]: action.payload };
      case 'TITLE_INITIAL':
        return {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
        };
      default:
        throw new Error();
    }
  };

  const [updTitle, setUpdTitle] = useReducer(reducerTitle, {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const reducerAbility = (state, action) => {
    switch (action.type) {
      case 'ABILITY_TO_PAY':
        return { ...state, [value]: action.payload };
      case 'ABILITY_INITIAL':
        return {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
        };
      default:
        throw new Error();
    }
  };

  const [updAbility, setUpdAbility] = useReducer(reducerAbility, {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const reducerDescription = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_INITIAL':
        return {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
        };
      default:
        throw new Error();
    }
  };

  const [updDescription, setUpdDescription] = useReducer(reducerDescription, {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const reducerError = (state, action) => {
    switch (action.type) {
      case 'TITLE_ERROR':
        return { ...state, title: action.payload };
      case 'ABILITY_TO_PAY_ERROR':
        return { ...state, abilityToPay: action.payload };
      case 'DESCRIPTION_ERROR':
        return { ...state, description: action.payload };
      case 'ALL_ERROR':
        return {
          ...state,
          title: action.payload,
          abilityToPay: action.payload,
          description: action.payload,
        };
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducerError, {
    title: false,
    abilityToPay: false,
    description: false,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const inputRefTitle = useRef(null);
  const inputRefAbility = useRef(null);
  const inputRefDescription = useRef(null);

  const navigate = useNavigate();

  const paginDataForward = () => {
    if (data.length > 5) {
      setDataNeeds(data.slice((paginNeeds + 1) * 5, (paginNeeds + 1) * 5 + 5));
      setPaginNeeds((s) => (s += 1));
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setDataNeeds(data.slice((paginNeeds - 1) * 5, (paginNeeds - 1) * 5 + 5));
      setPaginNeeds((s) => (s -= 1));
    }
  };

  const handleDate = (date) => new Date(date).toLocaleDateString();

  const {
    pages: {
      needsDetails: {
        STATUS,
        SAVE,
        RESET,
        DELETE,
        CONFIRMATION_DELETE,
        YES,
        NO,
      },
    },
  } = text;

  const TabPanel = (props) => {
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
  };

  const handleChangeNeed = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

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

  const handleDelete = (e, title) => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL}:${API.PORT}/needs/${dataNeeds[value].id}/delete`,
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        handleClose();
        navigate(-1);
        toast.success(`Need - ${title} was successfully deleted`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleSave = (e, title, abilityToPay, description) => {
    e.stopPropagation();
    const payload = {
      title: updTitle[value] || title,
      ability_to_pay: updAbility[value] || abilityToPay,
      description: updDescription[value] || description,
    };
    wrapRequest({
      method: 'PUT',
      url: `${API.URL}:${API.PORT}/needs/${dataNeeds[value].id}/update`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(() => {
        toast.success(
          `Need - ${dataNeeds[value].title} was successfully updated`,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
        navigate(-1);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setUpdTitle({ type: 'TITLE', payload: dataNeeds[value].title });
    setUpdAbility({
      type: 'ABILITY_TO_PAY',
      payload: dataNeeds[value].ability_to_pay,
    });
    setUpdDescription({
      type: 'DESCRIPTION',
      payload: dataNeeds[value].description,
    });
    dispatchError({ type: 'ALL_ERROR', payload: false });
  };

  const handleUpdTitle = (e) => {
    e.stopPropagation();
    if (e.target.value) {
      dispatchError({ type: 'TITLE_ERROR', payload: false });
      setUpdTitle({ type: 'TITLE', payload: e.target.value });
    } else if (e.target.value === '') {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
      setUpdTitle({ type: 'TITLE', payload: e.target.value });
    } else {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
    }
  };

  const handleUpdAbility = (e) => {
    e.stopPropagation();
    if (e.target.value && !isNaN(e.target.value)) {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: false });
      setUpdAbility({ type: 'ABILITY_TO_PAY', payload: e.target.value });
    } else if (e.target.value === '') {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: true });
      setUpdAbility({ type: 'ABILITY_TO_PAY', payload: e.target.value });
    } else {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: true });
    }
  };

  const handleUpdDescription = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: false });
      setUpdDescription({ type: 'DESCRIPTION', payload: e.target.value });
    } else if (e.target.value === '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
      setUpdDescription({ type: 'DESCRIPTION', payload: e.target.value });
    } else {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
    }
  };

  useEffect(() => {
    inputRefTitle?.current?.focus();
    inputRefTitle?.current?.setSelectionRange(
      inputRefTitle?.current?.value.length,
      inputRefTitle?.current?.value.length,
    );
  }, [updTitle[value]]);

  useEffect(() => {
    inputRefAbility?.current?.focus();
    inputRefAbility?.current?.setSelectionRange(
      inputRefAbility?.current?.value.length,
      inputRefAbility?.current?.value.length,
    );
  }, [updAbility[value]]);

  useEffect(() => {
    inputRefDescription?.current?.focus();
    inputRefDescription?.current?.setSelectionRange(
      inputRefDescription?.current?.value.length,
      inputRefDescription?.current?.value.length,
    );
  }, [updDescription[value]]);

  useEffect(() => {
    setUpdTitle({ type: 'TITLE_INITIAL' });
    setUpdAbility({ type: 'ABILITY_INITIAL' });
    setUpdDescription({ type: 'DESCRIPTION_INITIAL' });
  }, [dataNeeds[0].id]);

  return (
    <div className="wrapper-dashboard-needs-view">
      <Grid container spacing={0} className="container-dashboard-needs-view">
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
                        <CustomTitle
                          myRef={inputRefTitle}
                          title={
                            updTitle[value]
                              ? updTitle[value]
                              : updTitle[value] === ''
                              ? ''
                              : item.title
                          }
                          handleUpdTitle={handleUpdTitle}
                          errors={errors}
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
                          <CustomAbilityToPay
                            myRef={inputRefAbility}
                            abilityToPay={
                              updAbility[value]
                                ? updAbility[value]
                                : updAbility[value] === ''
                                ? ''
                                : item.ability_to_pay
                            }
                            handleUpdAbility={handleUpdAbility}
                            errors={errors}
                          />
                        </Box>
                      </Grid>
                      <Grid xs={1} sm={1} />
                      <Grid
                        item
                        xs={5}
                        sm={5}
                        display="flex"
                        justifyContent="flex-start"
                      >
                        <CustomDescription
                          myRef={inputRefDescription}
                          description={
                            updDescription[value]
                              ? updDescription[value]
                              : updDescription[value] === ''
                              ? ''
                              : item.description
                          }
                          handleUpdDescription={handleUpdDescription}
                          errors={errors}
                        />
                      </Grid>
                      <Grid xs={1} sm={1} />
                      <Grid xs={2} sm={2}>
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
                                      onClick={(e) =>
                                        handleDelete(e, item.title)
                                      }
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
                                errors.description
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
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default withLayout(DashboardNeedsView);
