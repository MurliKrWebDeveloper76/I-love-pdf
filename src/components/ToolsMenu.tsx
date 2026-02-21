import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { tools, ToolCategory } from '@/data/tools';
import { cn } from '@/lib/utils';

interface ToolsMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (toolName: string) => void;
}

export function ToolsMenu({ isOpen, onClose, onSelectTool }: ToolsMenuProps) {
  // Group tools by category
  const categories: ToolCategory[] = [
    "Organize PDF",
    "Optimize PDF",
    "Convert PDF",
    "Edit PDF",
    "PDF Security"
  ];

  const getToolsByCategory = (category: ToolCategory) => {
    return tools.filter(tool => tool.category.includes(category));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] mt-[72px]"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[72px] left-0 right-0 bg-white z-[50] shadow-xl border-t border-gray-100 max-h-[calc(100vh-72px)] overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-8 md:px-6">
              <div className="flex justify-between items-center mb-8 md:hidden">
                <h2 className="text-2xl font-bold text-dark">All PDF Tools</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {categories.map((category) => (
                  <div key={category} className="space-y-4">
                    <h3 className="text-primary font-bold text-lg uppercase tracking-wider text-sm border-b border-gray-100 pb-2">
                      {category}
                    </h3>
                    <ul className="space-y-3">
                      {getToolsByCategory(category).map((tool) => (
                        <li key={tool.id}>
                          <button
                            onClick={() => {
                              onSelectTool(tool.title);
                              onClose();
                            }}
                            className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors group w-full text-left"
                          >
                            <div className="text-gray-400 group-hover:text-primary transition-colors">
                              <tool.icon className="w-5 h-5" />
                            </div>
                            <span className="font-medium">{tool.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-12 pt-8 border-t border-gray-100 flex justify-end">
                <button 
                  onClick={onClose}
                  className="flex items-center gap-2 text-gray-500 hover:text-dark font-medium"
                >
                  Close Menu <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
