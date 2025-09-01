import { useState, useEffect, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts } from '../actions/productAction';
import { Product } from '../types';

export const useProduct = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(state => state.productState);
  
  // 篩選條件狀態 - 每個條件獨立管理
  const [category, setCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inStock, setInStock] = useState<boolean>(true);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20);
  const [hasMore, setHasMore] = useState<boolean>(true);

  // 篩選後的商品狀態
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // 組件載入時取得商品資料
  useEffect(() => {
    // 如果已經有資料，就不重複呼叫 API
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, [dispatch, products.length]);

  // 當商品資料或篩選條件變更時，重新計算篩選結果
  useEffect(() => {
    let filtered = [...products];

    // 搜尋篩選 - 只搜尋商品名稱
    if (searchTerm) {
      filtered = filtered.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 分類篩選
    if (category) {
      filtered = filtered.filter((product: Product) => product.category === category);
    }

    // 價格範圍篩選
    filtered = filtered.filter((product: Product) =>
      product.price >= minPrice && product.price <= maxPrice
    );

    // 庫存篩選
    if (inStock) {
      filtered = filtered.filter((product: Product) => product.inStock === true);
    }

    // 排序
    filtered.sort((a: Product, b: Product) => {
      let aValue = a.price;
      let bValue = b.price;
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    // 更新篩選後的商品狀態
    setFilteredProducts(filtered);
    
    // 重置分頁狀態
    setCurrentPage(1);
    setHasMore(filtered.length > itemsPerPage);
  }, [products, category, minPrice, maxPrice, searchTerm, inStock, sortOrder, itemsPerPage]);

  // 取得當前頁面顯示的商品
  const currentProducts = useMemo(() => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // 加載更多商品
  const loadMore = useCallback(() => {
    if (hasMore) {
      setCurrentPage(prev => prev + 1);
      setHasMore(currentProducts.length + itemsPerPage < filteredProducts.length);
    }
  }, [hasMore, currentProducts.length, itemsPerPage, filteredProducts.length]);

  // 檢查是否還有更多商品
  useEffect(() => {
    setHasMore(currentProducts.length < filteredProducts.length);
  }, [currentProducts.length, filteredProducts.length]);

  // 取得所有分類
  const categories = useMemo(() => {
    return [...new Set(products.map((product: Product) => product.category))];
  }, [products]);

  // 清除篩選條件
  const clearFilters = () => {
    setCategory('');
    setMinPrice(0);
    setMaxPrice(10000);
    setSearchTerm('');
    setInStock(true);
    setSortOrder('asc');
    setCurrentPage(1);
  };

  // 重新取得商品資料
  const refreshProducts = () => {
    dispatch(getProducts());
    setCurrentPage(1);
  };

  return {
    // 資料
    products,
    filteredProducts,
    currentProducts,
    categories,
    loading,
    error,
    
    // 分頁狀態
    currentPage,
    itemsPerPage,
    hasMore,
    totalCount: filteredProducts.length,
    
    // 篩選條件狀態
    category,
    minPrice,
    maxPrice,
    searchTerm,
    inStock,
    sortOrder,
    
    // 篩選條件設定方法
    setCategory,
    setMinPrice,
    setMaxPrice,
    setSearchTerm,
    setInStock,
    setSortOrder,
    
    // 分頁方法
    loadMore,
    
    // 其他方法
    clearFilters,
    refreshProducts,
  };
};

export default useProduct;
