import React, { useEffect, useState } from 'react';

import connect from './../../utils/connectFunction';
// import action from './../../utils/actions';
import { withLayout } from './../../hocs';
import { API, PER_PAGE } from '../../helper/constants';
import { wrapRequest } from '../../utils/api';
import NeedsView from './NeedsView';

const NeedsScreen = (props) => {
  const [showFilters, setShowFilters] = useState(null);
  const [filtersCount, setFilterCount] = useState(0);
  const [actual, setActual] = useState(false);
  const [noActual, setNoActual] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleChange = (e, p) => setPage(p);

  useEffect(() => {
    const filterArray = [actual, noActual, inProgress].filter(
      (item) => item === true,
    );
    setFilterCount(filterArray.length);
  }, [actual, noActual, inProgress]);

  useEffect(() => {
    wrapRequest({
      method: 'GET',
      url: `${API.URL}:${API.PORT}/needs?page=${
        page - 1
      }&size=${PER_PAGE}&title=${search}`,
      mode: 'cors',
      cache: 'default',
    })
      .then(({ data: { needs, totalItems, totalPages } }) => {
        setData(needs);
        setTotalItems(totalItems);
        setTotalPages(totalPages);
      })
      .catch(console.error);
  }, [page, search]);

  return (
    <NeedsView
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
      page={page}
      count={totalPages}
      totalItems={totalItems}
      handleChange={handleChange}
      data={data}
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
)(withLayout(NeedsScreen));