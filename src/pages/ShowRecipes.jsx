import Sidebar from "../components/Sidebar";

const dummyRecipes = [
  {
    name: "레시피 1",
    url: "https://www.10000recipe.com/recipe/5754584",
    description: "레시피 1에 대한 설명",
  },
  {
    name: "레시피 2",
    url: "https://www.10000recipe.com/recipe/6830750",
    description: "레시피 2에 대한 설명",
  },
  {
    name: "레시피 3",
    url: "https://www.10000recipe.com/recipe/1776209",
    description: "레시피 3에 대한 설명",
  },
  {
    name: "레시피 4",
    url: "https://www.10000recipe.com/recipe/6738275",
    description: "레시피 4에 대한 설명",
  },
  {
    name: "레시피 5",
    url: "https://www.10000recipe.com/recipe/6796599",
    description: "레시피 5에 대한 설명",
  },
];

const ShowRecipes = () => {
  const handleClick = (url) => {
    window.location.href = url;
  };

  return (
    <div>
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl mt-4 sticky top-0 bg-blue-100 flex items-center justify-center relative">
        <div>레시피 보기</div>
      </div>
      {dummyRecipes.map((recipe, index) => (
        <div
          key={index}
          onClick={() => handleClick(recipe.url)}
          style={{ border: "3px solid" }}
        >
          <h3>{recipe.name}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ShowRecipes;
