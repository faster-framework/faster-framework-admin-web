const breadcrumbState = {
    breadcrumbList: [{ text: '首页', link: '#/' }]
};
const reducers = (state = breadcrumbState, action) => {
    switch (action.type) {
        case 'ADD_BREADCRUMB':
            state.breadcrumbList.push(action.bread);
            return Object.assign({}, state, { breadcrumbList: state.breadcrumbList });
        case 'DEL_BREADCRUMB':
            const subLink = state.breadcrumbList.indexOf(action.link);
            const resultBreadList = state.breadcrumbList.slice(0, subLink);
            return Object.assign({}, state, { breadcrumbList: resultBreadList });
        default:
            return state;
    }
};
export default reducers;