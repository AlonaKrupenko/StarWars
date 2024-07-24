"use client";
import HeroItem from "@/components/HeroItem/HeroItem";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import { getHeroes } from "@/services/fetchData";
import Link from "next/link";
import { useEffect, useState } from "react";

const HeroesList = () => {
  const [fullData, setFullData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [heroesPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const handleNextClick = () => {
    if (fullData.next) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (fullData.previous) setCurrentPage(currentPage - 1);
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await getHeroes(currentPage);
        setFullData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroes();
  }, [currentPage]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="h-[90vh] overflow-auto">
      <ul className="my-4 list-none">
        {fullData.results?.map((hero) => {
          return (
            <li className="my-1 first:mt-0 last:mb-0" key={hero.id}>
              <Link href={`heroesList/${hero.id}`}>
                <HeroItem data={hero} />
              </Link>
            </li>
          );
        })}
      </ul>

      <Pagination
        pages={Math.ceil(fullData.count / heroesPerPage)}
        currentPage={currentPage}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        onNumberClick={handlePageNumberClick}
      />
    </div>
  );
};

HeroesList.displayName = "HeroesList";

export default HeroesList;
