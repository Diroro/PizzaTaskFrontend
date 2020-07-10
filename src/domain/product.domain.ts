export type Product = Pizza | Pasta;

export type CommonProduct<T extends ProductType> = {
  type: T;
  id: number;
  name: string;
  description: string;
  image: string;
  priceEUR: number;
};

export enum ProductType {
  pizza = 'pizza',
  pasta = 'pasta',
}

export interface Pizza extends CommonProduct<ProductType.pizza> {}

export interface Pasta extends CommonProduct<ProductType.pasta> {}
