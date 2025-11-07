'use client';

import { IllustrationSection } from '../IllustrationSection';
import { LoginForm } from '../LoginForm';

export function LoginFormSection() {
  return (
    <main className="min-h-screen w-full bg-[#0B0D1B] flex justify-center px-6 md:px-12 lg:px-16">
      <div className="w-full max-w-[1440px] grid md:grid-cols-2 gap-10 py-12 items-start">
        <section className="flex flex-col max-w-[600px] w-full">
          <h1 className="text-4xl font-bold text-[#4A8BFF] mb-16 md:mb-24">
            Nortus
          </h1>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-white">Login</h2>
            <p className="text-sm mb-10 text-gray-300">
              Entre com suas credenciais para acessar a sua conta.
            </p>

            <LoginForm />
          </div>
        </section>

        <IllustrationSection />
      </div>
    </main>
  );
}
