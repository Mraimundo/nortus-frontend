'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/shared/components/ui/select';

type Locale = 'pt-BR' | 'en-US';

const locales: { value: Locale; label: string; flag: React.ReactNode }[] = [
  {
    value: 'pt-BR',
    label: 'pt-BR',
    flag: (
      <span role="img" aria-label="brazil" className="mr-2">
        🇧🇷
      </span>
    ),
  },
  {
    value: 'en-US',
    label: 'en-US',
    flag: (
      <span role="img" aria-label="usa" className="mr-2">
        🇺🇸
      </span>
    ),
  },
];

export function LocaleSelect() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    const pathWithoutLocale = pathname.replace(/^\/(pt-BR|en-US)/, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <Select
      value={locale}
      onValueChange={(newValue) => switchLocale(newValue as Locale)}
    >
      <SelectTrigger className="!flex !items-center bg-[#13111F] !px-5 !py-3 rounded-3xl !gap-2 border-0 ring-0 focus:ring-0 focus:ring-offset-0 outline-none !h-auto !w-auto !min-w-fit shadow-none">
        <SelectValue>
          {locales.find((l) => l.value === locale)?.flag}
          {locales.find((l) => l.value === locale)?.label}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {locales.map((l) => (
          <SelectItem key={l.value} value={l.value}>
            <div className="flex items-center">
              {l.flag}
              <span>{l.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
