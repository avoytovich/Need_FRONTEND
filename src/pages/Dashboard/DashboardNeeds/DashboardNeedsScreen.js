import React, { useEffect, useState, useReducer, useMemo } from 'react';
import { toast } from 'react-toastify';

import DashboardNeedsView from './DashboardNeedsView';

import connect from 'utils/connectFunction';
// import action from 'utils/actions';
import { withLayout } from 'hocs';
import { API } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import { Loader } from 'components';

const DashboardNeedsScreen = ({ store: { userId } }) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [paginNeeds, setPaginNeeds] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshNeed, setRefreshNeed] = useState(false);

  const dataNeeds = useMemo(
    () => data.slice(paginNeeds * 5, paginNeeds * 5 + 5),
    [data, paginNeeds],
  );

  const initialState = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  };

  const reducerTitle = (state, action) => {
    switch (action.type) {
      case 'TITLE_UPDATE':
        return { ...state, [value]: action.payload };
      case 'TITLE_RESET':
        return { ...state, [value]: action.payload };
      case 'TITLE_INITIAL':
        return { ...action.payload };
      default:
        throw new Error();
    }
  };

  const [updTitle, setUpdTitle] = useReducer(reducerTitle, initialState);

  const reducerAbility = (state, action) => {
    switch (action.type) {
      case 'ABILITY_UPDATE':
        return { ...state, [value]: action.payload };
      case 'ABILITY_RESET':
        return { ...state, [value]: action.payload };
      case 'ABILITY_INITIAL':
        return { ...action.payload };
      default:
        throw new Error();
    }
  };

  const [updAbility, setUpdAbility] = useReducer(reducerAbility, initialState);

  const reducerDescription = (state, action) => {
    switch (action.type) {
      case 'DESCRIPTION_UPDATE':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_RESET':
        return { ...state, [value]: action.payload };
      case 'DESCRIPTION_INITIAL':
        return { ...action.payload };
      default:
        throw new Error();
    }
  };

  const [updDescription, setUpdDescription] = useReducer(
    reducerDescription,
    initialState,
  );

  const initialErrors = {
    0: { title: false, abilityToPay: false, description: false },
    1: { title: false, abilityToPay: false, description: false },
    2: { title: false, abilityToPay: false, description: false },
    3: { title: false, abilityToPay: false, description: false },
    4: { title: false, abilityToPay: false, description: false },
  };

  const reducerError = (state, action) => {
    switch (action.type) {
      case 'TITLE_ERROR':
        return {
          ...state,
          [value]: { ...state[value], title: action.payload },
        };
      case 'ABILITY_ERROR':
        return {
          ...state,
          [value]: { ...state[value], abilityToPay: action.payload },
        };
      case 'DESCRIPTION_ERROR':
        return {
          ...state,
          [value]: { ...state[value], description: action.payload },
        };
      case 'ERROR_RESET':
        return initialErrors;
      default:
        throw new Error();
    }
  };

  const [errors, dispatchError] = useReducer(reducerError, initialErrors);

  const paginDataForward = () => {
    if (data.length > 5) {
      setPaginNeeds((s) => (s += 1));
      setValue(0);
      setUpdTitle({ type: 'TITLE_INITIAL', payload: initialState });
      setUpdAbility({ type: 'ABILITY_INITIAL', payload: initialState });
      setUpdDescription({ type: 'DESCRIPTION_INITIAL', payload: initialState });
    }
  };

  const paginDataBack = () => {
    if (data.length > 5) {
      setPaginNeeds((s) => (s -= 1));
      setValue(0);
      setUpdTitle({ type: 'TITLE_INITIAL', payload: initialState });
      setUpdAbility({ type: 'ABILITY_INITIAL', payload: initialState });
      setUpdDescription({ type: 'DESCRIPTION_INITIAL', payload: initialState });
    }
  };

  const handleChangeNeed = (event, newValue) => {
    setValue(newValue);
  };

  const handleDelete = (title) => {
    wrapRequest({
      method: 'DELETE',
      url: `${API.URL[process.env.NODE_ENV]}/needs/${
        dataNeeds[value].id
      }/delete`,
      mode: 'cors',
      cache: 'default',
    })
      .then(() => {
        setValue((v) => (v ? v - 1 : 0));
        toast.success(`Need - ${title} was successfully deleted`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshNeed(!refreshNeed);
      });
  };

  const handleSave = (e, title, abilityToPay, description) => {
    e.stopPropagation();
    const payload = {
      title: updTitle[value] || title,
      ability_to_pay: updAbility[value] || abilityToPay,
      description: updDescription[value] || description,
    };
    wrapRequest({
      method: 'PUT',
      url: `${API.URL[process.env.NODE_ENV]}/needs/${
        dataNeeds[value].id
      }/update`,
      mode: 'cors',
      cache: 'default',
      data: payload,
    })
      .then(() => {
        toast.success(
          `Need - ${dataNeeds[value].title} was successfully updated`,
          {
            position: toast.POSITION.TOP_RIGHT,
          },
        );
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setRefreshNeed(!refreshNeed);
      });
  };

  const handleReset = (e) => {
    e.stopPropagation();
    setUpdTitle({ type: 'TITLE_RESET', payload: dataNeeds[value].title });
    setUpdAbility({
      type: 'ABILITY_RESET',
      payload: dataNeeds[value].ability_to_pay,
    });
    setUpdDescription({
      type: 'DESCRIPTION_RESET',
      payload: dataNeeds[value].description,
    });
    dispatchError({ type: 'ERROR_RESET' });
  };

  const handleUpdTitle = (e) => {
    e.stopPropagation();
    if (e.target.value) {
      dispatchError({ type: 'TITLE_ERROR', payload: false });
      setUpdTitle({ type: 'TITLE_UPDATE', payload: e.target.value });
    } else if (e.target.value === '') {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
      setUpdTitle({ type: 'TITLE_UPDATE', payload: e.target.value });
    } else {
      dispatchError({ type: 'TITLE_ERROR', payload: true });
    }
  };

  const handleUpdAbility = (e) => {
    e.stopPropagation();
    if (e.target.value && !isNaN(e.target.value)) {
      dispatchError({ type: 'ABILITY_ERROR', payload: false });
      setUpdAbility({ type: 'ABILITY_UPDATE', payload: e.target.value });
    } else if (e.target.value === '') {
      dispatchError({ type: 'ABILITY_ERROR', payload: true });
      setUpdAbility({ type: 'ABILITY_UPDATE', payload: e.target.value });
    } else {
      dispatchError({ type: 'ABILITY_ERROR', payload: true });
    }
  };

  const handleUpdDescription = (e) => {
    e.stopPropagation();
    if (e.target.value !== '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: false });
      setUpdDescription({
        type: 'DESCRIPTION_UPDATE',
        payload: e.target.value,
      });
    } else if (e.target.value === '') {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
      setUpdDescription({
        type: 'DESCRIPTION_UPDATE',
        payload: e.target.value,
      });
    } else {
      dispatchError({ type: 'DESCRIPTION_ERROR', payload: true });
    }
  };

  useEffect(() => {
    let url = `${API.URL[process.env.NODE_ENV]}/needs-all/${userId}`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { needs } }) => {
        needs.sort((a, b) => a.id - b.id);
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
  }, [userId, refreshNeed]);

  useEffect(() => {
    if (!dataNeeds.length) {
      setPaginNeeds((s) => (s ? s - 1 : 0));
    }
  }, [dataNeeds]);

  if (loading) {
    return <Loader />;
  }

  return (
    <DashboardNeedsView
      data={data}
      dataNeeds={dataNeeds}
      value={value}
      paginNeeds={paginNeeds}
      paginDataForward={paginDataForward}
      paginDataBack={paginDataBack}
      handleChangeNeed={handleChangeNeed}
      updTitle={updTitle}
      handleUpdTitle={handleUpdTitle}
      updAbility={updAbility}
      handleUpdAbility={handleUpdAbility}
      updDescription={updDescription}
      handleUpdDescription={handleUpdDescription}
      handleDelete={handleDelete}
      handleReset={handleReset}
      handleSave={handleSave}
      errors={errors}
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
    // dispatchPrevPage: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLayout(DashboardNeedsScreen));
