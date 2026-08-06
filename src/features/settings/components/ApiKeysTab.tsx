import { useState } from 'react';
import { Key, Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useApiKeys, useGenerateApiKey, useRevokeApiKey } from '../../../hooks/useSettingsData';
import { SkeletonBlock } from '../../../components/shared/SkeletonBlock';
import { GenerateKeyModal } from './GenerateKeyModal';

export function ApiKeysTab() {
  const { data: keys, isLoading } = useApiKeys();
  const generateApiKey = useGenerateApiKey();
  const revokeApiKey = useRevokeApiKey();

  const [showGenerateModal, setShowGenerateModal] = useState(false);

  if (isLoading || !keys) {
    return <SkeletonBlock count={2} className="h-44 rounded-2xl" />;
  }

  const handleGenerateKeyAction = async (keyName: string): Promise<string | null> => {
    try {
      const res = await generateApiKey.mutateAsync(keyName);
      return res.rawKey;
    } catch {
      return null;
    }
  };

  return (
    <Card className="rounded-2xl border border-neutral-200/80 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 space-y-6">
      <CardHeader className="p-0 pb-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
              <Key className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-base font-bold text-neutral-900 dark:text-white font-display">
                API Keys & Developer Integrations
              </CardTitle>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Manage API secret keys used for CLI scripts, webhook triggers, and external LMS integrations.
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={() => setShowGenerateModal(true)}
            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 shrink-0"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Generate New Key
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-xl border border-neutral-200/80 dark:border-neutral-800">
          <table className="w-full text-xs text-left">
            <thead className="bg-neutral-50/80 border-b border-neutral-200/80 text-neutral-500 font-mono dark:bg-neutral-950/60 dark:border-neutral-800">
              <tr>
                <th className="p-3.5 font-semibold">Key Name / Description</th>
                <th className="p-3.5 font-semibold">Secret Masked Token</th>
                <th className="p-3.5 font-semibold">Created Date</th>
                <th className="p-3.5 font-semibold">Last Used</th>
                <th className="p-3.5 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {keys.map((key) => (
                <tr key={key.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40 transition-colors">
                  <td className="p-3.5 font-bold text-neutral-900 dark:text-white">
                    {key.name}
                  </td>
                  <td className="p-3.5 font-mono text-neutral-500">
                    {key.maskedKey}
                  </td>
                  <td className="p-3.5 text-neutral-500">
                    {key.createdAt}
                  </td>
                  <td className="p-3.5 font-mono text-neutral-400">
                    {key.lastUsedAt}
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => revokeApiKey.mutate(key.id)}
                      className="h-7 text-xs text-rose-600 hover:text-rose-700 dark:text-rose-400 p-0 font-semibold"
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" /> Revoke Key
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>

      <GenerateKeyModal
        isOpen={showGenerateModal}
        onClose={() => setShowGenerateModal(false)}
        onGenerate={handleGenerateKeyAction}
      />
    </Card>
  );
}
