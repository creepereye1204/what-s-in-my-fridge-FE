import { useEffect, useState } from 'react';

const dummyData = [
  {
    id: 1,
    ingredient: '계란',
    count: 10,
    storeMethod: '냉장',
    expireDate: '2023-06-15',
  },
  {
    id: 2,
    ingredient: '오징어',
    count: 5,
    storeMethod: '냉동',
    expireDate: '2023-07-01',
  },
  {
    id: 3,
    ingredient: '당근',
    count: 8,
    storeMethod: '냉장',
    expireDate: '2023-05-30',
  },
  {
    id: 4,
    ingredient: '양배추',
    count: 2,
    storeMethod: '냉장',
    expireDate: '2023-06-10',
  },
  {
    id: 5,
    ingredient: '고기',
    count: 500,
    storeMethod: '냉동',
    expireDate: '2023-06-20',
  },
  {
    id: 6,
    ingredient: '양상추',
    count: 300,
    storeMethod: '냉장',
    expireDate: '2023-06-10',
  },
];

const EditIngredients = () => {
  const [ingredients, setIngredients] = useState(() => {
    return dummyData.map((item, index) => ({ ...item, id: index + 1 }));
  });
  const [storageMethods, setStorageMethods] = useState({});

  useEffect(() => {
    const initialStorageMethods = {};
    for (const item of ingredients) {
      initialStorageMethods[item.id] = item.storeMethod;
    }
    setStorageMethods(initialStorageMethods);
  }, [ingredients]);

  const handleCountChange = (id, operation) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      const ingredient = updatedIngredients.find((item) => item.id === id);
      const increment = ingredient.ingredient === '고기' ? 50 : 1;
      if (operation === 'increase') {
        ingredient.count += increment;
      } else if (operation === 'decrease' && ingredient.count > increment) {
        ingredient.count -= increment;
      }
      return updatedIngredients;
    });
  };

  const handleStorageMethodChange = (id, method) => {
    setStorageMethods((prevMethods) => ({
      ...prevMethods,
      [id]: method,
    }));
  };

  const handleExpirationDateChange = (id, date) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = [...prevIngredients];
      const ingredient = updatedIngredients.find((item) => item.id === id);
      ingredient.expireDate = date;
      return updatedIngredients;
    });
  };

  const handleRemoveIngredient = (id) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.filter(
        (item) => item.id !== id
      );
      const updatedMethods = { ...storageMethods };
      delete updatedMethods[id];
      setStorageMethods(updatedMethods);
      return updatedIngredients;
    });
  };

  const handleSubmit = () => {
    const modifiedData = ingredients.map(({ id, ...rest }) => rest);
    console.log(modifiedData);
  };

  return (
    <div>
      <ul>
        {ingredients.map((item) => (
          <li key={item.id}>
            <button onClick={() => handleRemoveIngredient(item.id)}>
              삭제
            </button>
            <span>{item.ingredient}</span>
            <button onClick={() => handleCountChange(item.id, 'decrease')}>
              -
            </button>
            <span>{item.count}</span>
            <span>{item.ingredient === '고기' ? 'g' : '개'}</span>
            <button onClick={() => handleCountChange(item.id, 'increase')}>
              +
            </button>

            <div>
              <label>
                <input
                  type="radio"
                  name={`storage-${item.id}`}
                  value="냉장"
                  checked={storageMethods[item.id] === '냉장'}
                  onChange={() => handleStorageMethodChange(item.id, '냉장')}
                />
                냉장
              </label>
              <label>
                <input
                  type="radio"
                  name={`storage-${item.id}`}
                  value="냉동"
                  checked={storageMethods[item.id] === '냉동'}
                  onChange={() => handleStorageMethodChange(item.id, '냉동')}
                />
                냉동
              </label>
            </div>
            <div>
              <span>소비기한</span>
              <input
                type="date"
                value={item.expireDate}
                onChange={(e) =>
                  handleExpirationDateChange(item.id, e.target.value)
                }
              />
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>수정하기</button>
    </div>
  );
};

export default EditIngredients;