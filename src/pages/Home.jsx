import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Sidebar 컴포넌트 경로 수정

const Home = () => {
    const [nickname, setNickname] = useState('');
    const navigate = useNavigate();

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
        fetchNickname();
    }, []);

    // 이미지의 기본 동작을 차단하는 이벤트 리스너를 추가
    useEffect(() => {
        const disableImageActions = (e) => {
            e.preventDefault();
            e.stopPropagation();
        };

        const images = document.querySelectorAll('img');
        images.forEach((img) => {
            img.addEventListener('contextmenu', disableImageActions);
            img.addEventListener('dragstart', disableImageActions);
            img.addEventListener('mousedown', disableImageActions);
        });

        // Cleanup event listeners on component unmount
        return () => {
            images.forEach((img) => {
                img.removeEventListener('contextmenu', disableImageActions);
                img.removeEventListener('dragstart', disableImageActions);
                img.removeEventListener('mousedown', disableImageActions);
            });
        };
    }, []);

    return (
        <div className="bg-blue-100 h-screen flex flex-col items-center font-sans text-center relative">
            <Sidebar /> 
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-5">
                <img id="what-in-my-refridge" src="https://i.imgur.com/yk6aldW.png" alt="프로젝트 이미지" className="max-w-64 h-auto" />
            </div>
            <div id="root" className="w-11/12 bg-blue-100 p-5 rounded-2xl flex flex-col items-center space-y-8 mt-32"> {/* mt-24에서 mt-32로 변경 */}
                <div className="block w-full">
                    <div className="bg-blue-200 border-sky-900 rounded-2xl flex items-center justify-center border-4 h-36 w-full" onClick={() => navigate('/MyFridge')}>
                        <img id="MyFridge" src="https://i.imgur.com/15U5wP2.png" alt="나의 냉장고" className="max-w-full h-32" />
                    </div>
                </div>
                <div className="block w-full">
                    <div className="bg-blue-200 border-sky-900 rounded-2xl flex items-center justify-center border-4 h-36 w-full" onClick={() => navigate('/ShowRecipes')}>
                        <img id="ShowRecipes" src="https://imgur.com/HpLYjZs.png" alt="레시피 추천" className="max-w-full h-32" />
                    </div>
                </div>
                <div className="block w-full">
                    <div className="bg-blue-200 border-sky-900 rounded-2xl flex items-center justify-center border-4 h-36 w-full" onClick={() => navigate('/Community')}>
                        <img id="Community" src="https://i.imgur.com/PrT9R2b.png" alt="커뮤니티" className="max-w-full h-32" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

