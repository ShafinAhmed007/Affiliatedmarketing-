import React from 'react';
import { LegalPageType } from '../types';

interface LegalPageProps {
  type: LegalPageType;
}

const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="mb-4">Last Updated: October 2025</p>
            <p className="mb-4">
              At ProDigital Reviews, accessible from prodigitalreviews.com, one of our main priorities is the privacy of our visitors. 
              This Privacy Policy document contains types of information that is collected and recorded by ProDigital Reviews and how we use it.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-3">Log Files</h2>
            <p className="mb-4">
              ProDigital Reviews follows a standard procedure of using log files. These files log visitors when they visit websites. 
              All hosting companies do this and a part of hosting services' analytics.
            </p>
          </>
        );
      case 'terms':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="mb-4">
              By accessing this website we assume you accept these terms and conditions. Do not continue to use ProDigital Reviews if you do not agree to take all of the terms and conditions stated on this page.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-3">License</h2>
            <p className="mb-4">
              Unless otherwise stated, ProDigital Reviews and/or its licensors own the intellectual property rights for all material on ProDigital Reviews. 
              All intellectual property rights are reserved. You may access this from ProDigital Reviews for your own personal use subjected to restrictions set in these terms and conditions.
            </p>
          </>
        );
      case 'disclosure':
        return (
          <>
            <h1 className="text-3xl font-bold mb-6">Affiliate Disclosure</h1>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
              <p className="font-bold text-yellow-800">
                Transparency is our core value. Please read this disclosure fully.
              </p>
            </div>
            <p className="mb-4">
              ProDigital Reviews is an independent, professional review site that may receive compensation from the companies whose products we review. 
              We test each product thoroughly and give high marks to only the very best. We are independently owned and the opinions expressed here are our own.
            </p>
            <p className="mb-4">
              When you click on links on our site and make a purchase, we may earn an affiliate commission. 
              This helps support our editorial team and allows us to continue providing high-quality, free content. 
              This comes at <strong>no extra cost to you</strong>.
            </p>
            <h2 className="text-xl font-bold mt-6 mb-3">How We Review</h2>
            <p className="mb-4">
              Our reviews are based on:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Real-world testing and usage</li>
              <li>Performance benchmarks (speed, uptime)</li>
              <li>Feature comparison against competitors</li>
              <li>Value for money analysis</li>
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-slate max-w-none">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;