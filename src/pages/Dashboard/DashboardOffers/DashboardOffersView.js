import React, {
  useState,
  useReducer,
  useEffect,
  Fragment,
  useCallback,
  useMemo,
} from 'react';
import { toast } from 'react-toastify';
import {
  Stack,
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Modal,
  IconButton,
} from '@mui/material';
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material';

import { withLayout } from 'hocs';
import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';

import colors from 'helper/colors.sass';

const DashboardOffersView = ({ data, refreshOffer, setRefreshOffer }) => {
  // console.log('data', data);

  const [value, setValue] = useState(0);
  const [paginOffers, setPaginOffers] = useState(0);
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);

  const dataOffers = useMemo(
    () => data.slice(paginOffers * 5, paginOffers * 5 + 5),
    [data, paginOffers],
  );

  const initialState = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  };

  const reducerDescription = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION_UPDATE':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_RESET':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_INITIAL':
        return { ...action.payload };
      default:
        throw new Error();
    }
  };

  const [updDescription, setUpdDescription] = useReducer(
    reducerDescription,
    initialState,
  );

  const initialErrors = {
    0: { description: false },
    1: { description: false },
    2: { description: false },
    3: { description: false },
    4: { description: false },
  };

  const reducerError = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION_ERROR':
        return { ...state, [value]: { description: action.payload } };
      case 'ERROR_RESET':
        return initialErrors;
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducerError, initialErrors);

  const {
    pages: {
      offers: {
        SAVE,
        RESET,
        DELETE,
        CONFIRMATION_DELETE,
        YES,
        NO,
        CHAT,
        NO_OFFERS,
        DESCRIPTION,
        ISACCEPTED,
      },
    },
  } = text;

  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const paginDataForward = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s += 1));
      setValue(0);
      setUpdDescription({ type: 'DESCRIPTION_INITIAL', payload: initialState });
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s -= 1));
      setValue(0);
      setUpdDescription({ type: 'DESCRIPTION_INITIAL', payload: initialState });
    }
  };

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleUpdDescription = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: false });
      setUpdDescription({
        type: 'DESCRIPTION_UPDATE',
        payload: e.target.value,
      });
    } else if (e.target.value === '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
      setUpdDescription({
        type: 'DESCRIPTION_UPDATE',
        payload: e.target.value,
      });
    } else {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const payload = {
      description: updDescription[value],
    };
    wrapRequest({
      method: 'PUT',
      url: `${API.URL}:${API.PORT}/offer/${dataOffers[value].id}/update`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data: { message } }) => {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshOffer(!refreshOffer);
      });
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setUpdDescription({
      type: 'DESCRIPTION_RESET',
      payload: dataOffers[value].description,
    });
    dispatchError({ type: 'ERROR_RESET' });
  };

  const handleDelete = () => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL}:${API.PORT}/offer/${dataOffers[value].id}/delete`,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { message } }) => {
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setValue(0);
        setRefreshOffer(!refreshOffer);
      });
  };

  const confirmModal = (
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
              handleDelete();
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
  );

  const chatModal = (
    <Box className="modal-create">
      <Box textAlign="center">
        <Typography>CHAT</Typography>
      </Box>
      {/* <Chat
          needId={need.id}
          offerId={data[value].id}
          refreshChat={refreshChat}
          setRefreshChat={setRefreshChat}
        /> */}
    </Box>
  );

  useEffect(() => {
    if (!dataOffers.length) {
      setPaginOffers((s) => (s ? s - 1 : 0));
    }
  }, [dataOffers]);

  return (
    <Stack
      sx={{
        margin: 1,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 1,
        backgroundColor: colors['white'],
        borderRadius: 1,
      }}
    >
      {data.length ? (
        <Box sx={{ width: '70%' }}>
          <Box ml={3} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Box>
              {paginOffers > 0 && (
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
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                {dataOffers.map((item, ind) => (
                  <Tab
                    key={item.id}
                    label={`Offer ${ind + (paginOffers * 5 + 1)}`}
                    {...a11yProps(ind + 1)}
                  />
                ))}
              </Tabs>
            </Box>
            <Box>
              {data.slice(paginOffers * 5).length > 5 && (
                <Fragment>
                  <IconButton onClick={paginDataForward}>
                    <ArrowForwardIos style={{ color: colors['red-light'] }} />
                  </IconButton>
                </Fragment>
              )}
            </Box>
          </Box>
          <Box>
            {dataOffers.map((item, ind) => (
              <TabPanel key={item.id} value={value} index={ind}>
                <Box mb={2}>
                  {item.isAccepted && (
                    <Typography variant="font_14_roboto_green">
                      {ISACCEPTED}
                    </Typography>
                  )}
                </Box>
                <TextField
                  id="outlined-multiline-static"
                  label={DESCRIPTION}
                  disabled={item.isAccepted}
                  multiline
                  fullWidth
                  rows={3}
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
                    errors[value].description && 'Please fill out description'
                  }
                />
                <Box display="flex" justifyContent="center">
                  <Box m="32px 32px 0px 32px">
                    <Button
                      color="blue_light"
                      variant="contained"
                      disabled={item.isAccepted}
                      onClick={handleSave}
                    >
                      {SAVE}
                    </Button>
                  </Box>
                  <Box m="32px 32px 0px 32px">
                    <Button
                      color="blue_light"
                      variant="outlined"
                      onClick={handleReset}
                    >
                      {RESET}
                    </Button>
                  </Box>
                  <Box m="32px 32px 0px 32px">
                    <Button
                      color="red_light"
                      variant="contained"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(confirmModal);
                      }}
                    >
                      {DELETE}
                    </Button>
                  </Box>
                  {item.isAccepted && (
                    <Box m="32px 32px 0px 32px">
                      <Button
                        color="green_light"
                        variant="contained"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen(chatModal);
                        }}
                      >
                        {CHAT}
                      </Button>
                    </Box>
                  )}
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    className="modal-chat"
                  >
                    <Box>{modalContent}</Box>
                  </Modal>
                </Box>
              </TabPanel>
            ))}
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="font_14_roboto">{NO_OFFERS}</Typography>
        </Box>
      )}
    </Stack>
  );
};

export default withLayout(DashboardOffersView);
