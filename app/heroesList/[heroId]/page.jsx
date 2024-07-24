"use client";
import { useEffect, useMemo, useState } from "react";
import "@xyflow/react/dist/style.css";
import HeroGraph from "@/components/HeroGraph/HeroGraph";
import Loader from "@/components/Loader/Loader";
import { getHero, getFilms, getStarships } from "@/services/fetchData";
import {
  createFilmEdges,
  createFilmNodes,
  createHeroNode,
  createShipEdges,
  createShipNodes,
} from "@/helpers/prepareGraphData";

const HeroPage = ({ params }) => {
  const [heroData, setHeroData] = useState(null);
  const [filmsData, setFilmsData] = useState([]);
  const [shipsData, setShipsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const hero = await getHero(params.heroId);
        const films = await getFilms(hero.films);
        const starships = await getStarships(hero.starships);

        setHeroData(hero);
        setFilmsData(films);
        setShipsData(starships);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, [params.heroId]);

  const { nodes, edges } = useMemo(() => {
    if (!heroData) return { nodes: [], edges: [] };

    const heroNode = createHeroNode(heroData);
    const filmNodes = createFilmNodes(filmsData);
    const shipNodes = createShipNodes(shipsData);
    const filmEdges = createFilmEdges(heroData, filmsData);
    const shipEdges = createShipEdges(filmsData, shipsData);

    return {
      nodes: [heroNode, ...filmNodes, ...shipNodes],
      edges: [...filmEdges, ...shipEdges],
    };
  }, [heroData, filmsData, shipsData]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <h3 className="text-xl my-4">{`Hero name: ${heroData?.name}`}</h3>
      <div style={{ height: "80%", width: "100%" }}>
        {<HeroGraph nodes={nodes} edges={edges} />}
      </div>
    </div>
  );
};

export default HeroPage;
