import Community from './Community';
import MyFridge from './MyFridge';
import ShowRecipes from './ShowRecipes';

const Home = () => {
  return (
    <div>
      <MyFridge />
      <ShowRecipes />
      <Community />
    </div>
  );
};

export default Home;
