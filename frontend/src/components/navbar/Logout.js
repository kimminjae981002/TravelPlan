export const Logout = (setAccessToken, setIsLoggedIn) => {
  alert('로그아웃 완료');
  setAccessToken('');
  setIsLoggedIn(false);

  document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
  localStorage.removeItem('accessToken');
  window.location.href = '/';
};
