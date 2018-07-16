const loading = {
    visible: false
}
const reducers = (state = loading, action) => {
    switch (action.type) {
        case 'SHOW_LOADING':
            return Object.assign({}, state, { visible: true });
        case 'HIDE_LOADING':
            return Object.assign({}, state, { visible: false });
        default:
            return state;
    }
};
export default reducers;