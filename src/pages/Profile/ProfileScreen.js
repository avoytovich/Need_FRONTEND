import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import renderAvatar from 'utils/renderAvatar';
import connect from 'utils/connectFunction';
import action from 'utils/actions';
import { withLayout } from 'hocs';
import ProfileView from './ProfileView';

const ProfileScreen = ({ store, dispatchSaveUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [nickname, setNickname] = useState(store.user?.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(
    renderAvatar(store.user?.photo?.data),
  );
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const saveWithoutAvatar = () => {
    let url = `${API.URL[process.env.NODE_ENV]}/user/${store.userId}/update`;
    wrapRequest({
      method: 'PUT',
      url,
      mode: 'cors',
      cache: 'default',
      data: { nickname },
    }).then((data) => {
      toast.success(data.message || 'nickname was successfully updated', {
        position: toast.POSITION.TOP_RIGHT,
      });
      wrapRequest({
        method: 'GET',
        url: `${API.URL[process.env.NODE_ENV]}/user/${store.userId}`,
        mode: 'cors',
        cache: 'default',
      })
        .then(({ data: { user } }) => {
          dispatchSaveUser('saveUser', user);
        })
        .catch((err) =>
          toast.error(err, {
            position: toast.POSITION.TOP_RIGHT,
          }),
        );
    });
  };

  const saveWithAvatar = () => {
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/upload-avatar`,
      mode: 'cors',
      cache: 'default',
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-access-token': JSON.parse(localStorage.getItem('token')),
        'Access-Control-Allow-Origin': '*', // temp
      },
      data: formData,
    })
      .then((data) => {
        toast.success(data.message || 'successfully add new avatar', {
          position: toast.POSITION.TOP_RIGHT,
        });
        wrapRequest({
          method: 'GET',
          url: `${API.URL[process.env.NODE_ENV]}/user/${store.userId}`,
          mode: 'cors',
          cache: 'default',
        })
          .then(({ data: { user } }) => {
            dispatchSaveUser('saveUser', user);
          })
          .catch((err) =>
            toast.error(err, {
              position: toast.POSITION.TOP_RIGHT,
            }),
          );
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setSelectedFile(null);
      });
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
    setSelectedAvatar(URL.createObjectURL(file));
    handleCloseDialog();
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setNickname(store.user?.nickname);
    setSelectedAvatar(renderAvatar(store.user?.photo?.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile && nickname === store.user?.nickname) {
      saveWithAvatar();
    } else if (!selectedFile && nickname !== store.user?.nickname) {
      saveWithoutAvatar();
    } else if (selectedFile && nickname !== store.user?.nickname) {
      saveWithAvatar();
      saveWithoutAvatar();
    }
  };

  const isDisabled = selectedFile === null && nickname === store.user?.nickname;

  return (
    <ProfileView
      open={open}
      handleOpenDialog={handleOpenDialog}
      handleCloseDialog={handleCloseDialog}
      nickname={nickname}
      setNickname={setNickname}
      isDisabled={isDisabled}
      handleSubmit={handleSubmit}
      handleReset={handleReset}
      handleAvatarChange={handleAvatarChange}
      selectedAvatar={selectedAvatar}
    />
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchSaveUser: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLayout(ProfileScreen));
