import axios from "axios";

/* Formato de la respuesta de la API de Rest Countries, con los campos que se están solicitando.
{
  "name": {
    "common": "Country Name",
    "official": "Official Country Name",
    "nativeName": {
      "spa": {
        "official": "Oficial Country Name in Spanish",
        "common": "Country Name in Spanish"
      },
      "eng": {..}
    },
    "translations": {
      "ara": {
        "official": "جمهورية زيمبابوي",
        "common": "زيمبابوي"
      },
      "bre": {...}
    }
  },
  "flags": {
    "png": "url_png",
    "svg": "url_svg",
    "alt": "Flag of Country Name"
  }
}
*/
const API_URL = "https://restcountries.com/v3.1/all?fields=name,flags,translations";


// Servicio que se encarga de obtener la lista de países desde la API de Rest Countries.
export const getCountries = async () => {
  const response = await axios.get(API_URL); // Se realiza la petición a la API para obtener los datos de los países.
  return response.data.map(c => ({
    name: c.translation?.spa?.common || c.name.common // Se obtiene nombre en español, si no el común.
  })).sort((a, b) => a.name.localeCompare(b.name)); // Se ordena alfabéticamente por nombre todos los paises.
  /**
   * array.sort(compareFn)
   * < 0: a se ordena antes que b
   * > 0: b se ordena antes que a
   * = 0: no cambia el orden relativo de a y b
   * a.name.localeCompare(b.name) 
   * Compara dos strigns respetando las reglas del idioma local.
   * Retorna tres valores: (-1, 0, 1) dependiendo de si a es menor, igual o mayor que b.
   */
};