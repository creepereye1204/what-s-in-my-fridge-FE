import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

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
    <div className="bg-blue-100 flex flex-col items-center font-sans text-center relative min-h-screen">
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl mt-4 sticky top-0 bg-blue-100 flex items-center justify-center relative">
        <div>재료 수정</div>
      </div>
      <div className="w-full flex justify-center">
        <hr className="custom-hr w-full" />
      </div>
      <ul className="Jua-font w-full">
        {ingredients.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b-2 border-gray-300 p-2"
          >
            <div className="flex items-center">
              <div className="flex flex-col">
                <span className="font-bold">{item.ingredient}</span>
                <div className="mt-2 flex flex-col">
                  <label>
                    <input
                      type="radio"
                      name={`storage-${item.id}`}
                      value="냉장"
                      checked={storageMethods[item.id] === '냉장'}
                      onChange={() =>
                        handleStorageMethodChange(item.id, '냉장')
                      }
                    />
                    냉장
                  </label>
                  <label>
                    <input
                      type="radio"
                      name={`storage-${item.id}`}
                      value="냉동"
                      checked={storageMethods[item.id] === '냉동'}
                      onChange={() =>
                        handleStorageMethodChange(item.id, '냉동')
                      }
                    />
                    냉동
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex">
                {item.count} {item.ingredient === '고기' ? 'g' : '개'}
              </div>
              <div>
                <button
                  onClick={() => handleCountChange(item.id, 'decrease')}
                  className=" border-2 border-blue-900 bg-blue-200 h-8 w-8 rounded-lg mr-1"
                >
                  -
                </button>
                <button
                  onClick={() => handleCountChange(item.id, 'increase')}
                  className="border-2 border-blue-900 bg-blue-200  h-8 w-8 rounded-lg ml-1"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <span>소비기한</span>
              <input
                type="date"
                id={`ingredient-${item.id}`}
                value={item.expireDate}
                onChange={(e) =>
                  handleExpirationDateChange(item.id, e.target.value)
                }
                className="border-2  h-8 w-32  mt-2"
              />
            </div>
            <button
              onClick={() => handleRemoveIngredient(item.id)}
              className="Jua-font border-2 border-red-900 bg-red-200 h-10 w-16 rounded-lg"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button
        className="Jua-font border-2 border-sky-900 bg-blue-200 p-1 rounded-2xl mt-4"
        onClick={handleSubmit}
      >
        수정하기
      </button>
    </div>
  );
};

export default EditIngredients;
