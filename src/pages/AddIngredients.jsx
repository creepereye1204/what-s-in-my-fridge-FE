import { useState } from 'react';

const predefinedIngredients = ['계란', '오징어', '당근', '양배추', '고기'];

const AddIngredients = () => {
  const [selectedIngredients, setSelectedIngredients] = useState({});
  const [storageMethods, setStorageMethods] = useState(
    predefinedIngredients.reduce((acc, ingredient) => {
      acc[ingredient] = '냉장';
      return acc;
    }, {})
  );
  const [expirationDates, setExpirationDates] = useState({});

  const handleSelectIngredient = (ingredient) => {
    const incresement = ingredient === '고기' ? 50 : 1;
    setSelectedIngredients((prevState) => ({
      ...prevState,
      [ingredient]: prevState[ingredient]
        ? prevState[ingredient] + incresement
        : incresement,
    }));
  };

  const handleRemoveIngredient = (ingredient) => {
    const decreasement = ingredient === '고기' ? 50 : 1;
    if (selectedIngredients[ingredient] > decreasement) {
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

  const handleStorageMethodChange = (ingredient, method) => {
    setStorageMethods((prevState) => ({
      ...prevState,
      [ingredient]: method,
    }));
  };

  const handleExpirationDateChange = (ingredient, date) => {
    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('소비기한은 현재 날짜 이후여야 합니다.');
      const inputElement = document.querySelector(`#ingredient-${ingredient}`);
      if (inputElement) {
        const formattedDate = currentDate.toISOString().slice(0, 10);
        inputElement.value = formattedDate;
      }
      return;
    }
    setExpirationDates((prevState) => ({
      ...prevState,
      [ingredient]: date,
    }));
  };

  const handleSubmit = () => {
    const selectedData = Object.keys(selectedIngredients).map((ingredient) => ({
      [ingredient]: selectedIngredients[ingredient],
      storeMethod: storageMethods[ingredient],
      expireDate: expirationDates[ingredient] || '2000-01-01',
    }));
    console.log(selectedData);
  };

  const ingredientCount = Object.keys(selectedIngredients).length;

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
            <span>{ingredient === '고기' ? 'g' : '개'}</span>
            <button onClick={() => handleRemoveIngredient(ingredient)}>
              -
            </button>
            {selectedIngredients[ingredient] > 0 && (
              // 선택된 재료가 있을 때만 보관 방법과 소비기한 선택 폼 렌더링
              <div>
                <label>
                  <input
                    type="radio"
                    name={`storage-${ingredient}`}
                    value="냉장"
                    checked={storageMethods[ingredient] === '냉장'}
                    onChange={() =>
                      handleStorageMethodChange(ingredient, '냉장')
                    }
                  />
                  냉장
                </label>
                <label>
                  <input
                    type="radio"
                    name={`storage-${ingredient}`}
                    value="냉동"
                    checked={storageMethods[ingredient] === '냉동'}
                    onChange={() =>
                      handleStorageMethodChange(ingredient, '냉동')
                    }
                  />
                  냉동
                </label>
                <div>
                  <span>소비기한</span>
                  <input
                    type="date"
                    id={`ingredient-${ingredient}`}
                    onChange={(e) =>
                      handleExpirationDateChange(ingredient, e.target.value)
                    }
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {ingredientCount > 0 && (
        // 선택된 재료가 있을 때만 추가하기 버튼 렌더링
        <button onClick={handleSubmit}>추가하기</button>
      )}
    </div>
  );
};

export default AddIngredients;
