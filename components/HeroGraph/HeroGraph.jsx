import React, { useState, useEffect } from "react";
import { ReactFlow, Controls, Background } from "@xyflow/react";

const horizontalGap = 200;

const HeroGraph = ({ hero, films, starships }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (hero) {
      const heroNode = {
        id: `hero-${hero.id}`,
        type: "input",
        data: { label: hero.name },
        position: { x: 250, y: 0 },
      };

      const filmNodes = films.map((film, index) => {
        return {
          id: `film-${film.id}`,
          data: { label: `Film: ${film.title}; Episode: ${film.episode_id}` },
          position: { x: horizontalGap * index, y: 100 },
        };
      });

      const shipNodes = starships.map((starship, index) => {
        return {
          id: `ship-${starship.id}`,
          data: { label: `starship: ${starship.name}` },
          position: { x: horizontalGap * index, y: 300 },
        };
      });

      const filmEdges = films.map((film) => {
        return {
          id: `e-hero-${hero.id}-film-${film.id}`,
          source: `hero-${hero.id}`,
          target: `film-${film.id}`,
          animated: true,
        };
      });

      //!flatMap??? for removing undefined in case of not existing links
      const shipsEdges = films.flatMap((film) => {
        const edges = [];
        for (let starship of starships) {
          if (film.starships.includes(starship.id)) {
            edges.push({
              id: `e-film-${film.id}-starship-${starship.id}`,
              source: `film-${film.id}`,
              target: `ship-${starship.id}`,
              animated: true,
            });
          }
        }

        return edges;
      });

      setNodes([heroNode, ...filmNodes, ...shipNodes]);
      setEdges([...filmEdges, ...shipsEdges]);
    }
  }, [hero, starships, films]);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow nodes={nodes} edges={edges}>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default HeroGraph;
