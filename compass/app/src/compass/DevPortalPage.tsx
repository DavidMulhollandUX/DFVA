import { BookOpen, Code, Shield, Activity } from "lucide-react";
import ApiKeyManager from "./components/ApiKeyManager";
import CodeSnippetLibrary from "./components/CodeSnippetLibrary";

export default function DevPortalPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="bg-muted/30 border-b">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <h1 className="text-4xl font-bold tracking-tight">
            Developer Portal
          </h1>
          <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
            Integrate DFVA assessments into your university's curriculum
            analytics pipeline. Clean API, typed SDKs, interactive playground —
            the developer experience Coursedog, Modern Campus, and CourseLoop
            don't offer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/developers/reference"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
            >
              <BookOpen className="h-4 w-4" />
              API Reference
            </a>
            <a
              href="/developers/compare"
              className="hover:bg-muted inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
            >
              <Shield className="h-4 w-4" />
              Compare API Quality
            </a>
            <a
              href="/developers/playground"
              className="hover:bg-muted inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium"
            >
              <Activity className="h-4 w-4" />
              API Playground
            </a>
          </div>
        </div>
      </section>

      {/* Quickstart */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold">Quickstart</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border p-6">
            <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-md">
              <span className="text-primary text-lg font-bold">1</span>
            </div>
            <h3 className="mb-2 font-semibold">Generate an API key</h3>
            <p className="text-muted-foreground text-sm">
              Use the API Key Manager below to create a key. Name it for your
              use case (e.g. "Production", "Analytics Pipeline").
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-md">
              <span className="text-primary text-lg font-bold">2</span>
            </div>
            <h3 className="mb-2 font-semibold">Make your first request</h3>
            <p className="text-muted-foreground text-sm">
              Use the code snippets below to list programs, get assessments, and
              compare degrees. Your first API call succeeds in under 2 minutes.
            </p>
          </div>

          <div className="rounded-lg border p-6">
            <div className="bg-primary/10 mb-4 flex h-10 w-10 items-center justify-center rounded-md">
              <span className="text-primary text-lg font-bold">3</span>
            </div>
            <h3 className="mb-2 font-semibold">Explore the docs</h3>
            <p className="text-muted-foreground text-sm">
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
