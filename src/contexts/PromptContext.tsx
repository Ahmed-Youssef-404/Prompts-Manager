import React, { createContext, useContext, ReactNode } from 'react';
import { usePrompts } from '@/hooks/usePrompts';

type PromptContextType = ReturnType<typeof usePrompts>;

const PromptContext = createContext<PromptContextType | null>(null);

export function PromptProvider({ children }: { children: ReactNode }) {
  const prompts = usePrompts();
  return <PromptContext.Provider value={prompts}>{children}</PromptContext.Provider>;
}

export function usePromptContext() {
  const ctx = useContext(PromptContext);
  if (!ctx) throw new Error('usePromptContext must be used within PromptProvider');
  return ctx;
}
