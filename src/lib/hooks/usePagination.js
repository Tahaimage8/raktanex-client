"use client";

import { useState } from "react";

// Reusable pagination logic - same behavior as the one used in MyDonationRequestsPage,
// just pulled out so any table/list can use it without copy-pasting the logic.
export const usePagination = (items, itemsPerPage = 5) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentItems = items.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPaginationItems = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    const firstPages = [1, 2, 3];
    const lastPages = [totalPages - 2, totalPages - 1, totalPages];

    let middlePages = [];

    if (currentPage > 3 && currentPage < totalPages - 2) {
      middlePages = [currentPage - 1, currentPage, currentPage + 1];
    }

    const allPages = [...firstPages, ...middlePages, ...lastPages];

    const uniquePages = [...new Set(allPages)]
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);

    for (let i = 0; i < uniquePages.length; i++) {
      const currentItem = uniquePages[i];
      const previousItem = uniquePages[i - 1];

      if (i > 0 && currentItem - previousItem > 1) {
        pages.push("...");
      }

      pages.push(currentItem);
    }

    return pages;
  };

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    handlePreviousPage,
    handleNextPage,
    getPaginationItems,
  };
};
