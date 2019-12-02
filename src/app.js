import request from '@/common/utils/request';


export function onRouteChange({ location, routes, action }) {
  //切换路由时，请求字典数据
  request.get('/sys/dict/all').then(res=>{
    window.g_app._store.dispatch({
      type: 'dict/refreshDict',
      dictList: res
    });
  });
}
