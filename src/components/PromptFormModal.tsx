import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { usePromptContext } from '@/contexts/PromptContext';
import { Prompt, AI_TOOLS, DEFAULT_CATEGORIES, PromptFormData } from '@/types/prompt';
import { toast } from 'sonner';
import { X } from 'lucide-react';

interface PromptFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editPrompt?: Prompt | null;
}

const emptyForm: PromptFormData = {
  title: '', description: '', content: '', category: DEFAULT_CATEGORIES[0],
  tags: [], aiTool: 'ChatGPT', isFavorite: false, isPinned: false,
};

export function PromptFormModal({ open, onOpenChange, editPrompt }: PromptFormModalProps) {
  const { addPrompt, updatePrompt } = usePromptContext();
  const [form, setForm] = useState<PromptFormData>(emptyForm);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (editPrompt) {
      setForm({
        title: editPrompt.title, description: editPrompt.description, content: editPrompt.content,
        category: editPrompt.category, tags: editPrompt.tags, aiTool: editPrompt.aiTool,
        isFavorite: editPrompt.isFavorite, isPinned: editPrompt.isPinned,
      });
    } else {
      setForm(emptyForm);
    }
    setTagInput('');
  }, [editPrompt, open]);

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !form.tags.includes(tag)) {
      setForm(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setTagInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    if (editPrompt) {
      updatePrompt(editPrompt.id, form);
      toast.success('Prompt updated!');
    } else {
      addPrompt(form);
      toast.success('Prompt created!');
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto bg-card border-border shadow-modal">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{editPrompt ? 'Edit Prompt' : 'New Prompt'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title</Label>
            <Input id="title" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Code Review Assistant" className="bg-secondary/50 border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description</Label>
            <Input id="description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Brief description of the prompt" className="bg-secondary/50 border-border" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Prompt Content</Label>
            <Textarea id="content" value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} placeholder="Write your prompt here..." rows={8} className="bg-secondary/50 border-border font-mono text-sm resize-y" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</Label>
              <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
                <SelectTrigger className="bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{DEFAULT_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">AI Tool</Label>
              <Select value={form.aiTool} onValueChange={v => setForm(p => ({ ...p, aiTool: v as any }))}>
                <SelectTrigger className="bg-secondary/50 border-border"><SelectValue /></SelectTrigger>
                <SelectContent>{AI_TOOLS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</Label>
            <div className="flex gap-2">
              <Input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }} placeholder="Add tag..." className="bg-secondary/50 border-border" />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddTag}>Add</Button>
            </div>
            {form.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-md font-mono">
                    #{tag}
                    <button type="button" onClick={() => setForm(p => ({ ...p, tags: p.tags.filter(t => t !== tag) }))} className="hover:text-destructive">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={form.isFavorite} onCheckedChange={v => setForm(p => ({ ...p, isFavorite: v }))} />
              Favorite
            </label>
            <label className="flex items-center gap-2 text-sm">
              <Switch checked={form.isPinned} onCheckedChange={v => setForm(p => ({ ...p, isPinned: v }))} />
              Pinned
            </label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1 bg-gradient-brand hover:opacity-90 text-primary-foreground border-0">
              {editPrompt ? 'Update' : 'Save'} Prompt
            </Button>
            <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>Cancel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
