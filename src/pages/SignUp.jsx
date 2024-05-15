import { useState } from 'react';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const onChangeId = (e) => {
    setId(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const onClickSignUp = () => {
    if (password != passwordConfirm) alert('비밀번호가 다릅니다');
    else {
      console.log('아이디 : ' + id);
      console.log('닉네임 : ' + nickname);
      console.log('비밀번호 : ' + password);
    }
  };

  return (
    <div>
      <span>아이디</span>
      <input type="text" value={id} onChange={onChangeId} />
      <span>닉네임</span>
      <input type="text" value={nickname} onChange={onChangeNickname} />
      <span>비밀번호</span>
      <input type="password" value={password} onChange={onChangePassword} />
      <span>비밀번호 확인</span>
      <input
        type="password"
        value={passwordConfirm}
        onChange={onChangePasswordConfirm}
      />
      <button onClick={onClickSignUp}>가입하기</button>
    </div>
  );
};

export default SignUp;
