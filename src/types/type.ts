export type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images?: string[];
  }