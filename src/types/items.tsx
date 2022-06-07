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

export type CategoryDetails = {
  id: number;
  url: string;
  categoryTitle: string;
};

export type ItemsResponse = {
  config: any;
  data: Items[];
  headers: any;
  request: any;
  status: number;
  statusText: string;
};

export type ErrorResponse = {
  code: string;
  config: any;
  message: string;
  name: string;
  request: any;
  response: any;
};
