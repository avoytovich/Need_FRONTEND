import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import connect from 'utils/connectFunction';
import action from 'utils/actions';
import { withLayout } from 'hocs';
import { API, PER_PAGE } from 'helper/constants';
import { wrapRequest } from 'utils/api';
import NeedsView from './NeedsView';
import { Loader } from 'components';

const NeedsScreen = ({ store, dispatchPrevPage }) => {
  const [showFilters, setShowFilters] = useState(null);
  const [filtersCount, setFilterCount] = useState(0);
  const [actual, setActual] = useState(false);
  const [noActual, setNoActual] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState('');
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [options, setOptions] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleChange = (e, p) => setPage(p);

  useEffect(() => {
    if (store.prevPage) {
      setPage(store.prevPage);
      dispatchPrevPage('prevPage', null);
    }
  }, [dispatchPrevPage, store.prevPage]);

  useEffect(() => {
    const filterArray = [actual, noActual, inProgress].filter(
      (item) => item === true,
    );
    setFilterCount(filterArray.length);
  }, [actual, noActual, inProgress]);

  useEffect(() => {
    let url = `${API.URL[process.env.NODE_ENV]}/needs-all`;
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { needs } }) => {
        setOptions(needs);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      );
  }, []);

  useEffect(() => {
    let url = `${API.URL[process.env.NODE_ENV]}/needs?page=${
      page - 1
    }&size=${PER_PAGE}&title=${search}`;

    if (actual) {
      url += `&filter=actual`;
    }
    if (noActual) {
      url += `&filter=not_actual`;
    }
    if (inProgress) {
      url += `&filter=in_progress`;
    }
    wrapRequest({
      method: 'GET',
      url,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { needs, totalItems, totalPages } }) => {
        if (!needs.length && page > 1) {
          setPage((p) => p - 1);
        }
        setData(needs);
        setTotalItems(totalItems);
        setTotalPages(totalPages);
      })
      .catch((err) =>
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        }),
      )
      .finally(() => {
        setLoading(false);
      });
  }, [page, search, actual, noActual, inProgress, refresh]);

  if (loading) {
    return <Loader />;
  }

  return (
    <NeedsView
      dispatchPrevPage={dispatchPrevPage}
      showFilters={showFilters}
      setShowFilters={setShowFilters}
      filtersCount={filtersCount}
      setFilterCount={setFilterCount}
      actual={actual}
      setActual={setActual}
      noActual={noActual}
      setNoActual={setNoActual}
      inProgress={inProgress}
      setInProgress={setInProgress}
      search={search}
      setSearch={setSearch}
      selected={selected}
      setSelected={setSelected}
      page={page}
      setPage={setPage}
      setRefresh={setRefresh}
      count={totalPages}
      totalItems={totalItems}
      handleChange={handleChange}
      data={data}
      options={options}
    />
  );
};

const mapStateToProps = (state) => {
  return { store: state };
};

const mapDispatchToProps = (dispatch) => {
  const actionData = (name, payload) => dispatch(action(name, payload));
  return {
    dispatchPrevPage: actionData,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLayout(NeedsScreen));
