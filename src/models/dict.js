const DictModel = {
  namespace: 'dict',
  state: {
    dictList: [],
  },
  reducers: {
    refreshDict(state, action) {
      //转换为
      return { ...state, dictList: action.dictList || [] };
    }
  },
};
export default DictModel;
