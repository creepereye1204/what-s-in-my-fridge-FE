import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = ({ text, nickname }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between bg-red-600">
        <div>
          <Sidebar />
        </div>
        <header className="">
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
      </div>
    </div>
  );
};

export default Header;
