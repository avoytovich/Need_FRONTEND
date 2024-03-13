import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import connect from 'utils/connectFunction';
import { wrapRequest } from 'utils/api';
import { withLayout } from 'hocs';
import { API } from 'helper/constants';
import { Loader } from 'components';
import AdminPanelView from './AdminPanelView';

import './adminPage.sass';

const AdminPanelScreen = ({ store: { userId } }) => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exec, setExec] = useState(false);

  const acceptActivation = (id) => {
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_activate`,
      data: { id },
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        toast.success(`User with id-${id} is activated`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setExec(!exec);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const declineActivation = (id) => {
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_deactivate`,
      data: { id },
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        toast.success(`User with id-${id} is deactivated`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setExec(!exec);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const deleteUser = (id) => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_delete`,
      data: { id },
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        toast.success(`User with id-${id} is deleted`, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setExec(!exec);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleToggle = (id) => () => {
    const user = usersList.find((user) => user.id === id);
    if (user) {
      user.isActivate ? declineActivation(id) : acceptActivation(id);
    }
  };

  useEffect(() => {
    wrapRequest({
      method: 'GET',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_list`,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { users } }) => {
        users.sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });
        setUsersList(users);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [userId, exec]);

  if (loading) {
    return <Loader />;
  }

  return (
    <AdminPanelView
      usersList={usersList}
      handleToggle={handleToggle}
      deleteUser={deleteUser}
    />
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  // const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    // dispatchSaveUserId: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLayout(AdminPanelScreen));
