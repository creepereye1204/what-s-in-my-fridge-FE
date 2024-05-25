import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MyFridge = () => {
  const [ingredients, setIngredients] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get("http://210.109.52.15/get");
      if (response.status === 200) {
        const serverData = response.data;

        const today = new Date();
        const newData = serverData.map((item) => {
          const expireDate = new Date(item.expireDate);
          const diffTime = expireDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return {
            ...item,
            dDay: diffDays,
          };
        });

        setIngredients(newData);
      }
    } catch (e) {
      alert("서버와 연결되지 않았습니다.");
      console.log("데이터 불러오기 오류 => " + e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-blue-100 flex flex-col items-center font-sans text-center relative min-h-screen">
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl mt-4 sticky top-0 bg-blue-100 flex items-center justify-center relative">
        <div>냉장고 보기</div>
      </div>
      <div className="w-full flex justify-center">
        <hr className="custom-hr w-full" />
      </div>
      <div className="Jua-font flex fixed right-0 top-0 p-4 space-x-4 bg-blue-100">
        <div
          className="Jua-font border-2 border-sky-900 bg-blue-200 p-1 rounded-2xl select-none"
          onClick={() => navigate("/AddIngredients")}
        >
          재료추가
        </div>
        <div
          className="Jua-font border-2 border-sky-900 bg-blue-200 p-1 rounded-2xl select-none"
          onClick={() => navigate("/EditIngredients")}
        >
          재료수정
        </div>
      </div>

      <div>
        {ingredients.map((data) => (
          <div className="Jua-font mb-4" key={data.id}>
            <img src={`/images/${data.ingredient}.png`} alt={data.ingredient} />
            {data.ingredient} {data.count} (
            {data.ingredient === "고기" ? "g" : "개"})
            {data.storeMethod === "냉동" ? "냉동보관" : "냉장보관"}, D-
            {data.dDay}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyFridge;
