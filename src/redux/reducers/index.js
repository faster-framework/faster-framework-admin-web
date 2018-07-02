import { combineReducers } from 'redux';

import userReducers from './userReducers';

var reducers = combineReducers({
    userReducers: userReducers
});

export default reducers;