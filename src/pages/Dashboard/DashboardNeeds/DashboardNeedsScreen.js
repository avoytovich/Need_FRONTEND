import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import DashboardNeedsView from './DashboardNeedsView';

import connect from 'utils/connectFunction';
// import action from 'utils/actions';
import { API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import { Loader } from 'components';

const DashboardNeedsScreen = ({ store: { userId } }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = `${API.URL}:${API.PORT}/needs-all/${userId}`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { needs } }) => {
        setData(needs);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return <DashboardNeedsView data={data} />;
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  // const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    // dispatchPrevPage: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardNeedsScreen);
