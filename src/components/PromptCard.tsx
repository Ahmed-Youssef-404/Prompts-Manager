import { Star, Copy, Edit2, Trash2, Pin, Eye } from 'lucide-react';
import { Prompt } from '@/types/prompt';
import { usePromptContext } from '@/contexts/PromptContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const toolColors: Record<string, string> = {
  ChatGPT: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Claude: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  NotebookLM: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Gemini: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  Copilot: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Midjourney: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  Other: 'bg-muted text-muted-foreground',
};

interface PromptCardProps {
  prompt: Prompt;
  onEdit: (prompt: Prompt) => void;
  onView: (prompt: Prompt) => void;
  index?: number;
}

export function PromptCard({ prompt, onEdit, onView, index = 0 }: PromptCardProps) {
  const { toggleFavorite, togglePin, deletePrompt, incrementUsage } = usePromptContext();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(prompt.content);
    incrementUsage(prompt.id);
    toast.success('Prompt copied!');
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deletePrompt(prompt.id);
    toast.success('Prompt deleted');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className="group relative bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-elevated transition-all duration-200 cursor-pointer hover:border-primary/20"
      onClick={() => onView(prompt)}
    >
      {prompt.isPinned && (
        <div className="absolute top-3 right-3">
          <Pin className="w-3.5 h-3.5 text-primary fill-primary" />
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-sm text-foreground line-clamp-1 pr-6">{prompt.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{prompt.description}</p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-md', toolColors[prompt.aiTool] || toolColors.Other)}>
            {prompt.aiTool}
          </span>
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
            {prompt.category}
          </span>
        </div>

        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prompt.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] text-muted-foreground font-mono">#{tag}</span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-[10px] text-muted-foreground">+{prompt.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between pt-1 border-t border-border">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
            <span>{prompt.usageCount} uses</span>
            <span>·</span>
            <span>{new Date(prompt.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>

          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={(e) => { e.stopPropagation(); toggleFavorite(prompt.id); }} className="p-1 rounded hover:bg-secondary transition-colors">
              <Star className={cn('w-3.5 h-3.5', prompt.isFavorite ? 'fill-warning text-warning' : 'text-muted-foreground')} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); togglePin(prompt.id); }} className="p-1 rounded hover:bg-secondary transition-colors">
              <Pin className={cn('w-3.5 h-3.5', prompt.isPinned ? 'fill-primary text-primary' : 'text-muted-foreground')} />
            </button>
            <button onClick={handleCopy} className="p-1 rounded hover:bg-secondary transition-colors">
              <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onEdit(prompt); }} className="p-1 rounded hover:bg-secondary transition-colors">
              <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
            <button onClick={handleDelete} className="p-1 rounded hover:bg-secondary transition-colors">
              <Trash2 className="w-3.5 h-3.5 text-destructive" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
