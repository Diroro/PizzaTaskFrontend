const setAccessToken = (accessToken: string) => localStorage.setItem('accessToken', accessToken);
const removeAccessToken = () => localStorage.removeItem('accessToken');
const getAccessToken = () => localStorage.getItem('accessToken');

export const localStorageUtils = {
  setAccessToken,
  removeAccessToken,
  getAccessToken,
};
