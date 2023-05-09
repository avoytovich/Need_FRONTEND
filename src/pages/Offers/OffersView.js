import React, { useState, Fragment, useEffect } from 'react';
import { toast } from 'react-toastify';

import {
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

import { text, API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import OfferAdd from './OfferAdd';
import Chat from 'pages/Chat';

import colors from 'helper/colors.sass';
import './offer.sass';

const OffersView = ({
  data,
  isOwnerNeed,
  need,
  refreshOffer,
  setRefreshOffer,
  refreshNeed,
  setRefreshNeed,
}) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [paginOffers, setPaginOffers] = useState(0);
  const [dataOffers, setDataOffers] = useState([]);
  const [refreshChat, setRefreshChat] = useState(false);

  const {
    pages: {
      offers: {
        ACCEPT,
        REJECT,
        CHAT,
        NO_OFFERS,
        ADD_OFFER,
        DESCRIPTION,
        ISACCEPTED,
        PROHIBITION,
      },
    },
  } = text;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const paginDataForward = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s += 1));
      setValue(0);
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setPaginOffers((s) => (s -= 1));
      setValue(0);
    }
  };

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  };

  const handleRejection = (e) => {
    let url = `${API.URL}:${API.PORT}/offer/${dataOffers[value].id}/accept_reject`;
    const payload = { isAccepted: false };
    wrapRequest({
      method: 'PUT',
      url,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data }) => {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshNeed(!refreshNeed);
        setRefreshOffer(!refreshOffer);
      });
  };

  const handleAcception = (e) => {
    let url = `${API.URL}:${API.PORT}/offer/${dataOffers[value].id}/accept_reject`;
    const payload = { isAccepted: true };
    wrapRequest({
      method: 'PUT',
      url,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(({ data }) => {
        toast.success(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshNeed(!refreshNeed);
        setRefreshOffer(!refreshOffer);
      });
  };

  const flowIfIsOwner = data.length ? (
    <Box display="flex" justifyContent="center">
      {need?.status !== 'in_progress' && (
        <Box m="32px 32px 0px 32px">
          <Button
            color="green_light"
            variant="contained"
            onClick={handleAcception}
          >
            {ACCEPT}
          </Button>
        </Box>
      )}
      {need?.status === 'in_progress' && dataOffers[value]?.isAccepted && (
        <Box m="32px 32px 0px 32px" display="flex" justifyContent="center">
          <Box mr={2}>
            <Button
              color="red_light"
              variant="contained"
              onClick={handleRejection}
            >
              {REJECT}
            </Button>
          </Box>
          <Box ml={2}>
            <Button color="blue_light" variant="contained" onClick={handleOpen}>
              {CHAT}
            </Button>
          </Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-chat"
          >
            <Box>
              <Chat
                needId={need.id}
                offerId={dataOffers[value].id}
                refreshChat={refreshChat}
                setRefreshChat={setRefreshChat}
              />
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  ) : (
    <Typography variant="font_14_roboto">{NO_OFFERS}</Typography>
  );

  const flowIfIsNotOwner = (
    <Box display="flex" justifyContent="center">
      <Box m="8px 32px 8px 32px">
        <Button color="green_light" variant="contained" onClick={handleOpen}>
          {ADD_OFFER}
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box>
            <OfferAdd handleClose={handleClose} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );

  useEffect(() => {
    setDataOffers(data.slice(paginOffers * 5, paginOffers * 5 + 5));
  }, [data, paginOffers]);

  useEffect(() => {
    setValue(0);
  }, [need?.id]);

  return (
    <>
      {data.length && isOwnerNeed ? (
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
                {need?.status === 'in_progress' && (
                  <Box mb={2}>
                    {item.isAccepted ? (
                      <Typography variant="font_14_roboto_green">
                        {ISACCEPTED}
                      </Typography>
                    ) : (
                      <Typography variant="font_14_roboto_red">
                        {PROHIBITION}
                      </Typography>
                    )}
                  </Box>
                )}
                <TextField
                  id="outlined-multiline-static"
                  label={DESCRIPTION}
                  multiline
                  fullWidth
                  rows={3}
                  defaultValue={item.description}
                />
                {flowIfIsOwner}
              </TabPanel>
            ))}
          </Box>
        </Box>
      ) : (
        <Box>{isOwnerNeed ? flowIfIsOwner : flowIfIsNotOwner}</Box>
      )}
    </>
  );
};

export default OffersView;
