import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const onClickSignIn = () => {
    const signinData = {
      id: id,
      password: password,
    };
    axios
      .post('http://210.109.52.15/signip', signinData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status == 200) {
          navigate('/');
        }
      })
      .catch((e) => {
        alert('서버와 연결되지 않았습니다.');
        console.log('로그인 오류 => ' + e);
      });
  };

  return (
    <div>
      <form onSubmit={onClickSignIn}>
        <div>
          <input
            type="text"
            value={id}
            onChange={handleId}
            placeholder="이메일"
          />

          <input
            type="password"
            value={password}
            onChange={handlePassword}
            placeholder="비밀번호"
          />
        </div>
        <div>
          <button type="submit">로그인</button>
        </div>
      </form>

      <div
        onClick={() => {
          navigate('/SignUp');
        }}
      >
        회원가입
      </div>
    </div>
  );
};

export default SignIn;
