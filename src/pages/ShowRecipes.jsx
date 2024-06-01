import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/search/5', {
          withCredentials: true,
        });
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  const handleClick = (recipeId) => {
    window.location.href = `https://www.10000recipe.com/recipe/${recipeId}`;
  };

  return (
    <div>
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl mt-4 sticky top-0 bg-blue-100 flex items-center justify-center">
        <div>레시피 보기</div>
      </div>
      <div className="mt-8">
        {recipes.map((recipe, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
            <h3 className="text-2xl font-bold">
              <a
                href="#"
                onClick={() => handleClick(recipe['레시피일련번호'][0])}
              >
                {recipe['레시피제목'][0]}
              </a>
            </h3>
            <p className="text-lg">요리명: {recipe['요리명'][0]}</p>
            <p className="text-lg">요리방법: {recipe['요리방법별명'][0]}</p>
            <p className="text-lg">요리재료: {recipe['요리재료별명'][0]}</p>
            <p className="text-lg">요리소개: {recipe['요리소개'][0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowRecipes;
