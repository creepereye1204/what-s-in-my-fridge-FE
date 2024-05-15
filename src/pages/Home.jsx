import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div>
        <div
          onClick={() => {
            navigate('/MyFridge');
          }}
        >
          나의 냉장고
        </div>
        <div
          onClick={() => {
            navigate('/ShowRecipes');
          }}
        >
          레시피 보기
        </div>
        <div
          onClick={() => {
            navigate('/Community');
          }}
        >
          커뮤니티
        </div>
      </div>
    </div>
  );
};

export default Home;
