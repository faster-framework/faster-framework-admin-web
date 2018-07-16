import { combineReducers } from 'redux';

import userReducers from './userReducers';
import loadingReducers from './loadingReducers';
import tabReducers from './tabReducers';

var reducers = combineReducers({
    userState: userReducers,
    loadingState: loadingReducers,
    tabState: tabReducers
});

export default reducers;