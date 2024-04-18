/* eslint-disable react/display-name */
import { BrowserRouter } from 'react-router-dom';
import App from '../containers/App';

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};
