import { useState } from 'react';
import { usePromptContext } from '@/contexts/PromptContext';
import { PromptCard } from '@/components/PromptCard';
import { PromptFormModal } from '@/components/PromptFormModal';
import { PromptViewerModal } from '@/components/PromptViewerModal';
import { EmptyState } from '@/components/EmptyState';
import { Prompt } from '@/types/prompt';
import { motion } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Categories() {
  const { allPrompts, categories } = usePromptContext();
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);
  const [viewPrompt, setViewPrompt] = useState<Prompt | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const filtered = selectedCat ? allPrompts.filter(p => p.category === selectedCat) : [];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse prompts by category</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
        {categories.map(cat => {
          const count = allPrompts.filter(p => p.category === cat).length;
          return (
            <motion.button
              key={cat}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setSelectedCat(selectedCat === cat ? null : cat)}
              className={cn(
                'p-4 rounded-xl border text-left transition-all',
                selectedCat === cat
                  ? 'border-primary bg-primary/5 shadow-elevated'
                  : 'border-border bg-card hover:border-primary/20 shadow-card hover:shadow-elevated'
              )}
            >
              <FolderOpen className={cn('w-5 h-5 mb-2', selectedCat === cat ? 'text-primary' : 'text-muted-foreground')} />
              <p className="text-sm font-semibold text-foreground">{cat}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{count} prompt{count !== 1 ? 's' : ''}</p>
            </motion.button>
          );
        })}
      </div>

      {selectedCat && (
        <>
          <h2 className="text-lg font-semibold text-foreground mb-4">{selectedCat}</h2>
          {filtered.length === 0 ? (
            <EmptyState message="No prompts in this category" />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((prompt, i) => (
                <PromptCard key={prompt.id} prompt={prompt} onEdit={p => { setEditPrompt(p); setShowEditModal(true); }} onView={p => { setViewPrompt(p); setShowViewModal(true); }} index={i} />
              ))}
            </div>
          )}
        </>
      )}

      {!selectedCat && <EmptyState message="Select a category" sub="Click a category above to view its prompts" />}

      <PromptFormModal open={showEditModal} onOpenChange={setShowEditModal} editPrompt={editPrompt} />
      <PromptViewerModal prompt={viewPrompt} open={showViewModal} onOpenChange={setShowViewModal} onEdit={p => { setEditPrompt(p); setShowEditModal(true); }} />
    </div>
  );
}
