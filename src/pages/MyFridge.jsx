import { useEffect, useState } from 'react';
import Header from '../components/Header';

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const fetchData = () => {
    const fetchedData = [
      { item: '계란', quantity: 30, storage: 30 },
      { item: '대파', quantity: 6, storage: 3 },
      { item: '양파', quantity: 3, storage: 0 },
      { item: '오징어', quantity: 1, storage: 0 },
      { item: '고기', quantity: 700, storage: 0 },
      { item: '고등어', quantity: 4, storage: 0 },
      { item: '요거트', quantity: 6, storage: 10 },
      { item: '만두', quantity: 3, storage: 1 },
    ];
    setIngredients(fetchedData);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <Header />
      <div>
        {ingredients.map((ingredient, index) => (
          <div key={index}>
            <img src={`/images/${ingredient.item}.png`} alt={ingredient.item} />
            {ingredient.item} {ingredient.quantity} (
            {ingredient.item == '고기' ? 'g' : '개'})
            {ingredient.storage === 0 ? '냉장보관' : `${ingredient.storage}일`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFridge;
