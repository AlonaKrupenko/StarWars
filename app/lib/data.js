import axios from "axios";

const API_URL = "https://sw-api.starnavi.io";

export const fetchHeroesList = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/people/?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching heroes list:", error);
  }
};

export const fetchHero = async (heroId) => {
  try {
    const response = await axios.get(`${API_URL}/people/${heroId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching hero:", error);
  }
};

export const fetchFilms = async (filmIds) => {
  try {
    const response = await axios.get(
      `${API_URL}/films/?id__in=${filmIds.join(",")}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching films", error);
    throw new Error("Error fetching films:", error);
  }
};

export const fetchStarships = async (starshipIds) => {
  try {
    const response = await axios.get(
      `${API_URL}/starships/?id__in=${starshipIds.join(",")}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching starships", error);
    throw new Error("Error fetching starships:", error);
  }
};

export const fetchGraphData = async (filmIds, starshipIds) => {
  try {
    const [films, starships] = await Promise.all([
      fetchFilms(filmIds),
      fetchStarships(starshipIds),
    ]);
    return { films, starships };
  } catch (error) {
    console.error("Error fetching graph data:", error.message);
    throw new Error("Error fetching graph data:", error);
  }
};
