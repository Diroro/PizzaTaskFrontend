// NEXT MOVE TO productService

import {Product, ProductType} from '../domain/product.domain';
import {apiClient} from './api';

export const PRODUCTS_URLS = {
  products: '/products',
};

const getProducts = (type?: ProductType): Promise<Product[]> => {
  return apiClient.get<Product[]>({url: PRODUCTS_URLS.products});
};

export const productsApi = {
  getProducts,
};
