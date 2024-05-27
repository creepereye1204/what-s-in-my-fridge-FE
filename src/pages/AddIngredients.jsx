import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
    axios
      .post('http://210.109.52.15/add', selectedData, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(selectedData);
          navigate('/MyFridge');
        }
      });
  };

  const ingredientCount = Object.keys(selectedIngredients).length;

  return (
    <div className="bg-blue-100 flex flex-col items-center font-sans text-center relative min-h-screen">
      <h2 className="Jua-font text-blue-900 text-4xl sticky mt-4 top-0 bg-blue-100 flex items-center justify-center relative select-none">
        식재료 추가하기
      </h2>
      <div className="w-full flex justify-center">
        <hr className="custom-hr-EditIngredients w-full" />
      </div>
      <div className="w-full select-none">
        <ul className="text-left Jua-font text-xl">
          {predefinedIngredients.map((ingredient) => (
            <li
              className="w-full px-4 py-2 flex flex-col items-start border-b-4 border-blue-900 mt-4 mb-4"
              key={ingredient}
            >
              <div className="flex items-center">
                <span>{ingredient}</span>
                &nbsp;
                <div className="flex items-center space-x-2">
                  <span>{selectedIngredients[ingredient] || 0}</span>
                  <span>{ingredient === '고기' ? 'g' : '개'}</span>

                  <button
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="border-2 border-blue-900 bg-blue-200  h-8 w-8 rounded-lg ml-1"
                  >
                    -
                  </button>
                  <button
                    onClick={() => handleSelectIngredient(ingredient)}
                    className="border-2 border-blue-900 bg-blue-200  h-8 w-8 rounded-lg ml-1"
                  >
                    +
                  </button>
                </div>
              </div>
              {selectedIngredients[ingredient] > 0 && (
                // 선택된 재료가 있을 때만 보관 방법과 소비기한 선택 폼 렌더링
                <div className="flex w-full">
                  <div className="mt-2 flex flex-col">
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
                  </div>
                  <div className="flex flex-col items-center justify-center pl-16">
                    <span>소비기한 </span>
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
      </div>
      {ingredientCount > 0 && (
        // 선택된 재료가 있을 때만 추가하기 버튼 렌더링
        <button
          className="Jua-font border-2 border-blue-900 bg-blue-200 h-10 w-16 mt-4"
          onClick={handleSubmit}
        >
          추가하기
        </button>
      )}
    </div>
  );
};

export default AddIngredients;
