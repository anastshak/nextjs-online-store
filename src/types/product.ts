export interface Category {
  slug: string;
  name: string;
  url: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
  discountPercentage: number;
  category: string;
  description: string;
  stock: number;
  brand: string;
  images: string[];
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsRequestResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
