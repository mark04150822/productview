import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { 
  Product, 
  ProductsPageProps, 
  LocalFilters, 
  FilterQuery, 
  FilteredResponse,
  DisplayMode
} from '../types';

const ProductsPage: NextPage<ProductsPageProps> = ({ 
  items, 
  pageCount, 
  productCount, 
  pageNow, 
  filters 
}) => {
  const router = useRouter();
  
  // 篩選狀態 - 包含 pageNow
  const [localFilters, setLocalFilters] = useState<LocalFilters>({
    ...filters,
    pageNow: pageNow
  });
  const [isLoading, setIsLoading] = useState(false);

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

  // 當路由變更時，更新本地篩選狀態
  useEffect(() => {
    setLocalFilters({
      ...filters,
      pageNow: pageNow
    });
  }, [filters, pageNow]);

  // 更新篩選條件
  const updateFilter = (key: keyof LocalFilters, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    
    // 重置頁碼到第一頁
    if (key !== 'pageNow') {
      newFilters.pageNow = 1;
    }
    
    // 構建查詢字串
    const queryString = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== '' && value !== 0) {
        queryString.append(key, value.toString());
      }
    });
    
    // 使用 router.replace 導航
    setIsLoading(true);
    router.replace(`/products?${queryString.toString()}`).finally(() => {
      setIsLoading(false);
    });
  };

  // 清除篩選
  const clearFilters = () => {
    const defaultFilters: LocalFilters = {
      keyword: '',
      category: '',
      minPrice: 0,
      maxPrice: 99999,
      inStock: 0,
      sortBy: 'asc',
      productNum: 20,
      pageNow: 1
    };
    
    setLocalFilters(defaultFilters);
    router.replace('/products');
  };

  // 分頁導航
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pageCount) {
      updateFilter('pageNow', page);
    }
  };

  return (
    <>
      <Head>
        <title>商品列表 - ProductView</title>
        <meta name="description" content="商品篩選和分頁展示" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto p-5 min-h-screen bg-gray-50">
        {/* 篩選器區域 */}
        <section className="bg-white p-6 rounded-xl shadow-md mb-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold text-gray-800">商品篩選</h2>
            {/* 顯示模式切換按鈕 */}
            <button
              onClick={toggleDisplayMode}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>{displayMode === 'card' ? '📋' : '🃏'}</span>
              <span>{displayMode === 'card' ? '列表模式' : '卡片模式'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            {/* 搜尋框 */}
            <div className="flex flex-col">
              <label htmlFor="keyword" className="text-sm font-medium text-gray-600 mb-2">
                搜尋商品
              </label>
              <input
                id="keyword"
                type="text"
                placeholder="輸入商品名稱..."
                value={localFilters.keyword}
                onChange={(e) => updateFilter('keyword', e.target.value)}
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
                value={localFilters.category}
                onChange={(e) => updateFilter('category', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">所有分類</option>
                <option value="A">分類 A</option>
                <option value="B">分類 B</option>
                <option value="C">分類 C</option>
                <option value="D">分類 D</option>
                <option value="E">分類 E</option>
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
                value={localFilters.minPrice}
                onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
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
                placeholder="99999"
                value={localFilters.maxPrice}
                onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
            </div>
          </div>

          {/* 額外篩選選項 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-5">
            {/* 庫存篩選 */}
            <div className="flex items-center">
              <input
                id="inStock"
                type="checkbox"
                checked={localFilters.inStock === 1}
                onChange={(e) => updateFilter('inStock', e.target.checked ? 1 : 0)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <label htmlFor="inStock" className="ml-2 text-sm font-medium text-gray-600">
                只顯示有庫存
              </label>
            </div>

            {/* 排序方向 */}
            <div className="flex flex-col">
              <label htmlFor="sortBy" className="text-sm font-medium text-gray-600 mb-2">
                排序方向
              </label>
              <select
                id="sortBy"
                value={localFilters.sortBy}
                onChange={(e) => updateFilter('sortBy', e.target.value)}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="asc">價格升序</option>
                <option value="desc">價格降序</option>
              </select>
            </div>

            {/* 每頁商品數量 */}
            <div className="flex flex-col">
              <label htmlFor="productNum" className="text-sm font-medium text-gray-600 mb-2">
                每頁數量
              </label>
              <select
                id="productNum"
                value={localFilters.productNum}
                onChange={(e) => updateFilter('productNum', Number(e.target.value))}
                className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value={10}>10 筆</option>
                <option value={20}>20 筆</option>
                <option value={50}>50 筆</option>
                <option value={100}>100 筆</option>
              </select>
            </div>

            {/* 清除篩選器按鈕 */}
            <div className="flex items-end">
              <button 
                onClick={clearFilters}
                className="bg-gray-500 text-white px-5 py-2.5 rounded-lg text-sm hover:bg-gray-600 transition-colors"
              >
                清除篩選器
              </button>
            </div>
          </div>

          {/* 結果統計 */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              顯示 {items.length} 個商品，共 {productCount} 筆資料
            </p>
            {isLoading && (
              <p className="text-blue-500 text-sm mt-2">載入中...</p>
            )}
          </div>
        </section>

        {/* 商品展示區域 */}
        <section className="mt-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">沒有找到符合條件的商品</p>
            </div>
          ) : (
            <>
              {/* 卡片顯示模式 */}
              {displayMode === 'card' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((product) => (
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

              {/* 列表顯示模式 */}
              {displayMode === 'list' && (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            商品圖片
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            商品名稱
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            分類
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            價格
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            庫存狀態
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="w-16 h-16 overflow-hidden rounded-lg">
                                <img
                                  src="/img/product-placeholder-512.png"
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {product.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                                {product.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-semibold text-red-600">
                                NT$ {product.price.toLocaleString()}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                product.inStock 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? '有庫存' : '無庫存'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 分頁導航 */}
              {pageCount > 1 && (
                <div className="mt-8 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    {/* 上一頁 */}
                    <button
                      onClick={() => goToPage(pageNow - 1)}
                      disabled={pageNow <= 1}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      上一頁
                    </button>

                    {/* 頁碼 */}
                    {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                      let pageNum;
                      if (pageCount <= 5) {
                        pageNum = i + 1;
                      } else if (pageNow <= 3) {
                        pageNum = i + 1;
                      } else if (pageNow >= pageCount - 2) {
                        pageNum = pageCount - 4 + i;
                      } else {
                        pageNum = pageNow - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            pageNum === pageNow
                              ? 'bg-blue-600 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    {/* 下一頁 */}
                    <button
                      onClick={() => goToPage(pageNow + 1)}
                      disabled={pageNow >= pageCount}
                      className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      下一頁
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<ProductsPageProps> = async (context) => {
  try {
    // 解析查詢參數
    const {
      keyword = '',
      category = '',
      minPrice = 0,
      maxPrice = 99999,
      inStock = 0,
      sortBy = 'asc',
      pageNow = 1,
      productNum = 20
    } = context.query as FilterQuery;

    // 構建 API 查詢字串
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append('keyword', keyword as string);
    if (category) queryParams.append('category', category as string);
    if (minPrice) queryParams.append('minPrice', minPrice as string);
    if (maxPrice) queryParams.append('maxPrice', maxPrice as string);
    if (inStock) queryParams.append('inStock', inStock as string);
    if (sortBy) queryParams.append('sortBy', sortBy as string);
    if (pageNow) queryParams.append('pageNow', pageNow as string);
    if (productNum) queryParams.append('productNum', productNum as string);

    // 呼叫 API
    const baseUrl = context.req.headers.host?.includes('localhost') 
      ? 'http://localhost:3000' 
      : `https://${context.req.headers.host}`;
    
    const apiUrl = `${baseUrl}/api/products-filter?${queryParams.toString()}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: FilteredResponse = await response.json();

    return {
      props: {
        items: data.items || [],
        pageCount: data.pageCount || 1,
        productCount: data.productCount || 0,
        pageNow: data.pageNow || 1,
        filters: {
          keyword: keyword as string || '',
          category: category as string || '',
          minPrice: Number(minPrice) || 0,
          maxPrice: Number(maxPrice) || 99999,
          inStock: Number(inStock) || 0,
          sortBy: sortBy as string || 'asc',
          productNum: Number(productNum) || 20
        }
      }
    };

  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    
    // 回傳預設資料
    return {
      props: {
        items: [],
        pageCount: 1,
        productCount: 0,
        pageNow: 1,
        filters: {
          keyword: '',
          category: '',
          minPrice: 0,
          maxPrice: 99999,
          inStock: 0,
          sortBy: 'asc',
          productNum: 20
        }
      }
    };
  }
};

export default ProductsPage;
