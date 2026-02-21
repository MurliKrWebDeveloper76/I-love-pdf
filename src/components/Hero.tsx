import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ToolCard } from './ToolCard';
import { tools, ToolCategory } from '@/data/tools';
import { cn } from '@/lib/utils';
import { UploadModal } from './UploadModal';

export function Hero() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("All");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const categories: ToolCategory[] = [
    "All",
    "Workflows",
    "Organize PDF",
    "Optimize PDF",
    "Convert PDF",
    "Edit PDF",
    "PDF Security",
    "PDF Intelligence"
  ];

  const filteredTools = activeCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category.includes(activeCategory));

  return (
    <section className="pt-32 pb-20 px-4 md:px-6 min-h-screen">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-6 tracking-tight"
          >
            Every tool you need to use PDFs, <br className="hidden md:block" />
            <span className="text-primary">at your fingertips</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto"
          >
            All are 100% FREE and easy to use! Merge, split, compress, convert, rotate, unlock and watermark PDFs with just a few clicks.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 pill-tab",
                  activeCategory === category 
                    ? "bg-primary text-white shadow-lg shadow-primary/25" 
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredTools.map((tool, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              key={tool.id}
            >
              <ToolCard
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                onClick={() => setSelectedTool(tool.title)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <UploadModal 
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
        toolName={selectedTool || ""}
      />
    </section>
  );
}
