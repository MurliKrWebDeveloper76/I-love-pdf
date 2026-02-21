import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  onClick?: () => void;
}

export function ToolCard({ title, description, icon: Icon, onClick }: ToolCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/10 group h-full flex flex-col"
      onClick={onClick}
    >
      <div className="mb-4 text-primary p-3 bg-primary/5 rounded-xl w-fit group-hover:bg-primary group-hover:text-white transition-colors duration-300">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed flex-grow">{description}</p>
      <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
        <span>Use Tool</span>
        <ArrowRight className="w-4 h-4 ml-1" />
      </div>
    </motion.div>
  );
}
