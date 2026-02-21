import React from 'react';
import { Heart, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2 text-2xl font-bold text-dark tracking-tight mb-4">
              <span>I</span>
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <span>PDF</span>
            </a>
            <p className="text-sm text-gray-500 mb-6">
              Your one-stop solution for all PDF needs. Secure, fast, and easy to use.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-dark mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tools</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-dark mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">iLovePDF Desktop</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">iLovePDF Mobile</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">iLoveSign</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">iLoveAPI</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">iLoveIMG</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-dark mb-4">Solutions</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">Business</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Legal</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-dark mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-primary transition-colors">About us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-10" />
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 mb-1">© iLovePDF 2026 ® - Your PDF Editor</p>
            <p className="text-xs text-gray-400">Website developed By Murli Kumar</p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 border border-gray-200 rounded-full px-3 py-1 hover:border-primary cursor-pointer transition-colors">
            <Globe className="w-4 h-4" />
            <span>English</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
