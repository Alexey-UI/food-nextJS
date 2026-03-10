import "@/styles/globals.scss";

import Providers from '@/providers/Providers'
import {Metadata} from "next";
import Header from "@/components/Header";
import localFont from "next/font/local";
const roboto = localFont({
  src: [
    {
      path: '../fonts/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Food Recipes',
  description: 'Recipe application',
}

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}