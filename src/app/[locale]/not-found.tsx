import type { Metadata } from 'next';
import Link from 'next/link';

import '../globals.css';

export const metadata: Metadata = {
  title: 'Not Found',
  description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <section className="bg-black text-white flex items-center justify-center h-screen overflow-hidden">
      <div className="flex flex-col items-center text-center animate-fadeInUp">
        <h1 className="text-8xl font-extrabold tracking-widest text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] animate-pulseGlow">
          404
        </h1>

        <p className="mt-4 text-lg text-gray-300 max-w-md">
          A página que você procurou evaporou no éter digital.
        </p>

        <Link
          href="/"
          className="mt-8 px-6 py-3 rounded-full border border-white/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 animate-fadeInDelay"
        >
          Voltar ao início
        </Link>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute w-2 h-2 bg-white/40 rounded-full animate-floatingDot1" />
        <div className="absolute w-2 h-2 bg-white/30 rounded-full animate-floatingDot2" />
        <div className="absolute w-2 h-2 bg-white/20 rounded-full animate-floatingDot3" />
      </div>
    </section>
  );
}
