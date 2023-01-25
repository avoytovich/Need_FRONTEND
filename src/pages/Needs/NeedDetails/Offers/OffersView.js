import React, { useState } from 'react';

import { Button, Box, Tabs, Tab, TextField } from '@mui/material';

const OffersView = ({ isOwnerNeed }) => {
  const [value, setValue] = useState(0);

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

  const flowIfIsOwner = (
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
  );

  const flowIfIsNotOwner = (
    <Box display="flex" justifyContent="center">
      <Box m="32px 32px 0px 32px">
        <Button
          color="green_light"
          variant="contained"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          ADD OFFER
        </Button>
      </Box>
    </Box>
  );

  const mockOffers = [
    {
      id: 1,
      description: 'bla-offer-1-bla',
      isAccepted: true,
      owner_id: 1,
      need_id: 5,
      createdAt: '2022-12-11T01:29:10.838Z',
    },
    {
      id: 2,
      description: 'bla-offer-2-bla',
      isAccepted: false,
      owner_id: 1,
      need_id: 4,
      createdAt: '2022-12-11T01:29:10.838Z',
    },
    {
      id: 3,
      description: 'bla-offer-3-bla',
      isAccepted: true,
      owner_id: 1,
      need_id: 3,
      createdAt: '2022-12-11T01:29:10.838Z',
    },
  ];

  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {mockOffers.map((item, ind) => (
            <Tab key={item.id} label={`Offer ${ind}`} {...a11yProps(ind)} />
          ))}
        </Tabs>
      </Box>
      {mockOffers.map((item, ind) => (
        <TabPanel key={item.id} value={value} index={ind}>
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            fullWidth
            rows={3}
            defaultValue={item.description}
          />
          {isOwnerNeed ? flowIfIsOwner : flowIfIsNotOwner}
        </TabPanel>
      ))}
    </>
  );
};

export default OffersView;
