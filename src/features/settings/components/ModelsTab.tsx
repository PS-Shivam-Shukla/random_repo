import { useState } from 'react';
import { Cpu, CheckCircle2, Sparkles, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useModelSettings, useUpdateModels } from '../../../hooks/useSettingsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';

export function ModelsTab() {
  const { data: models, isLoading } = useModelSettings();
  const updateModels = useUpdateModels();

  const [provider, setProvider] = useState('OpenAI GPT-4o (Recommended)');
  const [promptVersion, setPromptVersion] = useState('v2.4 (Latest Stable)');
  const [showToast, setShowToast] = useState(false);

  if (isLoading || !models) {
    return <SkeletonBlock count={2} className="h-44 rounded-2xl" />;
  }

  const handleSave = () => {
    updateModels.mutate(
      { provider, promptVersion },
      {
        onSuccess: () => {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2500);
        },
      },
    );
  };

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
      {/* Toast Feedback */}
      {showToast && (
        <div className="fixed top-16 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xl animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-4 w-4" />
          <span>AI model provider & prompt settings updated!</span>
        </div>
      )}

      <CardHeader className="p-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Cpu className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
            AI Evaluator Model & Prompt Configuration
          </CardTitle>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Configure underlying LLM model providers and system prompt versions driving real-time evaluations.
        </p>
      </CardHeader>

      <CardContent className="p-0 space-y-6">
        {/* Info Callout */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
            <p className="font-bold text-neutral-900 dark:text-white">
              Architectural Impact Notice
            </p>
            <p className="mt-0.5">
              Changing the model provider or prompt version alters the evaluator reasoning latency and rubric stringency across all 12 LangGraph agent nodes.
            </p>
          </div>
        </div>

        {/* Model Form Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              AI LLM Model Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
            >
              <option value="OpenAI GPT-4o (Recommended)">OpenAI GPT-4o (Recommended)</option>
              <option value="Google Gemini 1.5 Pro">Google Gemini 1.5 Pro</option>
              <option value="Anthropic Claude 3.5 Sonnet">Anthropic Claude 3.5 Sonnet</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
              System Prompt Version
            </label>
            <select
              value={promptVersion}
              onChange={(e) => setPromptVersion(e.target.value)}
              className="w-full rounded-xl border border-neutral-200/90 bg-neutral-50/50 px-3.5 py-2 text-xs text-neutral-900 focus:bg-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-neutral-800 dark:bg-neutral-950/50 dark:text-white transition-all"
            >
              <option value="v2.4 (Latest Stable)">v2.4 (Latest Stable - FAANG Strictness)</option>
              <option value="v2.3 (Standard)">v2.3 (Standard Evaluation Matrix)</option>
              <option value="v2.1 (Legacy)">v2.1 (Legacy Benchmark)</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            type="button"
            onClick={handleSave}
            disabled={updateModels.isPending}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm shadow-blue-600/25 px-5 h-10"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Apply Model Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
