import { BookOpen, Code, Shield, Activity } from 'lucide-react';
import ApiKeyManager from './components/ApiKeyManager';
import CodeSnippetLibrary from './components/CodeSnippetLibrary';

export default function DevPortalPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight">
            Developer Portal
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Integrate DFVA assessments into your university's curriculum
            analytics pipeline. Clean API, typed SDKs, interactive playground —
            the developer experience Coursedog, Modern Campus, and CourseLoop
            don't offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/developers/reference"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <BookOpen className="h-4 w-4" />
              API Reference
            </a>
            <a
              href="/developers/compare"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <Shield className="h-4 w-4" />
              Compare API Quality
            </a>
            <a
              href="/developers/playground"
              className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              <Activity className="h-4 w-4" />
              API Playground
            </a>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-bold mb-6">Quickstart</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-4">
              <span className="text-lg font-bold text-primary">1</span>
            </div>
            <h3 className="font-semibold mb-2">Generate an API key</h3>
            <p className="text-sm text-muted-foreground">
              Use the API Key Manager below to create a key. Name it for your
              use case (e.g. "Production", "Analytics Pipeline").
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-4">
              <span className="text-lg font-bold text-primary">2</span>
            </div>
            <h3 className="font-semibold mb-2">Make your first request</h3>
            <p className="text-sm text-muted-foreground">
              Use the code snippets below to list programs, get assessments,
              and compare degrees. Your first API call succeeds in under 2
              minutes.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 mb-4">
              <span className="text-lg font-bold text-primary">3</span>
            </div>
            <h3 className="font-semibold mb-2">Explore the docs</h3>
            <p className="text-sm text-muted-foreground">
              Browse the interactive API reference, try the playground, or
              download the OpenAPI 3.1 spec for your security review.
            </p>
          </div>
        </div>
      </section>

      {/* API Key Manager (auth-gated section) */}
      <section className="mx-auto max-w-5xl px-6 pb-12">
        <ApiKeyManager />
      </section>

      {/* Code Snippets */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <CodeSnippetLibrary />
      </section>
    </div>
  );
}
