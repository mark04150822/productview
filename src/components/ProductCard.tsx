import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  products: Product[];
}

export default function ProductCard({ products }: ProductCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
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
  );
}
