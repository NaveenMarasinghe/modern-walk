export type Items = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export interface ICategoryDetails {
  id: number;
  url?: string;
  category?: string;
}
