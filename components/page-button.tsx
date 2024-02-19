import { pageState } from "@/atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const renderPageButtons = (start, end, currentPage, onPageClick) => {
  const buttons = [];
  for (let i = start; i <= end; i++) {
    buttons.push(
      <button
        key={i}
        className={`h-10 w-10 rounded-md bg-orange-500 ${
          i === currentPage ? "bg-gray-500" : ""
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
  const totalItems = 13;
  const itemsPerPage = 2;
  const itemsPerGroup = 5;

  const [currentPage, setCurrentPage] = useRecoilState(pageState);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    console.log("Current Page:", currentPage);
  }, [currentPage]);

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
      {renderPaginationGroups()}
    </div>
  );
};

export default YourComponent;
