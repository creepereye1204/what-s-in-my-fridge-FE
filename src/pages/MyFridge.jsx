import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    // 서버에서 받은 데이터를 새로운 형식에 맞게 수정
    const serverData = [
      {
        id: 1,
        ingredient: '계란',
        count: 10,
        storeMethod: '냉장',
        expireDate: '2024-05-18',
      },
      {
        id: 2,
        ingredient: '오징어',
        count: 5,
        storeMethod: '냉동',
        expireDate: '2024-05-19',
      },
      {
        id: 3,
        ingredient: '당근',
        count: 8,
        storeMethod: '냉장',
        expireDate: '2024-05-20',
      },
      {
        id: 4,
        ingredient: '양배추',
        count: 2,
        storeMethod: '냉장',
        expireDate: '2024-05-30',
      },
      {
        id: 5,
        ingredient: '고기',
        count: 500,
        storeMethod: '냉동',
        expireDate: '2024-07-11',
      },
      {
        id: 6,
        ingredient: '양상추',
        count: 300,
        storeMethod: '냉장',
        expireDate: '2024-05-17',
      },
    ];

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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex space-between">
        <div
          onClick={() => {
            navigate('/AddIngredients');
          }}
        >
          재료추가
        </div>
        <div
          onClick={() => {
            navigate('/EditIngredients');
          }}
        >
          재료수정
        </div>
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
