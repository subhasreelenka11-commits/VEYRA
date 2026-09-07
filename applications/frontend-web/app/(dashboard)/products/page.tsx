'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  matchScore: number;
  price: string;
  size: string;
  image: string;
  actives: string[];
  whyChosen: string;
  rating: number;
  reviewsCount: number;
  addedToRoutine: boolean;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const [products, setProducts] = useState<Product[]>([
    {
      id: 'p1',
      name: 'Botanical Velvet Cleanser',
      brand: 'VEYRA LABS',
      category: 'Cleansers',
      matchScore: 98,
      price: '$42.00',
      size: '150 ml',
      image: '/images/features_skincare.png',
      actives: ['Amino Acid Surfactants', 'Cica Extract', 'Glycerin'],
      whyChosen: 'Non-stripping pH 5.5 formulation respects stratum corneum lipids while removing environmental dirt.',
      rating: 4.9,
      reviewsCount: 312,
      addedToRoutine: true,
    },
    {
      id: 'p2',
      name: 'Cellular Radiance Serum 15% Vitamin C',
      brand: 'VEYRA LABS',
      category: 'Serums & Actives',
      matchScore: 96,
      price: '$78.00',
      size: '30 ml',
      image: '/images/veyra_serum_bottle.png',
      actives: ['15% L-Ascorbic Acid', '1% Ferulic Acid', 'Vitamin E'],
      whyChosen: 'Clinical golden standard antioxidant trio. Shields against free-radical photo-oxidation and promotes even tone.',
      rating: 5.0,
      reviewsCount: 540,
      addedToRoutine: true,
    },
    {
      id: 'p3',
      name: 'Barrier Recovery Lipid Crème',
      brand: 'VEYRA LABS',
      category: 'Moisturizers',
      matchScore: 94,
      price: '$64.00',
      size: '50 ml',
      image: '/images/veyra_bento_products.png',
      actives: ['Ceramide NP/AP/EOP', 'Phytosphingosine', 'Oat Beta-Glucan'],
      whyChosen: 'Replicates natural 3:1:1 skin lipid ratio for rapid epidermal moisture retention and barrier healing.',
      rating: 4.8,
      reviewsCount: 228,
      addedToRoutine: false,
    },
    {
      id: 'p4',
      name: 'Cellular Mineral Veil SPF 50+',
      brand: 'VEYRA LABS',
      category: 'Sun Protection',
      matchScore: 99,
      price: '$48.00',
      size: '50 ml',
      image: '/images/veyra_serum_bottle.png',
      actives: ['Non-Nano Zinc Oxide 21%', 'Ectoin', 'Niacinamide 2%'],
      whyChosen: 'Weightless velvet finish with zero white cast. Blocks UVA, UVB, and digital HEV blue light emissions.',
      rating: 4.9,
      reviewsCount: 410,
      addedToRoutine: false,
    },
    {
      id: 'p5',
      name: 'Bakuchiol Phyto-Retinol Night Elixir',
      brand: 'VEYRA LABS',
      category: 'Serums & Actives',
      matchScore: 95,
      price: '$82.00',
      size: '30 ml',
      image: '/images/veyra_serum_bottle.png',
      actives: ['Bakuchiol 2%', 'Rosehip Seed Oil', 'Squalane'],
      whyChosen: 'Gentle botanical retinol equivalent. Stimulates collagen turnover with zero irritation or photosensitivity.',
      rating: 4.9,
      reviewsCount: 189,
      addedToRoutine: false,
    },
    {
      id: 'p6',
      name: 'Marine Collagen & Astaxanthin Elixir',
      brand: 'VEYRA LABS',
      category: 'Supplements',
      matchScore: 92,
      price: '$58.00',
      size: '30 Sachets',
      image: '/images/veyra_bento_products.png',
      actives: ['Hydrolyzed Marine Collagen Peptides 5000mg', 'Natural Astaxanthin 4mg', 'Hyaluronic Acid'],
      whyChosen: 'Bioavailable deep dermal support that enhances skin density and systemic elasticity from within.',
      rating: 4.8,
      reviewsCount: 145,
      addedToRoutine: false,
    },
  ]);

  const categories = ['All', 'Cleansers', 'Serums & Actives', 'Moisturizers', 'Sun Protection', 'Supplements'];

  const toggleRoutine = (id: string, name: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextState = !p.addedToRoutine;
        showToast(nextState ? `Added "${name}" to your daily rituals.` : `Removed "${name}" from rituals.`);
        return { ...p, addedToRoutine: nextState };
      }
      return p;
    }));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const filteredProducts = products.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="space-y-8 pb-12 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#334234] text-white text-xs font-bold px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 border border-emerald-500/30 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. HERO HEADER */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">🧴</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                CURATED APOTHECARY
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              Product Recommendations
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Biocompatible formulations hand-selected to pair with your skin biomarker profile. Clean ingredients, dermatologically validated, and fragrance-neutral.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/skin-analysis"
              className="bg-[#334234] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>✨</span>
              <span>Re-scan Skin for Matches →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#334234] text-white shadow-sm'
                : 'bg-white text-[#6B5A52] border border-[#E8DCD2] hover:bg-[#FAF7F2] hover:text-[#1F1916]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-[32px] border border-[#E8DCD2] overflow-hidden shadow-sm hover:shadow-md hover:border-[#334234]/30 transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Image banner with match pill */}
              <div className="relative h-60 w-full bg-[#FAF7F2] overflow-hidden flex items-center justify-center p-6">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-800 border border-emerald-200 shadow-sm flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{p.matchScore}% Match</span>
                </div>

                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white">
                  ★ {p.rating} ({p.reviewsCount})
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970]">
                      {p.brand} • {p.size}
                    </span>
                    <h3 className="text-base font-serif font-bold text-[#1F1916] mt-0.5">
                      {p.name}
                    </h3>
                  </div>
                  <span className="text-base font-serif font-bold text-[#1F1916]">{p.price}</span>
                </div>

                <p className="text-xs text-[#6B5A52] leading-relaxed">
                  {p.whyChosen}
                </p>

                {/* Key actives */}
                <div className="pt-2 border-t border-[#E8DCD2]/60 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8A7970]">
                    Primary Actives:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {p.actives.map((act) => (
                      <span
                        key={act}
                        className="px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#334234] text-[9px] font-bold border border-[#E8DCD2]"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 pt-0">
              <button
                onClick={() => toggleRoutine(p.id, p.name)}
                className={`w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  p.addedToRoutine
                    ? 'bg-[#E8EFE6] text-[#334234] border border-[#708264]/40 hover:bg-red-50 hover:text-red-700 hover:border-red-200'
                    : 'bg-[#334234] text-white hover:bg-[#253226] shadow-sm'
                }`}
              >
                <span>{p.addedToRoutine ? '✓ In Your Daily Routine' : '+ Add to Ritual'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

