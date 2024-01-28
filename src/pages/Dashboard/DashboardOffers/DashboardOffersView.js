import React, { useState, Fragment, useCallback } from 'react';
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

import { text } from 'helper/constants';
import Chat from 'pages/Chat';

import colors from 'helper/colors.sass';

const DashboardOffersView = ({
  data,
  dataOffers,
  value,
  paginOffers,
  paginDataForward,
  paginDataBack,
  handleChange,
  updDescription,
  handleUpdDescription,
  handleSave,
  handleReset,
  handleDelete,
  errors,
}) => {
  const [modalContent, setModalContent] = useState(null);
  const [open, setOpen] = useState(false);

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
    <Chat
      owner="offerOwner"
      needId={dataOffers[value]?.need_id}
      offerId={dataOffers[value]?.id}
    />
  );

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
                      onClick={(e) => handleSave(e, item.description)}
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

export default DashboardOffersView;
