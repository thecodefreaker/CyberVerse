import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

// Layout component to structure the page
export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-dark-base text-white font-mono">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}