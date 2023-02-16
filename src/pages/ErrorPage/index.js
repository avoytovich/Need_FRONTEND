import React from 'react';
import { useRouteError } from 'react-router-dom';

import { text } from 'helper/constants';

export default function ErrorPage() {
  const error = useRouteError();
  // console.error(error);
  const {
    pages: {
      errorPage: { OOPS, SORRY_MESSAGE },
    },
  } = text;

  return (
    <div id="error-page">
      <h1>{OOPS}</h1>
      <p>{SORRY_MESSAGE}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
