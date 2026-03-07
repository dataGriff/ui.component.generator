import defaultBrand from './defaultBrand';
import darkBrand from './darkBrand';
import neonBrand from './neonBrand';
import minimalBrand from './minimalBrand';

export const brands = [defaultBrand, darkBrand, neonBrand, minimalBrand];

export const getBrandById = (id) => brands.find((b) => b.id === id) || defaultBrand;

export { defaultBrand, darkBrand, neonBrand, minimalBrand };
