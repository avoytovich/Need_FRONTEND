import React, { useState, Fragment, useEffect } from 'react';

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

import { text } from 'helper/constants';
import OfferAdd from './OfferAdd';

import colors from 'helper/colors.sass';

const OffersView = ({ data, isOwnerNeed }) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);
  const [paginOffers, setPaginOffers] = useState(0);
  const [dataOffers, setDataOffers] = useState([]);

  const {
    pages: {
      offers: { ACCEPT, REJECT, NO_OFFERS, ADD_OFFER, DESCRIPTION },
    },
  } = text;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const paginDataForward = () => {
    if (data.length > 5) {
      setDataOffers(
        data.slice((paginOffers + 1) * 5, (paginOffers + 1) * 5 + 5),
      );
      setPaginOffers((s) => (s += 1));
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setDataOffers(
        data.slice((paginOffers - 1) * 5, (paginOffers - 1) * 5 + 5),
      );
      setPaginOffers((s) => (s -= 1));
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

  const flowIfIsOwner = data.length ? (
    <Box display="flex" justifyContent="center">
      <Box m="32px 32px 0px 32px">
        <Button
          color="green_light"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {ACCEPT}
        </Button>
      </Box>
      <Box m="32px 32px 0px 32px">
        <Button
          color="red_light"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {REJECT}
        </Button>
      </Box>
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
    setDataOffers(data.slice(0, 5));
  }, [data]);

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
