import axios from 'axios';
import { useEffect, useState } from 'react';

const EditIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [storageMethods, setStorageMethods] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://210.109.52.15/get');
        const data = response.data;
        setIngredients(data);

        const initialStorageMethods = {};
        for (const item of data) {
          initialStorageMethods[item.id] = item.storeMethod;
        }
        setStorageMethods(initialStorageMethods);
      } catch (e) {
        alert('서버와 연결되지 않았습니다.');
        console.log('데이터 불러오기 오류 =>', e);
      }
    };

    fetchData();
  }, []);

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
    const selectedDate = new Date(date);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      alert('소비기한은 현재 날짜 이후여야 합니다.');
      const inputElement = document.querySelector(`#ingredient-${id}`);
      if (inputElement) {
        const formattedDate = currentDate.toISOString().slice(0, 10);
        inputElement.value = formattedDate;
      }
      return;
    }

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
    axios.post('http://210.109.52.15/modify', ingredients, {
      withCredentials: true,
    });
    console.log(ingredients);
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
                id={`ingredient-${item.id}`}
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
