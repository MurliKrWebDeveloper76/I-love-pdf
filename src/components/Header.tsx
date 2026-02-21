import React, { useState, useEffect } from 'react';
import { Menu, Grid, Heart, User, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/AuthModal';
import { ToolsMenu } from '@/components/ToolsMenu';
import { UploadModal } from '@/components/UploadModal';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [isToolsMenuOpen, setIsToolsMenuOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openAuth = (tab: 'login' | 'register') => {
    setAuthTab(tab);
    setIsAuthModalOpen(true);
  };

  const toggleToolsMenu = () => {
    setIsToolsMenuOpen(!isToolsMenuOpen);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-5",
          isToolsMenuOpen && "bg-white shadow-none border-b border-gray-100"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleToolsMenu}
              className={cn(
                "p-2 rounded-full transition-colors",
                isToolsMenuOpen ? "bg-gray-100 text-primary" : "hover:bg-black/5 text-dark"
              )}
            >
              <Menu className="w-6 h-6" />
            </button>
            <a href="/" className="flex items-center gap-2 text-2xl font-bold text-dark tracking-tight">
              <span>I</span>
              <Heart className="w-6 h-6 text-primary fill-primary animate-pulse" />
              <span>PDF</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm text-gray-600">
            <button onClick={() => setSelectedTool("Merge PDF")} className="hover:text-primary transition-colors">Merge PDF</button>
            <button onClick={() => setSelectedTool("Split PDF")} className="hover:text-primary transition-colors">Split PDF</button>
            <button onClick={() => setSelectedTool("Compress PDF")} className="hover:text-primary transition-colors">Compress PDF</button>
            <button onClick={toggleToolsMenu} className="hover:text-primary transition-colors flex items-center gap-1">
              All PDF Tools
              <Grid className="w-4 h-4" />
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleToolsMenu}
              className={cn(
                "hidden sm:flex items-center justify-center w-10 h-10 rounded-full transition-colors",
                isToolsMenuOpen ? "bg-primary text-white" : "hover:bg-black/5 text-gray-600"
              )} 
              title="All Tools"
            >
              <Grid className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="hidden lg:block text-sm font-medium text-gray-700">{user.name}</span>
                  <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300">
                    <User className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => logout()}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => openAuth('login')}
                    className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => openAuth('register')}
                    className="bg-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <ToolsMenu 
        isOpen={isToolsMenuOpen} 
        onClose={() => setIsToolsMenuOpen(false)}
        onSelectTool={(toolName) => setSelectedTool(toolName)}
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        defaultTab={authTab}
      />

      <UploadModal 
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        toolName={selectedTool || ""}
      />
    </>
  );
}
