# ProductView - 商品展示網站

一個基於 Next.js 的現代化商品展示網站，支援 SSR、篩選、分頁和響應式設計。

## 🌐 線上預覽

**線上網址：** [https://productview-silk.vercel.app/](https://productview-silk.vercel.app/)

## 🎯 主要功能

### 1. 首頁 (`/`)
- 響應式商品網格展示
- 基本篩選功能
- 連結到進階篩選頁面
- **預覽：** [首頁](https://productview-silk.vercel.app/)

### 2. 商品篩選頁面 (`/products`)
- **SSR 支援** - 伺服器端渲染和資料取得
- **完整篩選功能**：
  - 關鍵字搜尋
  - 分類篩選 (A, B, C, D, E)
  - 價格範圍篩選
  - 庫存狀態篩選
  - 排序方向 (升序/降序)
  - 每頁商品數量設定
- **分頁導航** - 智能分頁顯示
- **URL 同步** - 篩選條件反映在 URL 中
- **無刷新導航** - 使用 `router.replace` 實現
- **預覽：** [商品篩選頁面](https://productview-silk.vercel.app/products)

## 🚀 專案特色

- **Next.js 15.5.2** - 最新的 React 框架，支援 SSR/SSG
- **TypeScript** - 完整的類型安全支援
- **Tailwind CSS v4** - 現代化的 CSS 框架
- **Redux + Redux Thunk** - 狀態管理和非同步操作
- **響應式設計** - 適配各種螢幕尺寸
- **伺服器端篩選** - 高效的資料處理
- **SEO 友好** - 支援搜尋引擎優化

## 📁 專案結構

```
productview/
├── public/
│   ├── data/
│   │   └── items.json          # 商品資料
│   └── img/
│       └── product-placeholder-512.png  # 商品預設圖片
├── src/
│   ├── actions/                 # Redux Actions
│   │   └── productAction.ts
│   ├── hooks/                   # 自定義 Hooks
│   │   └── useProduct.ts
│   ├── pages/                   # Next.js 頁面
│   │   ├── api/                 # API 路由
│   │   │   ├── products.ts      # 商品列表 API
│   │   │   └── products-filter.ts # 篩選商品 API
│   │   ├── index.tsx            # 首頁
│   │   └── products.tsx         # 商品篩選頁面
│   ├── reducers/                # Redux Reducers
│   │   ├── index.ts
│   │   └── productReducer.ts
│   ├── styles/                  # 樣式檔案
│   │   └── globals.css
│   ├── types/                   # TypeScript 類型定義
│   │   └── product.ts
│   ├── utils/                   # 工具函數
│   │   └── axios.ts
│   ├── hooks.ts                 # Redux Hooks
│   └── store.ts                 # Redux Store
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ 技術棧

### 前端框架
- **Next.js 15.5.2** - React 全端框架
- **React 19.1.0** - 最新的 React 版本
- **TypeScript 5** - 類型安全的 JavaScript

### 狀態管理
- **Redux** - 可預測的狀態容器
- **Redux Thunk** - 非同步 Action 處理
- **React Redux** - React 與 Redux 的橋接

### 樣式
- **Tailwind CSS v4** - 實用優先的 CSS 框架
- **PostCSS** - CSS 後處理器

### HTTP 客戶端
- **Axios** - 基於 Promise 的 HTTP 客戶端



## 📱 響應式設計

- **大螢幕**：使用網格 (Grid) 佈局
- **小螢幕**：使用商品卡片佈局
- **適配裝置**：支援桌面、平板、手機

## 🔧 開發特色

### Redux 架構
- 傳統 Action/Reducer 模式
- 支援非同步操作 (Redux Thunk)
- 完整的類型定義

### 自定義 Hooks
- `useProduct` - 封裝商品相關邏輯
- 狀態管理和篩選邏輯分離

### 類型安全
- 完整的 TypeScript 類型定義
- 介面定義清晰明確


## 🔌 API 功能說明

### 1. 取得所有商品 API

**端點：** `GET /api/products`

**功能：** 取得所有商品資料，用於首頁展示和基本商品列表。

**Request：**
- 方法：`GET`
- 參數：無
- 路徑：`/api/products`

**Response：**
```json
[
  {
    "id": 1,
    "name": "商品名稱",
    "price": 100,
    "image": "product-image.jpg",
    "category": "A",
    "inStock": true
  }
]
```

**呼叫範例：**
```javascript
// 使用 fetch
fetch('/api/products')
  .then(response => response.json())
  .then(data => console.log(data));

// 使用 axios
import axios from 'axios';
const response = await axios.get('/api/products');
console.log(response.data);
```

### 2. 商品篩選 API

**端點：** `GET /api/products-filter`

**功能：** 支援多種篩選條件的高級商品搜尋，包含分頁功能。

**Request：**
- 方法：`GET`
- 查詢參數：
  - `keyword` (可選) - 關鍵字搜尋
  - `category` (可選) - 分類篩選 (A, B, C, D, E)
  - `minPrice` (可選) - 最低價格
  - `maxPrice` (可選) - 最高價格
  - `inStock` (可選) - 庫存狀態 (true/false)
  - `sortBy` (可選) - 排序方向 ("asc" 升序 / "desc" 降序)
  - `pageNow` (可選) - 當前頁碼，預設為 1
  - `productNum` (可選) - 每頁商品數量，預設為 10

**Response：**
```json
{
  "items": [
    {
      "id": 1,
      "name": "商品名稱",
      "price": 100,
      "image": "product-image.jpg",
      "category": "A",
      "inStock": true
    }
  ],
  "pageCount": 10,
  "productCount": 1000,
  "pageNow": 1
}
```

**呼叫範例：**

#### 基本篩選
```javascript
// 搜尋包含 "手機" 的商品
const response = await axios.get('/api/products-filter?keyword=手機');
```

#### 分類篩選
```javascript
// 篩選 A 分類的商品
const response = await axios.get('/api/products-filter?category=A');
```

#### 價格範圍篩選
```javascript
// 篩選價格在 100-500 之間的商品
const response = await axios.get('/api/products-filter?minPrice=100&maxPrice=500');
```

#### 庫存狀態篩選
```javascript
// 只顯示有庫存的商品
const response = await axios.get('/api/products-filter?inStock=true');
```

#### 排序和分頁
```javascript
// 按價格升序排列，第 2 頁，每頁 20 個商品
const response = await axios.get('/api/products-filter?sortBy=asc&pageNow=2&productNum=20');
```

#### 完整篩選範例
```javascript
// 綜合篩選：A 分類、價格 100-1000、有庫存、按價格升序、第 1 頁、每頁 15 個
const params = new URLSearchParams({
  category: 'A',
  minPrice: '100',
  maxPrice: '1000',
  inStock: 'true',
  sortBy: 'asc',
  pageNow: '1',
  productNum: '15'
});

const response = await axios.get(`/api/products-filter?${params}`);
console.log(response.data);
```

**錯誤處理：**
```javascript
try {
  const response = await axios.get('/api/products-filter?category=invalid');
  console.log(response.data);
} catch (error) {
  if (error.response) {
    console.error('API 錯誤:', error.response.status, error.response.data);
  } else {
    console.error('網路錯誤:', error.message);
  }
}
```
