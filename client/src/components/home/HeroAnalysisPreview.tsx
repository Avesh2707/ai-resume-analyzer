import { motion } from 'framer-motion';
import { FileText, CheckCircle2, TrendingUp, Sparkles, Code2 } from 'lucide-react';

interface HeroAnalysisPreviewProps {
  isExploring?: boolean;
}

export function HeroAnalysisPreview({ isExploring = false }: HeroAnalysisPreviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative w-full max-w-sm mx-auto"
    >
      {/* Floating glass panel */}
      <motion.div 
        animate={
          isExploring 
            ? { y: [0, -8, 0], boxShadow: "0 0 40px rgba(139, 92, 246, 0.3)" }
            : { y: [0, -4, 0], boxShadow: "0 0 20px rgba(59, 130, 246, 0.1)" }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]/60 backdrop-blur-xl p-6 shadow-2xl"
      >
        {/* Animated scanning line inside the card */}
        <motion.div 
          animate={
            isExploring 
              ? { top: ['-10%', '110%'] } 
              : { top: ['0%', '100%', '0%'] }
          }
          transition={{ 
            duration: isExploring ? 2 : 6, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 z-10"
        />

        {/* Card Content */}
        <div className="space-y-6 relative z-0">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Resume.pdf</p>
                <p className="text-xs text-muted-foreground">Frontend Developer</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
            </Badge>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1 p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">ATS Score</span>
              </div>
              <p className="text-2xl font-bold text-foreground">92</p>
            </div>
            <div className="space-y-1 p-3 rounded-lg bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-xs font-medium uppercase tracking-wider">Job Match</span>
              </div>
              <p className="text-2xl font-bold text-primary">94%</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Keywords Found
              </span>
              <span className="font-medium text-foreground">18 / 21</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Key Skills
              </span>
              <span className="font-medium text-foreground text-right truncate max-w-[120px]">React, Node, TS</span>
            </div>
          </div>

          {/* Footer Status */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-sm text-emerald-500 font-medium">
            <CheckCircle2 className="w-4 h-4" />
            AI Analysis Complete
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

import { Badge } from '@/components/ui/badge';
