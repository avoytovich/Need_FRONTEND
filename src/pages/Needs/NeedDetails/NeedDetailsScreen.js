import React, { useEffect, useState, useReducer } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import connect from 'utils/connectFunction';
import { wrapRequest } from 'utils/api';
import { withLayout } from 'hocs';
import { API } from 'helper/constants';
import { Loader } from 'components';
import NeedDetailsView from './NeedDetailsView';

const NeedDetailsScreen = ({ store: { userId } }) => {
  const [data, setData] = useState(null);
  const [updTitle, setUpdTitle] = useState('');
  const [updAbility, setUpdAbility] = useState('');
  const [updDescription, setUpdDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshNeed, setRefreshNeed] = useState(false);

  const reducerError = (state, action) => {
    switch (action.type) {
      case 'TITLE_ERROR':
        return { ...state, title: action.payload };
      case 'ABILITY_TO_PAY_ERROR':
        return { ...state, abilityToPay: action.payload };
      case 'DESCRIPTION_ERROR':
        return { ...state, description: action.payload };
      case 'ALL_ERROR':
        return {
          ...state,
          title: action.payload,
          abilityToPay: action.payload,
          description: action.payload,
        };
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducerError, {
    title: false,
    abilityToPay: false,
    description: false,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/needs/${id}/delete`,
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        navigate(-1);
        toast.success(`Need - ${data?.title} was successfully deleted`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleSave = (e) => {
    e.stopPropagation();
    const payload = {
      title: updTitle,
      ability_to_pay: updAbility,
      description: updDescription,
    };
    wrapRequest({
      method: 'PUT',
      url: `${API.URL[process.env.NODE_ENV]}/needs/${id}/update`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(() => {
        toast.success(`Need - ${data?.title} was successfully updated`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setUpdTitle(data?.title);
    setUpdAbility(data?.ability_to_pay);
    setUpdDescription(data?.description);
    dispatchError({ type: 'ALL_ERROR', payload: false });
  };

  const handleTitle = (e) => {
    e.stopPropagation();
    if (e.target.value) {
      dispatchError({ type: 'TITLE_ERROR', payload: false });
      setUpdTitle(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
      setUpdTitle(e.target.value);
    } else {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
    }
  };

  const handleAbility = (e) => {
    e.stopPropagation();
    if (e.target.value && !isNaN(e.target.value)) {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: false });
      setUpdAbility(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: true });
      setUpdAbility(e.target.value);
    } else {
      dispatchError({ type: 'ABILITY_TO_PAY_ERROR', payload: true });
    }
  };

  const handleDescription = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: false });
      setUpdDescription(e.target.value);
    } else if (e.target.value === '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
      setUpdDescription(e.target.value);
    } else {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
    }
  };

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
        setUpdTitle(need.title);
        setUpdAbility(need.ability_to_pay);
        setUpdDescription(need.description);
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
      updTitle={updTitle}
      handleTitle={handleTitle}
      updAbility={updAbility}
      handleAbility={handleAbility}
      updDescription={updDescription}
      handleDescription={handleDescription}
      handleDelete={handleDelete}
      handleSave={handleSave}
      handleReset={handleReset}
      errors={errors}
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
