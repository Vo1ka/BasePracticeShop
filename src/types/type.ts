export type Product = {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
    rating: number;
    brand: string;
    category: string;
    images?: string[];

    isModified?: boolean;
    isLocal?: boolean;
    isDeleted?: boolean;
  }

  export interface AdminProduct extends Product {
    isModified: boolean;
    isLocal: boolean;
    isDeleted: boolean;
  }