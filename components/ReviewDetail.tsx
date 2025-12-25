import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../types';
import { Star, CheckCircle, XCircle, ExternalLink, ArrowLeft, Shield } from 'lucide-react';

interface ReviewDetailProps {
  products: Product[];
}

const ReviewDetail: React.FC<ReviewDetailProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Product Not Found</h2>
          <Link to="/" className="text-brand-blue hover:underline mt-4 inline-block">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-12">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-blue mb-6 text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Reviews
          </Link>
          
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img 
              src={product.logoUrl} 
              alt={product.name} 
              className="w-24 h-24 rounded-xl border border-slate-200 bg-white p-2 object-contain"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{product.name} Review</h1>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full uppercase">
                  {product.category}
                </span>
              </div>
              <p className="text-xl text-slate-600 mb-4">{product.shortDescription}</p>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="font-bold text-slate-900 ml-2">{product.rating}/5.0</span>
                </div>
                <div className="hidden sm:block h-4 w-px bg-slate-300"></div>
                <div className="text-slate-500 text-sm flex items-center gap-1">
                  <Shield className="w-4 h-4 text-green-500" />
                  Verified by ProDigital Team
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-auto mt-4 md:mt-0">
               <a 
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg shadow-lg transition-transform active:scale-95"
              >
                Visit Official Website <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              <p className="text-xs text-center text-slate-400 mt-2">Official Partner Link</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-12">
          
          {/* Verdict Box */}
          <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-brand-blue">
            <h3 className="text-lg font-bold text-slate-900 mb-2">The Verdict</h3>
            <p className="text-slate-700 italic">"{product.verdict}"</p>
          </div>

          {/* Full Description */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">In-Depth Analysis</h2>
            <div className="prose prose-slate max-w-none text-slate-600">
              <p>{product.fullDescription}</p>
              <p>
                In our testing environment, we focused on ease of use, feature set completeness, and customer support responsiveness. 
                {product.name} consistently outperformed peers in its category, specifically regarding {product.pros[0].toLowerCase()}.
              </p>
            </div>
          </section>

          {/* Pros & Cons */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pros & Cons</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100">
                <h3 className="text-green-700 font-bold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" /> The Good
                </h3>
                <ul className="space-y-3">
                  {product.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100">
                <h3 className="text-red-700 font-bold mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> The Bad
                </h3>
                <ul className="space-y-3">
                  {product.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                       <span className="mt-1.5 w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0"></span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Pricing Plans</h2>
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="p-4 font-semibold text-slate-700">Plan Name</th>
                      <th className="p-4 font-semibold text-slate-700">Price</th>
                      <th className="p-4 font-semibold text-slate-700">Key Features</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {product.pricing.map((tier, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="p-4 font-medium text-slate-900">{tier.name}</td>
                        <td className="p-4 text-brand-blue font-bold">{tier.price}</td>
                        <td className="p-4 text-sm text-slate-600">
                          {tier.features.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
            <div className="text-center mb-6">
              <span className="block text-slate-500 text-sm mb-1">Our Rating</span>
              <div className="text-5xl font-extrabold text-slate-900 mb-2">{product.rating}</div>
              <div className="flex justify-center text-yellow-400 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} 
                  />
                ))}
              </div>
              <p className="text-sm text-slate-500">Based on {product.reviewCount} user reviews</p>
            </div>
            
            <div className="border-t border-slate-100 pt-6">
              <h4 className="font-semibold text-slate-900 mb-3">Best For:</h4>
              <div className="bg-blue-50 text-blue-800 px-3 py-2 rounded-lg text-center font-medium text-sm">
                {product.bestFor}
              </div>
            </div>

            <div className="mt-6">
              <a 
                href={product.affiliateLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block text-center px-6 py-3 bg-brand-orange hover:bg-orange-600 text-white font-bold rounded-lg shadow-md transition-colors"
              >
                Get {product.name} Now
              </a>
              <p className="text-xs text-center text-slate-400 mt-3">
                30-Day Money Back Guarantee applied on most plans.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ReviewDetail;