import axios from "axios";

const API_URL = "https://restcountries.com/v3.1/all?fields=name,translations";

// Servicio que se encarga de obtener la lista de países desde la API de Rest Countries, transformando 
// los datos para mostrar el nombre del país en español si está disponible, o el nombre común en 
// caso contrario, y ordenando la lista alfabéticamente.
export const getCountries = async () => {
  const response = await axios.get(API_URL);
  return response.data.map(c => ({
    name: c.translation?.spa?.common || c.name.common
  })).sort((a, b) => a.name.localeCompare(b.name));
};