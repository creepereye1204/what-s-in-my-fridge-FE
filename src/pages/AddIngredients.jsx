import { useState } from 'react';

const predefinedIngredients = ['계란', '오징어', '당근', '양배추', '고기'];

const AddIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState({});

  const handleSelectIngredient = (ingredient) => {
    const incresement = ingredient == '고기' ? 50 : 1;
    setSelectedIngredients((prevState) => ({
      ...prevState,
      [ingredient]: prevState[ingredient]
        ? prevState[ingredient] + incresement
        : incresement,
    }));
  };

  const handleRemoveIngredient = (ingredient) => {
    const decreasement = ingredient == '고기' ? 50 : 1;
    if (selectedIngredients[ingredient] > 1) {
      setSelectedIngredients((prevState) => ({
        ...prevState,
        [ingredient]: prevState[ingredient] - decreasement,
      }));
    } else {
      const updatedIngredients = { ...selectedIngredients };
      delete updatedIngredients[ingredient];
      setSelectedIngredients(updatedIngredients);
    }
  };

  const handleSubmit = () => {
    // 서버로 선택된 재료 전송
    console.log(selectedIngredients);
  };

  return (
    <div>
      <h2>식재료 추가하기</h2>
      <ul>
        {predefinedIngredients.map((ingredient) => (
          <li key={ingredient}>
            <span>{ingredient}</span>
            <button onClick={() => handleSelectIngredient(ingredient)}>
              +
            </button>
            <span>{selectedIngredients[ingredient] || 0}</span>
            <span>{ingredient == '고기' ? 'g' : '개'}</span>
            <button onClick={() => handleRemoveIngredient(ingredient)}>
              -
            </button>
            <span>소비기한</span>
            <input type="number"></input>
            <span>일</span>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>추가하기</button>
    </div>
  );
};

export default AddIngredients;
