export const performRequest = async (url, options, formData = null) => {
  let response = await fetch(url, options);

  // 엑세스 토큰이 만료되면 리프레쉬 토큰을 통한 재발급
  if (!response.ok && response.status === 401) {
    const refreshResponse = await fetch(
      'https://travelplan.store/user/refresh-token',
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      const accessToken = data.accessToken;
      localStorage.setItem('accessToken', accessToken);

      options.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, options);
    } else {
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.removeItem('accessToken');
      window.location.href = '/';
      return null;
    }
  }

  return response;
};
