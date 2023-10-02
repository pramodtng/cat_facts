"use client"
import CatComponents from '@/components/CatComponents';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useState, useEffect } from 'react';
import SkeletonCard from '@/components/skeletonCard';

async function getFactsByPagination(page) {
  const url = `https://catfact.ninja/facts?page=${page}`;
  const data = await fetch(url);
  return data.json();
}


const Home = () => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    const fetchData = async () => {
      const data = await getFactsByPagination(currentPage);
      setFacts(data.data);
      setTotalEntries(data.total);
      setIsLoading(false)
    };

    fetchData();
  }, [currentPage, isLoading]);

  const totalPages = Math.ceil(totalEntries / itemsPerPage);

  const handlePageChange = async (page, event) => {
    event.preventDefault();
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  const renderPaginationLinks = () => {
    const maxPagesToShow = 5;

    const links = [];

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(
          <a
            href="#"
            key={i}
            onClick={(event) => handlePageChange(i, event)}
            className={`px-4 py-2 rounded ${i === currentPage ? 'bg-gray-200 text-gray-900 font-medium' : 'hover:bg-gray-100'}`}
          >
            {i}
          </a>
        );
      }
    } else {
      // Display limited pages around the current page with ellipsis
      const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        links.push(<span key={1}>1</span>);
        if (startPage > 2) {
          links.push(<span key="ellipsis-start">...</span>);
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        links.push(
          <a
            href="#"
            key={i}
            onClick={(event) => handlePageChange(i, event)}
            className={`px-4 py-2 rounded ${i === currentPage ? 'bg-gray-200 text-gray-900 font-medium' : 'hover:bg-gray-100'}`}
          >
            {i}
          </a>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          links.push(<span key="ellipsis-end">...</span>);
        }
        links.push(<span key={totalPages}>{totalPages}</span>);
      }
    }

    return links;
  };


  let cards = Array(10).fill(0);
  return (
    <div className="max-w-full h-screen">
      {
        isLoading ? (
          <div className='container max-w-6xl mx-auto px-2 py-36 relative z-10'>
            <div className="row">
              <p className="text-2xl text-black pb-4">Cat Facts</p>
              <p>Collections of some of the cat facts</p>
              {cards.map((idx) => <SkeletonCard key={idx} />)}
            </div>
          </div>
        ) : (
          <CatComponents result={facts} currentPage={currentPage} renderPaginationLinks={renderPaginationLinks} />
        )
      }
    </div>
  );
};

export default Home;
