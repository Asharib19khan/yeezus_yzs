'use client';

export default function Navigation() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-8 mix-blend-difference pointer-events-none">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center pointer-events-auto">
        <button 
          onClick={scrollToTop}
          className="text-3xl md:text-5xl font-black tracking-tighter uppercase select-none hover:opacity-80 transition-opacity focus:outline-none"
        >
          YEEZUS
        </button>
      </div>
    </nav>
  );
}
