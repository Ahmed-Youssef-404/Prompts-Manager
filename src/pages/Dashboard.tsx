import { useState } from 'react';
import { usePromptContext } from '@/contexts/PromptContext';
import { PromptCard } from '@/components/PromptCard';
import { PromptFormModal } from '@/components/PromptFormModal';
import { PromptViewerModal } from '@/components/PromptViewerModal';
import { EmptyState } from '@/components/EmptyState';
import { Prompt } from '@/types/prompt';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { prompts, selectedCategory, setSelectedCategory, selectedTag, setSelectedTag, categories, allTags } = usePromptContext();
  const [editPrompt, setEditPrompt] = useState<Prompt | null>(null);
  const [viewPrompt, setViewPrompt] = useState<Prompt | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const handleEdit = (prompt: Prompt) => {
    setEditPrompt(prompt);
    setShowEditModal(true);
  };

  const handleView = (prompt: Prompt) => {
    setViewPrompt(prompt);
    setShowViewModal(true);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage and organize your AI prompts</p>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setSelectedCategory(null); setSelectedTag(null); }}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            !selectedCategory && !selectedTag ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { setSelectedCategory(selectedCategory === cat ? null : cat); setSelectedTag(null); }}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
              selectedCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {prompts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map((prompt, i) => (
            <PromptCard key={prompt.id} prompt={prompt} onEdit={handleEdit} onView={handleView} index={i} />
          ))}
        </div>
      )}

      <PromptFormModal open={showEditModal} onOpenChange={setShowEditModal} editPrompt={editPrompt} />
      <PromptViewerModal prompt={viewPrompt} open={showViewModal} onOpenChange={setShowViewModal} onEdit={handleEdit} />
    </div>
  );
}
