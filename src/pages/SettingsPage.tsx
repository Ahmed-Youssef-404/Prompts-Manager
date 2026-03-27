import { useState, useRef } from 'react';
import { usePromptContext } from '@/contexts/PromptContext';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Download, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { allPrompts, exportPrompts, importPrompts } = usePromptContext();
  const { isDark, toggle } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = exportPrompts();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prompts-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Prompts exported!');
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = importPrompts(ev.target?.result as string);
      if (result) toast.success('Prompts imported!');
      else toast.error('Invalid file format');
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearAll = () => {
    if (confirm('Delete all prompts? This cannot be undone.')) {
      localStorage.removeItem('prompt-manager-prompts');
      window.location.reload();
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your preferences and data</p>
      </motion.div>

      <div className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Appearance</h3>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Toggle between light and dark theme</p>
            </div>
            <Switch checked={isDark} onCheckedChange={toggle} />
          </label>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4">Data</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Export Prompts</p>
                <p className="text-xs text-muted-foreground">{allPrompts.length} prompts as JSON</p>
              </div>
              <Button variant="secondary" size="sm" className="gap-1.5" onClick={handleExport}>
                <Download className="w-4 h-4" /> Export
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-foreground">Import Prompts</p>
                <p className="text-xs text-muted-foreground">Import from JSON file</p>
              </div>
              <div>
                <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
                <Button variant="secondary" size="sm" className="gap-1.5" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-4 h-4" /> Import
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-destructive/20 rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-destructive mb-4">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Delete All Prompts</p>
              <p className="text-xs text-muted-foreground">This action cannot be undone</p>
            </div>
            <Button variant="destructive" size="sm" className="gap-1.5" onClick={handleClearAll}>
              <Trash2 className="w-4 h-4" /> Delete All
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-2">Keyboard Shortcuts</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Search prompts</span>
              <kbd className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">⌘K</kbd>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">New prompt</span>
              <kbd className="font-mono text-xs bg-secondary px-2 py-0.5 rounded">⌘N</kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
