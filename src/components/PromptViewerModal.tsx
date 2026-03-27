import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Prompt } from '@/types/prompt';
import { Copy, Edit2, Trash2, Star, Pin } from 'lucide-react';
import { usePromptContext } from '@/contexts/PromptContext';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PromptViewerModalProps {
  prompt: Prompt | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (prompt: Prompt) => void;
}

const toolColors: Record<string, string> = {
  ChatGPT: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  Claude: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  NotebookLM: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Gemini: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  Copilot: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  Midjourney: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
  Other: 'bg-muted text-muted-foreground',
};

export function PromptViewerModal({ prompt, open, onOpenChange, onEdit }: PromptViewerModalProps) {
  const { toggleFavorite, togglePin, deletePrompt, incrementUsage } = usePromptContext();

  if (!prompt) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    incrementUsage(prompt.id);
    toast.success('Prompt copied!');
  };

  const handleDelete = () => {
    deletePrompt(prompt.id);
    toast.success('Prompt deleted');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border shadow-modal">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 flex-1">
              <DialogTitle className="text-xl font-bold">{prompt.title}</DialogTitle>
              <p className="text-sm text-muted-foreground">{prompt.description}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex flex-wrap gap-2">
            <span className={cn('text-xs font-medium px-2.5 py-1 rounded-md', toolColors[prompt.aiTool] || toolColors.Other)}>
              {prompt.aiTool}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">
              {prompt.category}
            </span>
            {prompt.tags.map(tag => (
              <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>

          <div className="relative">
            <pre className="bg-secondary/50 border border-border rounded-xl p-4 text-sm font-mono whitespace-pre-wrap text-foreground overflow-x-auto max-h-96 scrollbar-thin">
              {prompt.content}
            </pre>
            <Button
              size="sm"
              variant="secondary"
              className="absolute top-3 right-3 h-8 gap-1.5 text-xs"
              onClick={handleCopy}
            >
              <Copy className="w-3.5 h-3.5" />
              Copy
            </Button>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>{prompt.usageCount} uses</span>
            <span>·</span>
            <span>Created {new Date(prompt.createdAt).toLocaleDateString()}</span>
            <span>·</span>
            <span>Updated {new Date(prompt.updatedAt).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => { toggleFavorite(prompt.id); }}>
              <Star className={cn('w-4 h-4', prompt.isFavorite ? 'fill-warning text-warning' : '')} />
              {prompt.isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
            <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => { togglePin(prompt.id); }}>
              <Pin className={cn('w-4 h-4', prompt.isPinned ? 'fill-primary text-primary' : '')} />
              {prompt.isPinned ? 'Unpin' : 'Pin'}
            </Button>
            <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => { onOpenChange(false); onEdit(prompt); }}>
              <Edit2 className="w-4 h-4" />
              Edit
            </Button>
            <Button variant="secondary" size="sm" className="gap-1.5 text-destructive hover:text-destructive" onClick={handleDelete}>
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
