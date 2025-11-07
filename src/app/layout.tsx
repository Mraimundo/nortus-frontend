import type { Metadata } from 'next';
import Head from 'next/head';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import './globals.css';

const localPoppins = localFont({
  src: [
    {
      path: './_fonts/Poppins/Poppins-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './_fonts/Poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './_fonts/Poppins/Poppins-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './_fonts/Poppins/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './_fonts/Poppins/Poppins-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Nortus AI — Inteligência Artificial para Vendas e Atendimento',
  description:
    'A Nortus é uma solução de Inteligência Artificial que ajuda equipes de vendas e atendimento a entender o comportamento de clientes, otimizar interações e aumentar conversões em tempo real.',
  keywords: [
    'Nortus',
    'Inteligência Artificial',
    'Vendas',
    'Atendimento',
    'Chatbot',
    'Análise de comportamento',
    'IA aplicada a negócios',
  ],
  authors: [{ name: 'Equipe Nortus', url: 'https://nortus.ai' }],
  openGraph: {
    title: 'Nortus AI — Inteligência Artificial para Vendas e Atendimento',
    description:
      'Otimize a performance do seu time de vendas e atendimento com Inteligência Artificial. Descubra como a Nortus pode transformar a experiência do cliente.',
    url: 'https://nortus.ai',
    siteName: 'Nortus AI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nortus AI — Inteligência Artificial para Vendas e Atendimento',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nortus AI — Inteligência Artificial para Vendas e Atendimento',
    description:
      'Potencialize seu time com IA. A Nortus ajuda você a entender e atender melhor seus clientes.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://nortus.ai'),
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="google-site-verification" content="" />
      </Head>
      <body className={`${localPoppins.className} antialiased`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
