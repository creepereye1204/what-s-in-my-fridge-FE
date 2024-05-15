import { useState } from 'react';

const SignIn = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleId = (e) => {
    setId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const onClickSignIn = () => {
    console.log('서버로 데이터 전송');
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
    </div>
  );
};

export default SignIn;
