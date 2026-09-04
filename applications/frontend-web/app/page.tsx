import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-gray-900 font-sans">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 bg-[#FAF9F6]/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
              VEYRA
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
              <Link href="#features" className="hover:text-gray-900 transition-colors">Features</Link>
              <Link href="#how-it-works" className="hover:text-gray-900 transition-colors">How It Works</Link>
              <Link href="#about" className="hover:text-gray-900 transition-colors">About</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="/login" className="text-gray-700 hover:text-gray-900 transition-colors hidden sm:block">
              Log in
            </Link>
            <Link href="/register" className="bg-gray-900 text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative px-4 pt-20 pb-32 sm:pt-32 sm:pb-40 lg:pb-48 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-50/40 via-[#FAF9F6] to-[#FAF9F6]"></div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-gray-900 max-w-4xl mb-8 leading-tight">
            Your personal grooming & wellness companion.
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-12 leading-relaxed">
            Veyra brings personalized skincare, grooming, nutrition, and wellness into one beautiful, intelligent experience designed entirely around you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link href="/register" className="bg-gray-900 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-gray-800 transition-all shadow-sm flex items-center justify-center gap-2">
              Get Started
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
            <Link href="#features" className="bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full text-base font-medium hover:bg-gray-50 transition-all shadow-sm text-center">
              Explore Veyra
            </Link>
          </div>
        </section>

        {/* AI Section */}
        <section className="bg-gray-900 text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Personal care, powered by intelligence.</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Veyra's advanced AI engine understands your unique profile to deliver personalized guidance, tailored routines, and actionable insights that evolve with your lifestyle.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">Everything you need to take better care of yourself.</h2>
            <p className="text-gray-500 text-lg">A holistic approach to feeling and looking your best.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'AI Skin Analysis', desc: 'Understand visible skin characteristics and get personalized guidance.' },
              { title: 'Personalized Routines', desc: 'Build skincare and grooming routines around your exact needs.' },
              { title: 'Nutrition', desc: 'Get meal ideas personalized to your goals and dietary preferences.' },
              { title: 'Smart Recipes', desc: 'Discover recipes based on your preferences and what\'s available.' },
              { title: 'Product Recommendations', desc: 'Find products highly relevant to your personal needs and budget.' },
              { title: 'Progress Tracking', desc: 'Track your wellness and personal progress over time effortlessly.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-amber-50/50 py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-16 text-center">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
              {[
                { step: '01', title: 'Tell Veyra about yourself.', desc: 'Share your goals, lifestyle, and preferences.' },
                { step: '02', title: 'Get personalized recommendations.', desc: 'Receive tailored routines, meals, and products.' },
                { step: '03', title: 'Build better daily habits.', desc: 'Follow your plan and track your progress over time.' }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-900 text-white flex items-center justify-center text-xl font-bold mb-6 shadow-md">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personalization Section */}
        <section className="py-24 px-4 max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">Made uniquely for you.</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Veyra becomes infinitely more useful as it understands you. Every recommendation is uniquely curated based on your <span className="text-gray-900 font-medium">goals, lifestyle, dietary preferences, skin concerns, and daily routines</span>.
          </p>
        </section>

        {/* Final CTA */}
        <section className="bg-gray-100 py-32 px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-8 max-w-2xl mx-auto leading-tight">
            Start building a routine that's made for you.
          </h2>
          <Link href="/register" className="inline-block bg-gray-900 text-white px-10 py-5 rounded-full text-lg font-medium hover:bg-gray-800 transition-all shadow-md">
            Get Started
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">VEYRA</h2>
            <p className="text-sm text-gray-500">Your personal grooming & wellness companion.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <Link href="#features" className="hover:text-gray-900">Features</Link>
            <Link href="#about" className="hover:text-gray-900">About</Link>
            <Link href="/login" className="hover:text-gray-900">Login</Link>
            <Link href="/register" className="hover:text-gray-900">Register</Link>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Veyra. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
