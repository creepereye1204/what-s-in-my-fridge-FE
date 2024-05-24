import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from 'axios';
import Sidebar from "../components/Sidebar";

const Community = () => {
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(true);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { pageNumber } = useParams();
  const navigate = useNavigate();

  const printFetchError = (error) => {
    alert("정보를 불러오는데 오류가 발생했습니다. " + error);
  };

  /*
  const getBoardList = async (page) => {
    try {
      const resp = await axios.get(`http://210.109.52.15/post/${page}`);
      setPostList(resp.data.data);
      setTotalPages(resp.data.totalPages);
    } catch (err) {
      printFetchError(err);
    }
  };
  */

  const getBoardList = (page) => {
    try {
      const dummyData = [
        { id: 1, title: "첫번째 게시물", contents: "첫번째 게시물 내용" },
        { id: 2, title: "두번째 게시물", contents: "두번째 게시물 내용" },
        { id: 3, title: "세번째 게시물", contents: "세번째 게시물 내용" },
        { id: 4, title: "네번째 게시물", contents: "네번째 게시물 내용" },
        { id: 5, title: "다섯번째 게시물", contents: "다섯번째 게시물 내용" },
        { id: 6, title: "여섯번째 게시물", contents: "여섯번째 게시물 내용" },
        { id: 7, title: "일곱번째 게시물", contents: "일곱번째 게시물 내용" },
        { id: 8, title: "여덟번째 게시물", contents: "여덟번째 게시물 내용" },
        { id: 9, title: "아홉번째 게시물", contents: "아홉번째 게시물 내용" },
        { id: 10, title: "열번째 게시물", contents: "열번째 게시물 내용" },
        { id: 11, title: "열한번째 게시물", contents: "열한번째 게시물 내용" },
        { id: 12, title: "열두번째 게시물", contents: "열두번째 게시물 내용" },
      ];

      const itemsPerPage = 10;
      const offset = (page - 1) * itemsPerPage;
      const paginatedData = dummyData.slice(offset, offset + itemsPerPage);

      setPostList(paginatedData);
      setTotalPages(Math.ceil(dummyData.length / itemsPerPage));
    } catch (err) {
      printFetchError(err);
    }
  };

  useEffect(() => {
    const pageNumberToFetch = pageNumber || currentPage;
    getBoardList(pageNumberToFetch);
  }, [pageNumber, currentPage]);

  useEffect(() => {
    setIsPreviousDisabled(currentPage <= 1);
    setIsNextDisabled(currentPage >= totalPages);
  }, [currentPage, totalPages]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="bg-blue-100 flex flex-col text-center relative min-h-screen">
      <Sidebar />
      <div className="Jua-font text-blue-900 text-4xl mt-4 sticky top-0 bg-blue-100 flex items-center justify-center relative">
        <div>커뮤니티</div>
        <button
          className="Jua-font text-blue-900 text-2xl absolute right-0 mr-4 border-2 rounded-1xl border-sky-900"
          onClick={() => {
            navigate("/Write");
          }}
        >
          글작성
        </button>
      </div>
      <div className="w-full">
        <div>
          <hr className="custom-hr-Community" />
        </div>
        <div className="w-full ">
          {postList.map((post) => (
            <li key={post.id} className="flex flex-col w-full text-left">
              <Link to={`/Post/${post.id}`}>
                <div className="w-full sm:w-64 overflow-hidden">
                  <span className="Jua-font text-blue-900 text-2xl">
                    {post.title}
                  </span>
                  <br></br>
                  <span className="Jua-font text-blue-900 text-1xl truncate block">
                    {post.contents}
                  </span>
                </div>
                <hr className="custom-hr-Community w-full" />
              </Link>
            </li>
          ))}
        </div>
        <div className="mb-4">
          <button
            className="font-bold"
            disabled={isPreviousDisabled}
            onClick={goToPreviousPage}
          >
            이전페이지
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="font-bold"
            disabled={isNextDisabled}
            onClick={goToNextPage}
          >
            다음페이지
          </button>
        </div>
      </div>
    </div>
  );
};

export default Community;
