export const performRequest = async (url, options, formData = null) => {
  let response = await fetch(url, options);

  // 만약 요청이 실패하고 상태 코드가 401 (Unauthorized)일 경우
  if (!response.ok && response.status === 401) {
    const refreshResponse = await fetch(
      'https://xn--9r2b17b.shop/user/refresh-token',
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (refreshResponse.ok) {
      const data = await refreshResponse.json();
      const accessToken = data.accessToken;
      localStorage.setItem('accessToken', accessToken);

      // 기존 요청을 다시 시도
      options.headers.Authorization = `Bearer ${accessToken}`;
      response = await fetch(url, options); // 같은 요청을 다시 시도
    } else {
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      localStorage.removeItem('accessToken');
      window.location.href = '/';
      return null;
    }
  }

  return response;
};
