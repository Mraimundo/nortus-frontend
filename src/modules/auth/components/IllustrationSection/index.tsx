import { LocaleSelect } from '@/src/shared/components/LocaleSelect';
import Image from 'next/image';

export function IllustrationSection() {
  return (
    <section className="hidden md:flex flex-col gap-3 justify-between items-end w-full max-w-[800px] mt-10 md:mt-0">
      <div className="flex justify-end gap-4 ">
        <button className="flex bg-[#13111F] px-5 py-3 rounded-3xl items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
          Ajuda
        </button>

        <LocaleSelect />
      </div>

      <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex justify-end">
        <Image
          src="/assets/login-illustration.png"
          alt="Ilustração de login Nortus"
          fill
          className="object-contain"
          priority
        />
      </div>
    </section>
  );
}
