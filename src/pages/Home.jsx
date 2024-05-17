import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

  const fetchNickname = async () => {
    try {
      const response = await axios.get('http://210.109.52.15/myinfo');
      if (response.status === 200) {
        setNickname(response.data.nickname);
      }
    } catch (e) {
      alert('서버와 연결되지 않았습니다.');
      console.log('정보제공 오류 => ' + e);
    }
  };

  useEffect(() => {
    fetchNickname();
  }, []);

  return (
    <div>
      <Header text={''} showNickname={nickname} />
      <div>
        {nickname ? (
          <div>
            <div onClick={() => navigate('/MyFridge')}>나의 냉장고</div>
            <div onClick={() => navigate('/ShowRecipes')}>레시피 보기</div>
            <div onClick={() => navigate('/Community')}>커뮤니티</div>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate('/login')}>로그인하러 가기</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
