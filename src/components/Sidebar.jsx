import { useContext } from 'react';
import Context from './Context';

const Sidebar = () => {
  const { isSidebarOpened, handleSidebar } = useContext(Context);
  const toggleMenu = () => {
    handleSidebar(isSidebarOpened);
  };

  return (
    <div>
      <div onClick={toggleMenu} style={{ cursor: 'pointer' }}>
        메뉴아이콘
      </div>
      {isSidebarOpened && (
        <ul>
          <li>나의 냉장고</li>
          <li>레시피 보기</li>
          <li>커뮤니티</li>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
