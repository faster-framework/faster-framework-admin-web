export function name(type, value) {
  const store = window.g_app._store;
  if (!store) {
    return '';
  }

  const dictList = window.g_app._store.getState().dict.dictList;
  const dict = dictList.find(item => {
    return item.type == type && item.dictValue == value;
  });
  return dict ? dict.name : ''
}

export function value(type, name) {
  const store = window.g_app._store;
  if (!store) {
    return '';
  }
  const dictList = window.g_app._store.getState().dict.dictList;
  const dict = dictList.find(item => {
    return item.type == type && item.name == name;
  });
  return dict ? dict.dictValue : ''
}


export function listByType(type) {
  const store = window.g_app._store;
  if (!store) {
    return [];
  }
  const dictList = window.g_app._store.getState().dict.dictList;
  const dictFilter =  dictList.filter(item => {
    return item.type == type;
  });
  return dictFilter ? dictFilter : []
}

export default {
  name: name,
  value: value,
  listByType: listByType
};
