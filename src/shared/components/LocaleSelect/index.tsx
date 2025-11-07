import { useState } from 'react';
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

export function LocaleSelect({
  initial,
  onChange,
}: {
  initial?: Locale;
  onChange?: (locale: Locale) => void;
}) {
  const [value, setValue] = useState<Locale>(initial ?? 'pt-BR');

  return (
    <Select
      value={value}
      onValueChange={(v) => {
        const locale = v as Locale;
        setValue(locale);
        onChange?.(locale);
        // integrar com i18n aqui, ex: i18n.changeLanguage(locale)
      }}
    >
      <SelectTrigger className="!flex !items-center bg-[#13111F] !px-5 !py-3 rounded-3xl !gap-2 border-0 ring-0 focus:ring-0 focus:ring-offset-0 outline-none !h-auto !w-auto !min-w-fit shadow-none">
        <SelectValue />
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
