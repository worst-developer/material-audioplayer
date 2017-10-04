
// Containers
import HomePage       from './containers/HomePage';

import { goBack } from 'react-router-redux';

export default (store) => [
  { path: '/',           component: HomePage, exact: true }
];
