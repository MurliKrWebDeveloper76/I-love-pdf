import React from 'react';
import { Toaster } from 'sonner';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Footer } from '@/components/Footer';
import { AuthProvider } from '@/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-light-gray font-sans text-dark selection:bg-primary/20 selection:text-primary">
        <Toaster position="top-center" richColors />
        <Header />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}
