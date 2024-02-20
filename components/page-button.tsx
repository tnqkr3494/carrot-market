import { maxPageState, nextPageState, pageState } from "@/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const renderPageButtons = (start, end, currentPage, onPageClick) => {
  const buttons = [];
  for (let i = start; i <= end; i++) {
    buttons.push(
      <button
        key={i}
        className={`h-10 w-10 rounded-md ${
          i === currentPage ? "bg-gray-500" : " bg-orange-500"
        }`}
        onClick={() => onPageClick(i)}
      >
        {i}
      </button>,
    );
  }
  return buttons;
};

const YourComponent = () => {
  const totalItems = 11;
  const itemsPerPage = 2;
  const itemsPerGroup = 5;

  const [currentPage, setCurrentPage] = useRecoilState(pageState);
  const nextPage = useRecoilValue(nextPageState);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const setMaxPage = useSetRecoilState(maxPageState);
  setMaxPage(Math.ceil(totalPages / itemsPerGroup));

  const onPageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationGroups = () => {
    const paginationGroups = [];
    for (let i = 1; i <= totalPages; i += itemsPerGroup) {
      const start = i;
      const end = Math.min(i + itemsPerGroup - 1, totalPages);
      paginationGroups.push(
        <div key={i} className="flex space-x-2">
          {renderPageButtons(start, end, currentPage, onPageClick)}
        </div>,
      );
    }
    return paginationGroups;
  };

  return (
    <div>
      {/* 페이지 버튼을 그룹화하여 보여줌 */}
      {renderPaginationGroups()[nextPage]}
    </div>
  );
};

export default YourComponent;
