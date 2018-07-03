export const add = (data) => ({
    type: 'ADD_BREADCRUMB',
    bread: data,
});
export const remove = (link) => ({
    type: 'DEL_BREADCRUMB',
    link: link,
});