import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { DisplayMode } from '../types';
import { ProductList, ProductCard, LoadingProgress } from '../components';

export default function Home() {
  const {
    products, filteredProducts, currentProducts, categories, loading, error,
    category, minPrice, maxPrice, searchTerm, inStock, sortOrder,
    currentPage, itemsPerPage, hasMore, totalCount,
    setCategory, setMinPrice, setMaxPrice, setSearchTerm, setInStock, setSortOrder,
    clearFilters, refreshProducts, loadMore,
  } = useProduct();

  // 無限滾動 hook
  const loadingRef = useInfiniteScroll({
    onLoadMore: loadMore,
    hasMore,
    loading,
  });

  // 顯示模式狀態 - 桌機版預設為列表，手機版預設為卡片
  const [displayMode, setDisplayMode] = useState<DisplayMode>('list');

  // 根據螢幕尺寸設定預設顯示模式
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setDisplayMode('list');
      } else {
        setDisplayMode('card');
      }
    };

    // 初始化
    handleResize();

    // 監聽視窗大小變更
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 切換顯示模式
  const toggleDisplayMode = () => {
    setDisplayMode((prev: DisplayMode) => prev === 'card' ? 'list' : 'card');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">載入中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">錯誤: {error}</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>商品展示 - ProductView</title>
        <meta name="description" content="商品展示網站" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto p-5 min-h-screen bg-gray-50">
        {/* 頁面導航 */}
        <section className="mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">商品展示網站</h1>
            <div className="flex items-center space-x-4">
              {/* 顯示模式切換按鈕 */}
              <button
                onClick={toggleDisplayMode}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <span>{displayMode === 'card' ? '📋' : '🃏'}</span>
                <span>{displayMode === 'card' ? '列表模式' : '卡片模式'}</span>
              </button>
              <a 
                href="/products" 
                className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
              >
                進階篩選頁面
              </a>
            </div>
          </div>
        </section>

        {/* 篩選器區域 */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">商品篩選</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* 搜尋框 */}
            <div className="flex flex-col">
              <label htmlFor="searchTerm" className="text-sm font-medium text-gray-600 mb-2">
                搜尋商品
              </label>
              <input
                id="searchTerm"
                type="text"
                placeholder="輸入商品名稱..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            {/* 分類篩選 */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm font-medium text-gray-600 mb-2">
                商品分類
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">所有分類</option>
                {(categories as string[]).map((cat: string) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* 價格範圍 */}
            <div className="flex flex-col">
              <label htmlFor="minPrice" className="text-sm font-medium text-gray-600 mb-2">
                最低價格
              </label>
              <input
                id="minPrice"
                type="number"
                min="0"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="maxPrice" className="text-sm font-medium text-gray-600 mb-2">
                最高價格
              </label>
              <input
                id="maxPrice"
                type="number"
                min="0"
                placeholder="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* 額外篩選選項 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {/* 庫存篩選 */}
            <div className="flex items-center">
              <input
                id="inStock"
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="inStock" className="ml-2 text-sm font-medium text-gray-600">
                只顯示有庫存
              </label>
            </div>

            {/* 排序方向 */}
            <div className="flex flex-col">
              <label htmlFor="sortOrder" className="text-sm font-medium text-gray-600 mb-2">
                排序方向
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="asc">升序</option>
                <option value="desc">降序</option>
              </select>
            </div>

            {/* 操作按鈕 */}
            <div className="flex items-end space-x-2">
              <button 
                onClick={clearFilters}
                className="bg-gray-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-gray-600 transition-colors"
              >
                清除篩選器
              </button>
              <button 
                onClick={refreshProducts}
                className="bg-blue-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-blue-600 transition-colors"
              >
                重新整理
              </button>
            </div>
          </div>

          {/* 結果統計 */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              顯示 {currentProducts.length} 個商品，共 {filteredProducts.length} 筆資料
            </p>
            {hasMore && (
              <p className="text-xs text-blue-500 mt-1">
                還有 {filteredProducts.length - currentProducts.length} 筆商品待載入
              </p>
            )}
          </div>
        </section>

        {/* 商品展示區域 */}
        <section className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">沒有找到符合條件的商品</p>
            </div>
          ) : (
            <>
              {/* 卡片顯示模式 */}
              {displayMode === 'card' && (
                <>
                  <ProductCard products={currentProducts} />
                  <LoadingProgress
                    current={currentProducts.length}
                    total={totalCount}
                    onLoadMore={loadMore}
                    hasMore={hasMore}
                    loading={loading}
                  />
                </>
              )}

              {/* 列表顯示模式 */}
              {displayMode === 'list' && (
                <>
                  <ProductList products={currentProducts} />
                  {/* 無限滾動觸發點 */}
                  {hasMore && (
                    <div ref={loadingRef} className="h-10 flex items-center justify-center">
                      {loading ? (
                        <div className="text-blue-600">載入中...</div>
                      ) : (
                        <div className="text-gray-400">滾動到底部載入更多</div>
                      )}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
}
