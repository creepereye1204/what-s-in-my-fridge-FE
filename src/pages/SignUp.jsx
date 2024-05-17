import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [nickname, setNickname] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const navigate = useNavigate();

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
      const signupData = { id: id, nickname: nickname, password: password };
      axios
        .post('http://210.109.52.15/signup', signupData, {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status == 200) {
            alert('회원가입이 완료되었습니다.');
            navigate('/SignIn');
          }
        })
        .catch((e) => {
          alert('서버와 연결되지 않았습니다.');
          console.log('회원가입 오류 => ' + e);
        });
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
