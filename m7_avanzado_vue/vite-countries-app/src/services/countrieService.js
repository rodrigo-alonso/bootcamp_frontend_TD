import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,translationes,region,coatOfArms,cca3'

// Función para obtener la lista de países desde la API
export const getCountries = async () => {
  const { data } = await axios.get(API_URL); // Desestructuramos la respuesta para obtener solo los datos
  return data; // Devolvemos los datos obtenidos
}