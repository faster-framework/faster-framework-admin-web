import { combineReducers } from 'redux';

import userReducers from './userReducers';
import loadingReducers from './loadingReducers';

var reducers = combineReducers({
    userState: userReducers,
    loadingState: loadingReducers
});

export default reducers;