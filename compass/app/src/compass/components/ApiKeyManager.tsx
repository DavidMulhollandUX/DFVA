import { useState } from 'react';
import { useAction, useQuery } from 'wasp/client/operations';
import { generateApiKey, revokeApiKey, listApiKeys } from 'wasp/client/operations';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../../client/components/ui/card';
import { Button } from '../../client/components/ui/button';
import { Input } from '../../client/components/ui/input';
import { Label } from '../../client/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../client/components/ui/dialog';
import { Key, Copy, Trash2, Check, AlertTriangle, Loader2 } from 'lucide-react';

export default function ApiKeyManager() {
  const { data: keys, isLoading, refetch } = useQuery(listApiKeys);
  const generateAction = useAction(generateApiKey);
  const revokeAction = useAction(revokeApiKey);
  const [newKeyName, setNewKeyName] = useState('');
  const [rawKey, setRawKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [revokingId, setRevokingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!newKeyName.trim()) return;
    setGenerating(true);
    setError(null);
    try {
      const result = await generateAction({ name: newKeyName.trim() });
      setRawKey(result.rawKey);
      setNewKeyName('');
      refetch();
    } catch (e: any) {
      setError(e.message || 'Failed to generate key');
    } finally {
      setGenerating(false);
    }
  }

  async function handleRevoke(keyId: string) {
    setRevokingId(keyId);
    setError(null);
    try {
      await revokeAction({ keyId });
      refetch();
    } catch (e: any) {
      setError(e.message || 'Failed to revoke key');
    } finally {
      setRevokingId(null);
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Keys
        </CardTitle>
        <CardDescription>
          Generate and manage API keys for programmatic access to DFVA.
          Keys are shown once — copy them immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Generate new key */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="key-name" className="sr-only">Key name</Label>
            <Input
              id="key-name"
              placeholder="Key name (e.g. 'Production', 'Staging')"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={generating || !newKeyName.trim()}
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-1" />
            ) : (
              <Key className="h-4 w-4 mr-1" />
            )}
            Generate
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <AlertTriangle className="h-4 w-4" />
            {error}
          </div>
        )}

        {/* Existing keys */}
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading keys...
          </div>
        ) : keys && keys.length > 0 ? (
          <div className="space-y-2">
            {keys.map((key: any) => (
              <div
                key={key.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div>
                  <div className="font-medium text-sm">{key.name}</div>
                  <div className="text-xs text-muted-foreground font-mono">
                    {key.keyPrefix}...
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(key.createdAt).toLocaleDateString()}
                    {!key.isActive && (
                      <span className="text-red-500 ml-2">(Revoked)</span>
                    )}
                  </div>
                </div>
                {key.isActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRevoke(key.id)}
                    disabled={revokingId === key.id}
                  >
                    {revokingId === key.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4 text-red-500" />
                    )}
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No API keys yet. Generate one above to get started.
          </p>
        )}

        {/* Raw key dialog */}
        <Dialog open={!!rawKey} onOpenChange={() => setRawKey(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Your API Key</DialogTitle>
              <DialogDescription>
                Copy this key now — it won't be shown again.
                Store it securely.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 rounded-md bg-muted p-3 font-mono text-sm break-all">
              <code className="flex-1">{rawKey}</code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => rawKey && copyToClipboard(rawKey)}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <DialogFooter>
              <Button onClick={() => setRawKey(null)}>
                I've saved my key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
