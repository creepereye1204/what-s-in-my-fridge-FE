import { BrowserRouter, Route, Routes } from 'react-router-dom';

import {
  Home,
  MyFridge,
  ShowRecipes,
  Community,
  AddIngredients,
} from './pages';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/MyFridge" element={<MyFridge />}></Route>
        <Route path="/ShowRecipes" element={<ShowRecipes />}></Route>
        <Route path="/Community" element={<Community />}></Route>
        <Route path="/AddIngredients" element={<AddIngredients />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
