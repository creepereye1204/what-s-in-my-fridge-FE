import { useContext } from 'react';
import Context from './Context';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { isSidebarOpened, handleSidebar } = useContext(Context);
  const navigate = useNavigate();
  const toggleMenu = () => {
    handleSidebar(isSidebarOpened);
  };

  return (
    <div className="fixed h-full z-50">
      <div onClick={toggleMenu}>메뉴아이콘</div>
      {isSidebarOpened && (
        <ul className="h-full bg-blue-500">
          <li onClick={() => navigate('/')}>홈</li>
          <li onClick={() => navigate('/MyFridge')}>나의 냉장고</li>
          <li onClick={() => navigate('/ShowRecipes')}>레시피 보기</li>
          <li onClick={() => navigate('/Community')}>커뮤니티</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
