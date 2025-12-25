import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-6 flex-grow">
        <div className="flex items-start justify-between mb-4">
          <img 
            src={product.logoUrl} 
            alt={`${product.name} Logo`} 
            className="w-16 h-16 rounded-lg object-cover bg-slate-50 border border-slate-100"
          />
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded text-green-700 font-bold text-sm">
              <Star className="w-4 h-4 fill-current" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400 mt-1">{product.reviewCount} reviews</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-1">{product.name}</h3>
        <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-xs font-medium mb-4">
          {product.category}
        </span>
        
        <p className="text-slate-600 text-sm mb-6 line-clamp-3">
          {product.shortDescription}
        </p>

        <div className="space-y-2 mb-6">
          <p className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Top Features:</p>
          {product.pros.slice(0, 2).map((pro, index) => (
            <div key={index} className="flex items-start gap-2 text-sm text-slate-600">
              <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{pro}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
        <Link 
          to={`/review/${product.id}`}
          className="flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium text-sm hover:bg-white transition-colors"
        >
          Read Review
        </Link>
        <a 
          href={product.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-brand-orange text-white rounded-lg font-medium text-sm hover:bg-orange-600 transition-colors shadow-sm"
        >
          Visit Site <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default ProductCard;