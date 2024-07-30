// Constant defining the horizontal gap between nodes in the graph
const HORIZONTAL_GAP = 200;

/**
 * Creates a hero node for the graph.
 * @param {Object} hero - The hero object containing id and name.
 * @param {number} hero.id - The unique identifier for the hero.
 * @param {string} hero.name - The name of the hero.
 * @returns {Object} The node data for the hero, including its id, type, label, and position.
 */
export const createHeroNode = (hero) => {
  return {
    id: `hero-${hero.id}`,
    type: "input",
    data: { label: hero.name },
    position: { x: 250, y: 0 },
  };
};

/**
 * Creates film nodes for the graph.
 * @param {Array} films - Array of film objects to be converted into nodes.
 * @param {Object} film - Each film object containing id, title, and episode_id.
 * @param {number} film.id - The unique identifier for the film.
 * @param {string} film.title - The title of the film.
 * @param {number} film.episode_id - The episode number of the film.
 * @returns {Array} An array of film node objects, each with id, label, and position.
 */
export const createFilmNodes = (films) =>
  films.map((film, index) => ({
    id: `film-${film.id}`,
    data: { label: `Film: ${film.title}; Episode: ${film.episode_id}` },
    position: { x: HORIZONTAL_GAP * index, y: 100 },
  }));

/**
 * Creates starship nodes for the graph.
 * @param {Array} starships - Array of starship objects to be converted into nodes.
 * @param {Object} starship - Each starship object containing id and name.
 * @param {number} starship.id - The unique identifier for the starship.
 * @param {string} starship.name - The name of the starship.
 * @returns {Array} An array of starship node objects, each with id, label, and position.
 */
export const createShipNodes = (starships) =>
  starships.map((starship, index) => ({
    id: `ship-${starship.id}`,
    data: { label: `Starship: ${starship.name}` },
    position: { x: HORIZONTAL_GAP * index, y: 300 },
  }));

/**
 * Creates edges connecting a hero node to film nodes.
 * @param {Object} hero - The hero object containing id.
 * @param {Array} films - Array of film objects to connect with the hero.
 * @param {Object} film - Each film object containing id.
 * @param {number} film.id - The unique identifier for the film.
 * @returns {Array} An array of edge objects connecting the hero to each film, with animated lines.
 */
export const createFilmEdges = (hero, films) =>
  films.map((film) => ({
    id: `e-hero-${hero.id}-film-${film.id}`,
    source: `hero-${hero.id}`,
    target: `film-${film.id}`,
    animated: true,
  }));

/**
 * Creates edges connecting film nodes to starship nodes.
 * @param {Array} films - Array of film objects containing starship references.
 * @param {Array} starships - Array of starship objects.
 * @param {Object} film - Each film object containing starship ids.
 * @param {Array} film.starships - Array of starship ids associated with the film.
 * @param {Object} starship - Each starship object containing id.
 * @param {number} starship.id - The unique identifier for the starship.
 * @returns {Array} An array of edge objects connecting films to starships, with animated lines.
 */
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

/**
 * Combines the creation of nodes and edges into a single graph data structure.
 * @param {Object} hero - The hero object to be added as a node.
 * @param {Array} films - Array of film objects to be added as nodes.
 * @param {Array} starships - Array of starship objects to be added as nodes.
 * @returns {Object} An object containing the combined nodes and edges for the graph.
 */
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
