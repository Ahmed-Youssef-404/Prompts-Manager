export type AITool = 'ChatGPT' | 'Claude' | 'NotebookLM' | 'Gemini' | 'Copilot' | 'Midjourney' | 'Other';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  aiTool: AITool;
  isFavorite: boolean;
  isPinned: boolean;
  usageCount: number;
  createdAt: string;
  updatedAt: string;
}

export type PromptFormData = Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'usageCount'>;

export const AI_TOOLS: AITool[] = ['ChatGPT', 'Claude', 'NotebookLM', 'Gemini', 'Copilot', 'Midjourney', 'Other'];

export const DEFAULT_CATEGORIES = ['Coding', 'Writing', 'Study', 'AI', 'Marketing', 'Design', 'General'];

export const DEMO_PROMPTS: Prompt[] = [
  {
    id: '1',
    title: 'Code Review Assistant',
    description: 'Thorough code review with best practices and suggestions',
    content: 'You are a senior software engineer performing a code review. Analyze the following code for:\n\n1. **Bugs & Logic Errors** — Identify potential bugs or incorrect logic.\n2. **Performance** — Suggest optimizations where applicable.\n3. **Readability** — Recommend naming, formatting, and structural improvements.\n4. **Security** — Flag any security vulnerabilities.\n5. **Best Practices** — Ensure adherence to language-specific idioms and patterns.\n\nProvide your feedback in a structured format with severity levels (Critical, Warning, Suggestion).\n\nCode to review:\n```\n[PASTE CODE HERE]\n```',
    category: 'Coding',
    tags: ['code-review', 'engineering', 'best-practices'],
    aiTool: 'Claude',
    isFavorite: true,
    isPinned: true,
    usageCount: 42,
    createdAt: '2024-12-15T10:00:00Z',
    updatedAt: '2024-12-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Blog Post Writer',
    description: 'Generate well-structured blog posts on any topic',
    content: 'Write a comprehensive blog post about [TOPIC]. Follow this structure:\n\n1. **Engaging Title** — Create a compelling, SEO-friendly title.\n2. **Introduction** — Hook the reader with a surprising fact or question.\n3. **Main Body** — Cover 3-5 key points with examples and data.\n4. **Practical Tips** — Include actionable takeaways.\n5. **Conclusion** — Summarize and include a call-to-action.\n\nTone: Professional yet conversational. Length: ~1500 words. Include relevant subheadings.',
    category: 'Writing',
    tags: ['blog', 'content', 'seo'],
    aiTool: 'ChatGPT',
    isFavorite: false,
    isPinned: false,
    usageCount: 18,
    createdAt: '2024-12-20T14:30:00Z',
    updatedAt: '2024-12-20T14:30:00Z',
  },
  {
    id: '3',
    title: 'Study Notes Summarizer',
    description: 'Convert lengthy content into concise study notes',
    content: 'Summarize the following content into structured study notes:\n\n1. **Key Concepts** — List and briefly explain the main ideas.\n2. **Definitions** — Extract important terms with clear definitions.\n3. **Formulas/Rules** — Highlight any formulas, rules, or frameworks.\n4. **Examples** — Provide 1-2 examples for each key concept.\n5. **Review Questions** — Generate 5 questions to test understanding.\n\nFormat using bullet points and headers for easy scanning.\n\nContent to summarize:\n[PASTE CONTENT HERE]',
    category: 'Study',
    tags: ['study', 'notes', 'summarize'],
    aiTool: 'NotebookLM',
    isFavorite: true,
    isPinned: false,
    usageCount: 31,
    createdAt: '2025-01-05T09:15:00Z',
    updatedAt: '2025-01-05T09:15:00Z',
  },
  {
    id: '4',
    title: 'React Component Generator',
    description: 'Generate TypeScript React components with best practices',
    content: 'Create a React component with the following specifications:\n\nComponent Name: [NAME]\nPurpose: [DESCRIPTION]\nProps: [LIST PROPS]\n\nRequirements:\n- Use TypeScript with proper type definitions\n- Use functional component with hooks\n- Include proper error handling\n- Add JSDoc comments\n- Follow React best practices\n- Make it accessible (ARIA attributes)\n- Include example usage\n\nProvide the complete component code with imports.',
    category: 'Coding',
    tags: ['react', 'typescript', 'component'],
    aiTool: 'Claude',
    isFavorite: false,
    isPinned: false,
    usageCount: 27,
    createdAt: '2025-01-10T16:45:00Z',
    updatedAt: '2025-01-10T16:45:00Z',
  },
  {
    id: '5',
    title: 'Marketing Copy Framework',
    description: 'Create persuasive marketing copy using AIDA framework',
    content: 'Create marketing copy for [PRODUCT/SERVICE] using the AIDA framework:\n\n**Attention:** Write a headline that stops the reader.\n**Interest:** Build curiosity with a compelling story or statistic.\n**Desire:** Show benefits (not features) and include social proof.\n**Action:** Clear CTA with urgency.\n\nTarget audience: [AUDIENCE]\nTone: [TONE]\nPlatform: [PLATFORM]\n\nProvide 3 variations.',
    category: 'Marketing',
    tags: ['marketing', 'copywriting', 'aida'],
    aiTool: 'ChatGPT',
    isFavorite: false,
    isPinned: false,
    usageCount: 9,
    createdAt: '2025-02-01T11:00:00Z',
    updatedAt: '2025-02-01T11:00:00Z',
  },
];
