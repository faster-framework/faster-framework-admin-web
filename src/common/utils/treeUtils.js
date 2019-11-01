export const convertTreeSelectData = (data, valueName = 'id', labelName = 'name') => {
  const result = [];
  const firstMap = {};
  if (!Array.isArray(data) || data.length == 0) {
    return result;
  }
  data.forEach(treeNode => {
    treeNode.key = treeNode[valueName];
    treeNode.value = treeNode[valueName];
    treeNode.title = treeNode[labelName];
    //获取父级是否存在缓存map中
    const parent = firstMap[treeNode.parentId];
    treeNode.children = [];
    if (treeNode.parentId == 0 && parent == null) {
      //说明为1级节点
      result.push(treeNode);
    } else if (treeNode.parentId != 0 && parent != null) {
      const children = parent.children;
      children.push(treeNode);
    }
    firstMap[treeNode.id] = treeNode;
  });
  return result;
}
export default {
  convertTreeSelectData: convertTreeSelectData
};
