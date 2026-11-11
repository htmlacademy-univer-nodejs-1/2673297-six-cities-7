import { CITIES } from './city.constants.js';

export type CityName = typeof CITIES[number]['name'];

export const CityName = Object.fromEntries(
  CITIES.map(({ name }) => [name, name])
) as Record<CityName, string>;
