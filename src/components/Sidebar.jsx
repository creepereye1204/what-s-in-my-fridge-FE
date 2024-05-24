import { useContext, useEffect, useState } from 'react';
import Context from './Context';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const { isSidebarOpened, handleSidebar } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(isSidebarOpened);
    const [nickname, setNickname] = useState('');

    const fetchNickname = async () => {
        try {
            setNickname('no_nickname');
            const response = await axios.get('http://210.109.52.15/myinfo');
            if (response.status === 200) {
                setNickname(response.data.nickname);
            } else {
                setNickname('no_nickname');
            }
        } catch (e) {
            alert('서버와 연결되지 않았습니다.');
            console.log('정보제공 오류 => ' + e);
        }
    };

    useEffect(() => {
        setMenuOpen(isSidebarOpened);
        fetchNickname();
    }, [isSidebarOpened]);

    // 경로 변경 시 사이드바 닫기
    useEffect(() => {
        if (menuOpen) {
            handleSidebar(false);
            setMenuOpen(false);
        }
    }, [location]);

    const toggleMenu = () => {
        handleSidebar(!menuOpen);
        setMenuOpen(!menuOpen);
    };

    const handleSignInClick = () => {
        if (nickname === 'no_nickname') {
            navigate('/SignIn');
        }
    };

    return (
        <>
            {!menuOpen && (
                <label htmlFor="menuToggle" className="menu-icon" onClick={toggleMenu}>
                    <img id="menu" src="https://i.imgur.com/hFA6mNi.png" alt="슬라이드 메뉴" className="w-8 h-8" />
                </label>
            )}
            <input type="checkbox" id="menuToggle" className="hidden" checked={menuOpen} onChange={toggleMenu} />
            {menuOpen && <div className="overlay show"></div>} {/* 오버레이 추가 */}
            <div className={`slide-menu ${menuOpen ? 'left-0' : 'left-[-300px]'}`}>
                <div className="p-5">
                    <h2 className="Jua-font text-6xl text-blue-900 mb-4">메뉴</h2>
                    <hr className="custom-hr" />
                    <ul>
                        <li
                            onClick={handleSignInClick}
                            className={`Jua-font block py-2 text-blue-900 text-4xl cursor-pointer ${nickname !== 'no_nickname' && 'pointer-events-none'}`}>
                            {nickname !== 'no_nickname' ? nickname : '로그인'}
                        </li>
                        <hr className="custom-hr" />
                        <li onClick={() => navigate('/MyFridge')} className="Jua-font block py-2 text-blue-900 text-4xl cursor-pointer">나의 냉장고</li>
                        <hr className="custom-hr" />
                        <li onClick={() => navigate('/ShowRecipes')} className="Jua-font block py-2 text-blue-900 text-4xl cursor-pointer">레시피 보기</li>
                        <hr className="custom-hr" />
                        <li onClick={() => navigate('/Community')} className="Jua-font block py-2 text-blue-900 text-4xl cursor-pointer">커뮤니티</li>
                        <hr className="custom-hr" />
                    </ul>
                    <label htmlFor="menuToggle" className="Jua-font cursor-pointer text-sky-900 text-4xl" onClick={toggleMenu}>닫기</label>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
