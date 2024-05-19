import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = ({ text, nickname }) => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-center">
      <div>
        <Sidebar />
      </div>
      <div>{text}</div>
      <div>
        {nickname === 'no_nickname' ? (
          <button
            onClick={() => {
              navigate('/SignIn');
            }}
          >
            로그인하기
          </button>
        ) : (
          nickname
        )}
      </div>
    </header>
  );
};

export default Header;
