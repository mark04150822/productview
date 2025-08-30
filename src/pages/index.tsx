import Head from 'next/head';
import { useProduct } from '../hooks/useProduct';

export default function Home() {
  const { 
    filteredProducts, 
    categories, 
    loading, 
    error, 
    category, 
    minPrice, 
    maxPrice, 
    searchTerm, 
    inStock, 
    sortBy, 
    sortOrder, 
    setCategory, 
    setMinPrice, 
    setMaxPrice, 
    setSearchTerm, 
    setInStock, 
    setSortBy, 
    setSortOrder, 
    clearFilters, 
    refreshProducts 
  } = useProduct();

  // 處理載入狀態
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">載入中...</div>
      </div>
    );
  }

  // 處理錯誤狀態
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
        {/* 篩選器區域 */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-5">商品篩選</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* 搜尋框 */}
            <div className="flex flex-col">
              <label htmlFor="search" className="text-sm font-medium text-gray-600 mb-2">
                搜尋商品
              </label>
              <input
                id="search"
                type="text"
                placeholder="輸入商品名稱或描述..."
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
                  <option key={cat} value={cat}>{cat}</option>
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

            {/* 排序欄位 */}
            <div className="flex flex-col">
              <label htmlFor="sortBy" className="text-sm font-medium text-gray-600 mb-2">
                排序欄位
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'category')}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="name">名稱</option>
                <option value="price">價格</option>
                <option value="category">分類</option>
              </select>
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
          </div>

          {/* 清除篩選器按鈕 */}
          <button 
            onClick={clearFilters}
            className="bg-gray-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            清除篩選器
          </button>

          {/* 結果統計 */}
          <p className="text-sm text-gray-500 text-center mt-4">
            顯示 {filteredProducts.length} 個商品
          </p>
        </section>

        {/* 商品展示區域 */}
        <section className="mt-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">沒有找到符合條件的商品</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
                  <div className="w-full h-48 overflow-hidden">
                    <img
                      src="/img/product-placeholder-512.png"
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                        {product.category}
                      </span>
                      <span className="text-red-600 font-semibold text-lg">
                        NT$ {product.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      庫存: {product.inStock ? '有庫存' : '無庫存'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
