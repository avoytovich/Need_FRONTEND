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

  const acceptActivation = (activateUser_id) => {
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_activate`,
      data: { id: activateUser_id },
      mode: 'cors',
      cache: 'default',
    })
      .then((data) => {
        toast.success(`User with id-${activateUser_id} is activated`, {
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

  const declineActivation = (activateUser_id) => {
    wrapRequest({
      method: 'POST',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_deactivate`,
      data: { id: activateUser_id },
      mode: 'cors',
      cache: 'default',
    })
      .then((data) => {
        toast.success(`User with id-${activateUser_id} is deactivated`, {
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

  const deleteUser = (activateUser_id) => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/user/${userId}/user_delete`,
      data: { id: activateUser_id },
      mode: 'cors',
      cache: 'default',
    })
      .then((data) => {
        toast.success(`User with id-${activateUser_id} is deleted`, {
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
      data={usersList}
      activation={acceptActivation}
      deactivation={declineActivation}
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
