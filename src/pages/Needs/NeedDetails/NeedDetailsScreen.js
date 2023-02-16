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

  const { id } = useParams();

  useEffect(() => {
    let url = `${API.URL}:${API.PORT}/needs/${id}`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { need } }) => {
        setData(need);
        setLoading(false);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return <NeedDetailsView data={data} currentUserId={userId} />;
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
