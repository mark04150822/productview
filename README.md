# ProductView - 商品展示網站

一個基於 Next.js 的現代化商品展示網站，支援 SSR、篩選、分頁和響應式設計。

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

## 🎯 主要功能

### 1. 首頁 (`/`)
- 響應式商品網格展示
- 基本篩選功能
- 連結到進階篩選頁面

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

### 3. API 端點

#### `/api/products`
- 取得所有商品資料
- 回傳 JSON 格式的商品列表

#### `/api/products-filter`
- 支援多種篩選參數：
  - `keyword` - 關鍵字搜尋
  - `category` - 分類篩選
  - `minPrice` / `maxPrice` - 價格範圍
  - `inStock` - 庫存狀態
  - `sortBy` - 排序方向
  - `pageNow` - 當前頁碼
  - `productNum` - 每頁商品數量
- 回傳格式：
  ```json
  {
    "items": [...],
    "pageCount": 10,
    "productCount": 1000,
    "pageNow": 1
  }
  ```

## 🚀 快速開始

### 安裝依賴
```bash
npm install
```

### 開發模式
```bash
npm run dev
```

### 建置專案
```bash
npm run build
```

### 生產模式
```bash
npm start
```

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

## 🌐 部署

### Vercel (推薦)
```bash
npm run build
# 部署到 Vercel 平台
```

### 其他平台
```bash
npm run build
npm start
```

## 📝 資料格式

### 商品資料結構
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}
```

### 篩選回應結構
```typescript
interface FilteredResponse {
  items: Product[];
  pageCount: number;
  productCount: number;
  pageNow: number;
}
```

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

## 📄 授權

MIT License

---

**ProductView** - 現代化的商品展示解決方案 🚀
