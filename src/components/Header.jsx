import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

const Header = ({ text, showNickname }) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchedData = { id: 'jinhong0924', nickname: '쿠킹호일' };
    if (showNickname) setNickname(fetchedData.nickname);
  }, []);

  return (
    <header className="flex justify-between items-center">
      <div>
        <Sidebar />
      </div>
      <div>{text}</div>
      <div>{showNickname && nickname}</div>
    </header>
  );
};

export default Header;
