import React, { useState } from 'react';

import {
  Button,
  Box,
  Tabs,
  Tab,
  TextField,
  Typography,
  Modal,
} from '@mui/material';

import OfferAdd from './OfferAdd';

const OffersView = ({ data, isOwnerNeed }) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          ACCEPT
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
          REJECT
        </Button>
      </Box>
    </Box>
  ) : (
    <Typography variant="font_14_roboto">No Offers</Typography>
  );

  const flowIfIsNotOwner = (
    <Box display="flex" justifyContent="center">
      <Box m="8px 32px 8px 32px">
        <Button color="green_light" variant="contained" onClick={handleOpen}>
          ADD OFFER
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

  return (
    <>
      {data.length && isOwnerNeed ? (
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {data.map((item, ind) => (
                <Tab
                  key={item.id}
                  label={`Offer ${ind + 1}`}
                  {...a11yProps(ind + 1)}
                />
              ))}
            </Tabs>
          </Box>
          <Box>
            {data.map((item, ind) => (
              <TabPanel key={item.id} value={value} index={ind}>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
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
