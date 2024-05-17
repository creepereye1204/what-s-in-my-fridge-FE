import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('http://210.109.52.15/get');
      if (response.status === 200) {
        const serverData = response.data;

        const today = new Date();
        const newData = serverData.map((item) => {
          const expireDate = new Date(item.expireDate);
          const diffTime = expireDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return {
            ...item,
            dDay: diffDays,
          };
        });

        setIngredients(newData);
      }
    } catch (e) {
      alert('서버와 연결되지 않았습니다.');
      console.log('데이터 불러오기 오류 => ' + e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex space-between">
        <div onClick={() => navigate('/AddIngredients')}>재료추가</div>
        <div onClick={() => navigate('/EditIngredients')}>재료수정</div>
      </div>
      <div>
        {ingredients.map((data) => (
          <div key={data.id}>
            <img src={`/images/${data.ingredient}.png`} alt={data.ingredient} />
            {data.ingredient} {data.count} (
            {data.ingredient === '고기' ? 'g' : '개'})
            {data.storeMethod === '냉동' ? '냉동보관' : '냉장보관'}, D-
            {data.dDay}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFridge;
