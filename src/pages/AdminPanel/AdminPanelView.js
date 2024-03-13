import React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import { Delete } from '@mui/icons-material';

import imageAvatar from 'assets/images/avatar.svg';
import renderAvatar from 'utils/renderAvatar';
import { text } from 'helper/constants';

const AdminPanelView = ({ usersList, handleToggle, deleteUser }) => {
  const {
    pages: {
      admin: { TITLE },
    },
  } = text;

  return (
    <div className="wrapper-admin">
      <List
        dense
        sx={{ width: '45%' }}
        subheader={
          <ListSubheader
            sx={{ textAlign: 'center', backgroundColor: 'inherit' }}
          >
            {TITLE}
          </ListSubheader>
        }
      >
        {usersList.map(({ id, email, photo, isActivate }) => {
          const labelId = `checkbox-list-secondary-label-${id}`;
          return (
            <ListItem
              key={id}
              secondaryAction={
                <>
                  <Switch
                    edge="end"
                    onChange={handleToggle(id)}
                    checked={isActivate}
                    inputProps={{
                      'aria-labelledby': `switch-list-label-${id}`,
                    }}
                  />
                  <IconButton aria-label="trash" onClick={() => deleteUser(id)}>
                    <Delete />
                  </IconButton>
                </>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar
                    alt={`Avatar n°${id}`}
                    src={photo ? renderAvatar(photo?.data) : imageAvatar}
                  />
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`id-${id} email: ${email}`}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default AdminPanelView;
