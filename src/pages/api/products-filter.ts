import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { Product, FilterQuery, FilteredResponse } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 讀取商品資料
    const filePath = path.join(process.cwd(), 'public', 'data', 'items.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const allProducts: Product[] = JSON.parse(fileContent);

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
    } = req.query as FilterQuery;

    // 轉換參數類型
    const minPriceNum = Number(minPrice);
    const maxPriceNum = Number(maxPrice);
    const inStockBool = Number(inStock) === 1;
    const pageNowNum = Number(pageNow);
    const productNumNum = Number(productNum);

    // 篩選商品
    let filteredProducts = allProducts.filter((product: Product) => {
      // 關鍵字篩選
      if (keyword && !product.name.toLowerCase().includes(keyword.toLowerCase())) {
        return false;
      }

      // 分類篩選
      if (category && product.category !== category) {
        return false;
      }

      // 價格範圍篩選
      if (product.price < minPriceNum || product.price > maxPriceNum) {
        return false;
      }

      // 庫存篩選
      if (inStockBool && !product.inStock) {
        return false;
      }

      return true;
    });

    // 排序
    if (sortBy === 'asc') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    // 計算分頁資訊
    const totalCount = filteredProducts.length;
    const pageCount = Math.ceil(totalCount / productNumNum);
    const startIndex = (pageNowNum - 1) * productNumNum;
    const endIndex = startIndex + productNumNum;

    // 分頁
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // 準備回應資料
    const response: FilteredResponse = {
      items: paginatedProducts,
      pageCount,
      productCount: totalCount,
      pageNow: pageNowNum
    };

    // 設定 CORS 標頭
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing products filter:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
