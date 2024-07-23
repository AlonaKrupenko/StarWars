"use client";
import HeroItem from "@/components/HeroItem/HeroItem";
import Loader from "@/components/Loader/Loader";
import Pagination from "@/components/Pagination/Pagination";
import { getHeroes } from "@/services/fetchData";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function heroesList() {
  const [heroList, setHeroList] = useState([]);
  const [heroesQuantity, setHeroesQuantity] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [heroesPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  //! make final page
  const handleNextClick = () => {
    if (currentPage < Math.ceil(heroesQuantity / heroesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const handlePageNumberClick = (num) => {
    setCurrentPage(num);
  };

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const data = await getHeroes(currentPage);
        setHeroList(data.results);
        setHeroesQuantity(data.count);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHeroes();
  }, [currentPage]);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      {heroList?.map((hero) => {
        return (
          <Link href={`heroesList/${hero.id}`} key={hero.id}>
            <HeroItem data={hero} />
          </Link>
        );
      })}

      <Pagination
        pages={Math.ceil(heroesQuantity / heroesPerPage)}
        currentPage={currentPage}
        onNextClick={handleNextClick}
        onPreviousClick={handlePreviousClick}
        onNumberClick={handlePageNumberClick}
      />
    </>
  );
}
