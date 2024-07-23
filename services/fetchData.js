import axios from "axios";

const API_URL = "https://sw-api.starnavi.io";

export const getHeroes = async (page) => {
  try {
    const response = await axios.get(`${API_URL}/people/?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching heroes:", error);
    throw error;
  }
};

export const getHero = async (heroId) => {
  try {
    const response = await axios.get(`${API_URL}/people/${heroId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hero:", error);
    throw error;
  }
};

export const getFilms = async (filmIds) => {
  try {
    const response = await axios.get(
      `${API_URL}/films/?id__in=${filmIds.join(",")}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching films:", error);
    throw error;
  }
};

export const getStarships = async (starshipIds) => {
  try {
    const response = await axios.get(
      `${API_URL}/starships/?id__in=${starshipIds.join(",")}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching starships:", error);
    throw error;
  }
};
