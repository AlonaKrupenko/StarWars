"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import "@xyflow/react/dist/style.css";
import HeroGraph from "@/components/HeroGraph/HeroGraph";
import Loader from "@/components/Loader/Loader";
import ErrorPage from "next/error";
import { getHero, getFilms, getStarships } from "@/services/fetchData";

const HeroPage = ({ params }) => {
  const [heroData, setHeroData] = useState(null);
  const [filmsData, setFilmsData] = useState([]);
  const [shipsData, setShipsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const hero = await getHero(params.heroId);
        const films = await getFilms(hero.films);
        const starships = await getStarships(hero.starships);

        setHeroData(hero);
        setFilmsData(films);
        setShipsData(starships);
        setIsLoading(false);
      } catch (error) {
        console.log(error, "Error");
      }
    };

    fetchHeroData();
  }, [params.heroId]);

  return isLoading ? (
    <Loader />
  ) : (
    <div style={{ height: "100vh", width: "100%" }}>
      <h3 className="text-xl my-4">{`Hero name: ${heroData?.name}`}</h3>
      <div style={{ height: "80%", width: "100%" }}>
        <HeroGraph hero={heroData} films={filmsData} starships={shipsData} />
      </div>
    </div>
  );
};

export default HeroPage;
