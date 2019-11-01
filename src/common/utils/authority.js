export function getAuthority(str) {
  const store = window.g_app._store;
  if (!store) {
    return null;
  }
  const authorityString =
    typeof str === 'undefined' ? window.g_app._store.getState().user.currentUser.permissions : str;

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  return authority;
}
