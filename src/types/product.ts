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

// 顯示模式類型
export type DisplayMode = 'card' | 'list';

// ===== Products 頁面相關類型 =====

// 篩選條件介面
export interface ProductFilters {
  keyword: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  inStock: number;
  sortBy: string;
  productNum: number;
}

// 本地篩選狀態介面 (包含 pageNow)
export interface LocalFilters extends ProductFilters {
  pageNow: number;
}

// 分頁回應介面
export interface PaginatedResponse {
  items: Product[];
  pageCount: number;
  productCount: number;
  pageNow: number;
}

// Products 頁面 Props 介面
export interface ProductsPageProps {
  items: Product[];
  pageCount: number;
  productCount: number;
  pageNow: number;
  filters: ProductFilters;
}

// API 篩選查詢參數介面 (Next.js query 參數都是 string 類型)
export interface FilterQuery {
  keyword?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  inStock?: string;
  sortBy?: string;
  pageNow?: string;
  productNum?: string;
}

// 篩選 API 回應介面
export interface FilteredResponse {
  items: Product[];
  pageCount: number;
  productCount: number;
  pageNow: number;
}
