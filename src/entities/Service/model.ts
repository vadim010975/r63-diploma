export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface CardMovie {
  poster: string | undefined;
  title: string | undefined;
  year: string | undefined;
  genre: string | undefined;
  runtime: string | undefined;
  director: string | undefined;
  actors: string | undefined;
  imdbRating: string | undefined;
  response: "False" | "True";
}

export interface ProductCard {
  category: number;
  id: number;
  images: string[];
  price: number;
  title: string;
}

export interface ProductCategory {
  id: number;
  title: string;
}

export interface Product {
  category: number;
  color: string;
  heelSize: string;
  id: number;
  images: string[];
  manufacturer: string;
  material: string;
  price: number;
  reason: string;
  season: string;
  sizes: {
    size: string;
    available: boolean;
  }[];
  sku: string;
  title: string;
}

export interface ProductCart {
  id: number;
  title: string;
  price: number;
  size: string;
  count: number;
}

export interface Order {
  owner: {
    phone: string;
    address: string;
  };
  items: {
    id: number;
    price: number;
    count: number;
  }[];
}
