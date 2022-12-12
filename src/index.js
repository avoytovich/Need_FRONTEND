import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <p>Hallo world!</p>

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
