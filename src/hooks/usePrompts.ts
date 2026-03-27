import { useState, useEffect, useCallback, useMemo } from 'react';
import { Prompt, PromptFormData, DEMO_PROMPTS } from '@/types/prompt';

const STORAGE_KEY = 'prompt-manager-prompts';

function loadPrompts(): Prompt[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEMO_PROMPTS;
}

function savePrompts(prompts: Prompt[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
}

export function usePrompts() {
  const [prompts, setPrompts] = useState<Prompt[]>(loadPrompts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => { savePrompts(prompts); }, [prompts]);

  const addPrompt = useCallback((data: PromptFormData) => {
    const now = new Date().toISOString();
    const prompt: Prompt = {
      ...data,
      id: crypto.randomUUID(),
      usageCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    setPrompts(prev => [prompt, ...prev]);
    return prompt;
  }, []);

  const updatePrompt = useCallback((id: string, data: Partial<PromptFormData>) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, ...data, updatedAt: new Date().toISOString() } : p));
  }, []);

  const deletePrompt = useCallback((id: string) => {
    setPrompts(prev => prev.filter(p => p.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  }, []);

  const togglePin = useCallback((id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, isPinned: !p.isPinned } : p));
  }, []);

  const incrementUsage = useCallback((id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, usageCount: p.usageCount + 1 } : p));
  }, []);

  const importPrompts = useCallback((json: string) => {
    try {
      const imported = JSON.parse(json) as Prompt[];
      if (!Array.isArray(imported)) throw new Error('Invalid format');
      setPrompts(prev => [...imported.map(p => ({ ...p, id: crypto.randomUUID() })), ...prev]);
      return true;
    } catch { return false; }
  }, []);

  const exportPrompts = useCallback(() => {
    return JSON.stringify(prompts, null, 2);
  }, [prompts]);

  const categories = useMemo(() => [...new Set(prompts.map(p => p.category))].sort(), [prompts]);
  const allTags = useMemo(() => [...new Set(prompts.flatMap(p => p.tags))].sort(), [prompts]);

  const filteredPrompts = useMemo(() => {
    let result = prompts;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) result = result.filter(p => p.category === selectedCategory);
    if (selectedTag) result = result.filter(p => p.tags.includes(selectedTag));
    return result.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [prompts, searchQuery, selectedCategory, selectedTag]);

  return {
    prompts: filteredPrompts,
    allPrompts: prompts,
    searchQuery, setSearchQuery,
    selectedCategory, setSelectedCategory,
    selectedTag, setSelectedTag,
    categories, allTags,
    addPrompt, updatePrompt, deletePrompt,
    toggleFavorite, togglePin, incrementUsage,
    importPrompts, exportPrompts,
  };
}
