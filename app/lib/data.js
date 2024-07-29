import axios from "axios";

const API_URL = "https://sw-api.starnavi.io";

/**
 * Fetches a list of heroes from the API.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<Object>} The response data containing the list of heroes.
 * @throws Will throw an error if the request fails.
 */
export const fetchHeroesList = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/people/?page=${page}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching heroes list:", error);
  }
};

/**
 * Fetches a specific hero by ID from the API.
 * @param {number} heroId - The ID of the hero to fetch.
 * @returns {Promise<Object>} The response data containing the hero information.
 * @throws Will throw an error if the request fails.
 */
export const fetchHero = async (heroId) => {
  try {
    const response = await axios.get(`${API_URL}/people/${heroId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching hero:", error);
  }
};

/**
 * Fetches films by their IDs from the API.
 * @param {number[]} filmIds - An array of film IDs to fetch.
 * @returns {Promise<Object[]>} The response data containing the list of films.
 * @throws Will throw an error if the request fails.
 */
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

/**
 * Fetches starships by their IDs from the API.
 * @param {number[]} starshipIds - An array of starship IDs to fetch.
 * @returns {Promise<Object[]>} The response data containing the list of starships.
 * @throws Will throw an error if the request fails.
 */
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

/**
 * Fetches graph data by fetching films and starships in parallel.
 * @param {number[]} filmIds - An array of film IDs to fetch.
 * @param {number[]} starshipIds - An array of starship IDs to fetch.
 * @returns {Promise<Object>} An object containing the films and starships.
 * @throws Will throw an error if the request fails.
 */
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
