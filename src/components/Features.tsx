import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, ShieldCheck, Zap, Globe, Lock } from 'lucide-react';

export function Features() {
  return (
    <>
      {/* Workflow Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Create a workflow</h2>
              <p className="text-lg text-gray-500 mb-8">
                Create custom workflows with your favorite tools, automate tasks, and reuse anytime.
                Connect PDF tools in a sequence to process files automatically.
              </p>
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-medium hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25 flex items-center gap-2">
                Create Workflow <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="lg:w-1/2 bg-light-gray rounded-3xl p-8 aspect-video flex items-center justify-center border border-dashed border-gray-300">
              <div className="text-center text-gray-400">
                <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Drag-and-drop workflow builder mockup</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop & Mobile */}
      <section className="py-20 bg-light-gray">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-dark mb-2">Work offline with Desktop</h3>
              <p className="text-gray-500 mb-6">Batch edit documents locally, no internet required. Process heavy files instantly.</p>
              <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-400">Desktop App Mockup</span>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-dark mb-2">On-the-go with Mobile</h3>
              <p className="text-gray-500 mb-6">Access tools anytime from mobile device. Scan and edit PDFs from anywhere.</p>
              <div className="h-48 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-gray-400">Mobile App Mockup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Business</h2>
            <p className="text-gray-400 text-lg">
              Take your business efficiency to the next level with our enterprise-grade PDF solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {[
              "Team onboarding",
              "Role management",
              "API integration",
              "Batch automation",
              "Enterprise security"
            ].map((feature, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-medium">{feature}</h4>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="bg-white text-dark px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-colors">
              Get Premium for Business
            </button>
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-accent-blue/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row">
            <div className="p-10 md:w-2/3">
              <h2 className="text-3xl font-bold text-dark mb-6">Get more with Premium</h2>
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  "Advanced OCR",
                  "Offline Desktop",
                  "Secure e-Sign",
                  "No file size limits",
                  "Custom workflows",
                  "API access"
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-gray-600 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              <button className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-yellow-600 transition-colors shadow-lg shadow-yellow-500/25">
                Get Premium
              </button>
            </div>
            <div className="bg-dark p-10 md:w-1/3 flex items-center justify-center text-white">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50%</div>
                <div className="text-xl opacity-80">OFF</div>
                <div className="mt-4 text-sm opacity-60">Limited time offer</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* iLoveIMG Section */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-dark mb-4">Image editing made simple with iLoveIMG</h2>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
            Compress, resize, enhance images with AI. All the tools you need to edit images, in one place.
          </p>
          <button className="text-primary font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
            Go to iLoveIMG <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-light-gray">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h3 className="text-lg font-medium text-gray-400 mb-8 uppercase tracking-widest">The PDF software trusted by millions of users</h3>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-8 h-8 text-dark" />
               <span className="font-bold text-dark">ISO27001 Certified</span>
             </div>
             <div className="flex items-center gap-2">
               <Lock className="w-8 h-8 text-dark" />
               <span className="font-bold text-dark">Secure HTTPS</span>
             </div>
             <div className="flex items-center gap-2">
               <Globe className="w-8 h-8 text-dark" />
               <span className="font-bold text-dark">PDF Association</span>
             </div>
          </div>
        </div>
      </section>
    </>
  );
}
