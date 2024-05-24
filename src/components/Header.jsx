import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const Header = ({ text, nickname }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between bg-red-500">
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
              > 로그인하기
                Qkfrksak
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
