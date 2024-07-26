const HORIZONTAL_GAP = 200;

// Helper function to create hero node
export const createHeroNode = (hero) => {
  return {
    id: `hero-${hero.id}`,
    type: "input",
    data: { label: hero.name },
    position: { x: 250, y: 0 },
  };
};

// Helper function to create film nodes
export const createFilmNodes = (films) =>
  films.map((film, index) => ({
    id: `film-${film.id}`,
    data: { label: `Film: ${film.title}; Episode: ${film.episode_id}` },
    position: { x: HORIZONTAL_GAP * index, y: 100 },
  }));

// Helper function to create starship nodes
export const createShipNodes = (starships) =>
  starships.map((starship, index) => ({
    id: `ship-${starship.id}`,
    data: { label: `Starship: ${starship.name}` },
    position: { x: HORIZONTAL_GAP * index, y: 300 },
  }));

export const createNodes = () => {};

// Helper function to create edges between hero and films
export const createFilmEdges = (hero, films) =>
  films.map((film) => ({
    id: `e-hero-${hero.id}-film-${film.id}`,
    source: `hero-${hero.id}`,
    target: `film-${film.id}`,
    animated: true,
  }));

// Helper function to create edges between films and starships
export const createShipEdges = (films, starships) =>
  films.flatMap((film) =>
    starships
      .filter((starship) => film.starships.includes(starship.id))
      .map((starship) => ({
        id: `e-film-${film.id}-starship-${starship.id}`,
        source: `film-${film.id}`,
        target: `ship-${starship.id}`,
        animated: true,
      }))
  );

// Combined function to create nodes and edges
export const createGraphData = (hero, films, starships) => {
  const heroNode = createHeroNode(hero);
  const filmNodes = createFilmNodes(films);
  const starshipNodes = createShipNodes(starships);

  const filmEdges = createFilmEdges(hero, films);
  const shipEdges = createShipEdges(films, starships);

  const nodes = [heroNode, ...filmNodes, ...starshipNodes];
  const edges = [...filmEdges, ...shipEdges];

  return { nodes, edges };
};
