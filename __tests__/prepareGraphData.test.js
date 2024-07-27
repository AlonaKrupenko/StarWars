import {
  createHeroNode,
  createFilmNodes,
  createShipNodes,
  createFilmEdges,
  createShipEdges,
  createGraphData,
} from "@/app/helpers/prepareGraphData";

describe("Graph Utils", () => {
  const hero = { id: 1, name: "Luke Skywalker" };
  const films = [
    { id: 1, title: "A New Hope", episode_id: 4, starships: [1, 2] },
    { id: 2, title: "The Empire Strikes Back", episode_id: 5, starships: [2] },
  ];
  const starships = [
    { id: 1, name: "X-wing" },
    { id: 2, name: "TIE Fighter" },
  ];

  describe("createHeroNode", () => {
    it("should create a hero node", () => {
      const node = createHeroNode(hero);
      expect(node).toEqual({
        id: "hero-1",
        type: "input",
        data: { label: "Luke Skywalker" },
        position: { x: 250, y: 0 },
      });
    });
  });

  describe("createFilmNodes", () => {
    it("should create film nodes", () => {
      const nodes = createFilmNodes(films);
      expect(nodes).toEqual([
        {
          id: "film-1",
          data: { label: "Film: A New Hope; Episode: 4" },
          position: { x: 0, y: 100 },
        },
        {
          id: "film-2",
          data: { label: "Film: The Empire Strikes Back; Episode: 5" },
          position: { x: 200, y: 100 },
        },
      ]);
    });
  });

  describe("createShipNodes", () => {
    it("should create starship nodes", () => {
      const nodes = createShipNodes(starships);
      expect(nodes).toEqual([
        {
          id: "ship-1",
          data: { label: "Starship: X-wing" },
          position: { x: 0, y: 300 },
        },
        {
          id: "ship-2",
          data: { label: "Starship: TIE Fighter" },
          position: { x: 200, y: 300 },
        },
      ]);
    });
  });

  describe("createFilmEdges", () => {
    it("should create edges between hero and films", () => {
      const edges = createFilmEdges(hero, films);
      expect(edges).toEqual([
        {
          id: "e-hero-1-film-1",
          source: "hero-1",
          target: "film-1",
          animated: true,
        },
        {
          id: "e-hero-1-film-2",
          source: "hero-1",
          target: "film-2",
          animated: true,
        },
      ]);
    });
  });

  describe("createShipEdges", () => {
    it("should create edges between films and starships", () => {
      const edges = createShipEdges(films, starships);
      expect(edges).toEqual([
        {
          id: "e-film-1-starship-1",
          source: "film-1",
          target: "ship-1",
          animated: true,
        },
        {
          id: "e-film-1-starship-2",
          source: "film-1",
          target: "ship-2",
          animated: true,
        },
        {
          id: "e-film-2-starship-2",
          source: "film-2",
          target: "ship-2",
          animated: true,
        },
      ]);
    });
  });

  describe("createGraphData", () => {
    it("should create nodes and edges for the graph", () => {
      const { nodes, edges } = createGraphData(hero, films, starships);
      expect(nodes).toEqual([
        {
          id: "hero-1",
          type: "input",
          data: { label: "Luke Skywalker" },
          position: { x: 250, y: 0 },
        },
        {
          id: "film-1",
          data: { label: "Film: A New Hope; Episode: 4" },
          position: { x: 0, y: 100 },
        },
        {
          id: "film-2",
          data: { label: "Film: The Empire Strikes Back; Episode: 5" },
          position: { x: 200, y: 100 },
        },
        {
          id: "ship-1",
          data: { label: "Starship: X-wing" },
          position: { x: 0, y: 300 },
        },
        {
          id: "ship-2",
          data: { label: "Starship: TIE Fighter" },
          position: { x: 200, y: 300 },
        },
      ]);

      expect(edges).toEqual([
        {
          id: "e-hero-1-film-1",
          source: "hero-1",
          target: "film-1",
          animated: true,
        },
        {
          id: "e-hero-1-film-2",
          source: "hero-1",
          target: "film-2",
          animated: true,
        },
        {
          id: "e-film-1-starship-1",
          source: "film-1",
          target: "ship-1",
          animated: true,
        },
        {
          id: "e-film-1-starship-2",
          source: "film-1",
          target: "ship-2",
          animated: true,
        },
        {
          id: "e-film-2-starship-2",
          source: "film-2",
          target: "ship-2",
          animated: true,
        },
      ]);
    });
  });
});
