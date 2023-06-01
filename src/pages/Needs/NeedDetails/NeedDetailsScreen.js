import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import connect from 'utils/connectFunction';
import { wrapRequest } from 'utils/api';
import { withLayout } from 'hocs';
import { API } from 'helper/constants';
import { Loader } from 'components';
import NeedDetailsView from './NeedDetailsView';

const NeedDetailsScreen = ({ store: { userId } }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshNeed, setRefreshNeed] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    let url = `${API.URL[process.env.NODE_ENV]}/needs/${id}`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { need } }) => {
        setData(need);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [id, refreshNeed]);

  if (loading) {
    return <Loader />;
  }

  return (
    <NeedDetailsView
      data={data}
      currentUserId={userId}
      refreshNeed={refreshNeed}
      setRefreshNeed={setRefreshNeed}
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
)(withLayout(NeedDetailsScreen));
