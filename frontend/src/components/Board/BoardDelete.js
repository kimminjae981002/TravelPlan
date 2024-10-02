// deleteBoard.js
import { performRequest } from '../RefreshToken/RefreshToken';

export const handleBoardDelete = async (id, setBoards) => {
  if (window.confirm('정말로 삭제하시겠습니까?')) {
    const url = `https://xn--9r2b17b.shop/board/${id}`;
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    };

    try {
      const response = await performRequest(url, options);

      if (response && response.ok) {
        alert('게시글이 삭제 되었습니다.');
        window.location.href = '/'; // 홈으로 리다이렉트
        setBoards((prevBoards) =>
          prevBoards.filter((board) => board.id !== id),
        );
      } else {
        const errorText = await response.text();
        console.error('삭제 실패:', errorText);
        alert(`게시글 삭제에 실패했습니다.`);
      }
    } catch (error) {
      console.error('삭제 중 오류 발생:', error);
    }
  }
};
