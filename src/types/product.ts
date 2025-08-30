// 商品介面定義
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

// 篩選器介面
export interface FilterOptions {
  category: string;
  minPrice: number;
  maxPrice: number;
  searchTerm: string;
  inStock: boolean;
  sortBy: 'name' | 'price' | 'category';
  sortOrder: 'asc' | 'desc';
}

// API 回應類型
export type ApiResponse = Product[];

// 篩選器變更事件類型
export type FilterChangeKey = keyof FilterOptions;
export type FilterChangeValue = string | number;
