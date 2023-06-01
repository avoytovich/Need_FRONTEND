import React, { useState } from 'react';
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
import { text } from 'helper/constants';

const AdminPanelView = ({ data, activation, deactivation, deleteUser }) => {
  const [checked, setChecked] = useState(
    data.reduce((acc, user) => {
      if (user.isActivate) {
        acc = [...acc, user.id];
      }
      return acc;
    }, []),
  );

  const {
    pages: {
      admin: { TITLE },
    },
  } = text;

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
      activation(value);
    } else {
      newChecked.splice(currentIndex, 1);
      deactivation(value);
    }
    setChecked(newChecked);
  };

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
        {data.map(({ id, email, photo, isActivate }) => {
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
                  <Avatar alt={`Avatar n°${id}`} src={photo || imageAvatar} />
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
