import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { WhatsAppFAB } from '@/components/whatsapp-fab';
import { ScrollToTop } from '@/components/scroll-to-top';
import { FloatingTextBg } from '@/components/floating-text-bg';
import { Balancer as HeadingsBalancerProvider } from "react-wrap-balancer";


export const metadata: Metadata = {
  title: 'SugarCrush Bakers | Fresh, Eggless, Homemade Goodness',
  description: 'Delicious eggless cakes, cupcakes, and more — baked with love in Dehradun. Order your custom cake today!',
  keywords: 'eggless cakes, bakery, dehradun, custom cakes, cupcakes, brownies, sugarcrushbakers'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FloatingTextBg />
        <HeadingsBalancerProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFAB />
          <ScrollToTop />
          <Toaster />
        </HeadingsBalancerProvider>
      </body>
    </html>
  );
}

