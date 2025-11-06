import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier/flat";

export default defineConfig([
  ...nextVitals,
  prettier,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-page-custom-font": "off",
    },
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
]);
