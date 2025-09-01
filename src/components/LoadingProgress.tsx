import React from 'react';

interface LoadingProgressProps {
  current: number;
  total: number;
  onLoadMore: () => void;
  hasMore: boolean;
  loading?: boolean;
}

export default function LoadingProgress({ 
  current, 
  total, 
  onLoadMore, 
  hasMore, 
  loading = false 
}: LoadingProgressProps) {
  const percentage = total > 0 ? Math.min((current / total) * 100, 100) : 0;
  
  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-md">
      <div className="text-center">
        {/* 進度條 */}
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
        
        {/* 進度文字 */}
        <div className="mb-4">
          <p className="text-lg font-semibold text-gray-800">
            已載入 {current} / {total} 筆商品
          </p>
          <p className="text-sm text-gray-500">
            {percentage.toFixed(1)}% 完成
          </p>
        </div>
        
        {/* 載入更多按鈕 */}
        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>載入中...</span>
              </>
            ) : (
              <>
                <span>載入更多</span>
                <span>↓</span>
              </>
            )}
          </button>
        )}
        
        {/* 完成提示 */}
        {!hasMore && total > 0 && (
          <div className="text-green-600 font-medium">
            🎉 所有商品已載入完成！
          </div>
        )}
      </div>
    </div>
  );
}
