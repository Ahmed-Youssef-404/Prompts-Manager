import { useState } from 'react';
import { usePromptContext } from '@/contexts/PromptContext';
import { PromptCard } from '@/components/PromptCard';
import { PromptFormModal } from '@/components/PromptFormModal';
import { PromptViewerModal } from '@/components/PromptViewerModal';
import { EmptyState } from '@/components/EmptyState';
import { Prompt } from '@/types/prompt';
import { motion } from 'framer-motion';

export default function Favorites() {
  const { allPrompts } = usePromptContext();
  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);
  const [viewPrompt, setViewPrompt] = useState<Prompt | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const favorites = allPrompts.filter(p => p.isFavorite);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Favorites</h1>
        <p className="text-sm text-muted-foreground mt-1">{favorites.length} favorite prompt{favorites.length !== 1 ? 's' : ''}</p>
      </motion.div>

      {favorites.length === 0 ? (
        <EmptyState message="No favorites yet" sub="Star a prompt to add it here" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} onEdit={p => { setEditPrompt(p); setShowEditModal(true); }} onView={p => { setViewPrompt(p); setShowViewModal(true); }} index={i} />
          ))}
        </div>
      )}

      <PromptFormModal open={showEditModal} onOpenChange={setShowEditModal} editPrompt={editPrompt} />
      <PromptViewerModal prompt={viewPrompt} open={showViewModal} onOpenChange={setShowViewModal} onEdit={p => { setEditPrompt(p); setShowEditModal(true); }} />
    </div>
  );
}
