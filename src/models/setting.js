import { message } from 'antd';
import defaultSettings from '../../config/defaultSettings';
import themeColorClient from '../common/components/SettingDrawer/themeColorClient';

const updateTheme = newPrimaryColor => {
  if (newPrimaryColor) {
    const timeOut = 0;
    const hideMessage = message.loading('正在切换主题！', timeOut);
    themeColorClient.changeColor(newPrimaryColor).finally(() => hideMessage());
  }
};

const updateColorWeak = colorWeak => {
  const root = document.getElementById('root');

  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const SettingModel = {
  namespace: 'settings',
  state: defaultSettings,
  reducers: {
    getSetting(state = defaultSettings) {
      const setting = {};
      const urlParams = new URL(window.location.href);
      Object.keys(state).forEach(key => {
        if (urlParams.searchParams.has(key)) {
          const value = urlParams.searchParams.get(key);
          setting[key] = value === '1' ? true : value;
        }
      });
      const { primaryColor, colorWeak } = setting;

      if (primaryColor && state.primaryColor !== primaryColor) {
        updateTheme(primaryColor);
      }

      updateColorWeak(!!colorWeak);
      return { ...state, ...setting };
    }
  },
};
export default SettingModel;
