export const add = (data) => ({
    type: 'ADD_TAB',
    tab: data,
});
export const remove = (key) => ({
    type: 'DEL_TAB',
    key: key,
});