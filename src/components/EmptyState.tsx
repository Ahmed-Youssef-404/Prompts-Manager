import { FileText, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function EmptyState({ message = "No prompts found", sub = "Create your first prompt to get started" }: { message?: string; sub?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
        <FileText className="w-7 h-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1">{message}</h3>
      <p className="text-sm text-muted-foreground max-w-xs">{sub}</p>
    </motion.div>
  );
}
