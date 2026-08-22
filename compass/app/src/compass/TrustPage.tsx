// compass/app/src/compass/TrustPage.tsx
// Public trust page. Source of truth for the wording is docs/trust/*.md —
// if this page and those files disagree, the files win.
//
// Launch gates: the flags below keep an unverified claim from shipping by
// accident. Anything that depends on a fact we have not confirmed is either
// hidden or rendered as an explicit "confirmed on request", never stated
// as though it were settled.
import { Link } from "react-router";
import type { ReactNode } from "react";
import {
  ShieldCheck,
  FileSearch,
  Trash2,
  Server,
  Users,
  Lock,
  Check,
  Clock,
  Mail,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../client/components/ui/card";

// The model provider's zero-retention terms are a claim about somebody else's
// behaviour, so we do not publish it until it is contractually confirmed.
// While false, that commitment is simply absent rather than hedged.
const ZERO_RETENTION_CONFIRMED = false;

// Verified 2026-08-14 from response headers and deployment config:
//   Fly (application server) → syd    [fly-request-id suffix]
//   Vercel (static frontend) → syd1   [x-vercel-id]
//   S3 (file storage)        → ap-southeast-2  [AWS_S3_REGION]
//   Database                 → ap-southeast-2  [confirmed by DJ, 2026-08-14]
// Set to null if this ever moves and is not immediately re-confirmed; the row
// then reads "Confirmed on request" rather than asserting a stale region.
const DATABASE_REGION: string | null = "Sydney, Australia (ap-southeast-2)";

const LAST_UPDATED = "14 August 2026";
const CONTACT_EMAIL = "privacy@evidura.ai";

const SUBPROCESSORS: {
  name: string;
  purpose: string;
  region: string | null;
}[] = [
  {
    name: "Fly.io",
    purpose: "Runs the application",
    region: "Sydney, Australia",
  },
  {
    name: "Vercel",
    purpose: "Serves the website. No customer data is stored here.",
    region: "Sydney, Australia",
  },
  {
    name: "Amazon S3",
    purpose: "File storage",
    region: "Sydney, Australia (ap-southeast-2)",
  },
  { name: "PostgreSQL", purpose: "The database", region: DATABASE_REGION },
  {
    name: "OpenAI",
    purpose: "Runs the model that drafts assessments",
    region: "United States",
  },
  {
    name: "Stripe",
    purpose: "Payments. Card details go straight to Stripe and never reach us.",
    region: "United States",
  },
  {
    name: "SendGrid",
    purpose: "Sends account emails",
    region: "United States",
  },
];

const RETENTION = [
  {
    data: "Curriculum documents you upload",
    kept: "24 hours",
    note: "Deleted automatically once your assessment finishes. You don't have to ask.",
  },
  {
    data: "Working files from an assessment",
    kept: "24 hours",
    note: "Text we pull out of your documents along the way. Never kept.",
  },
  {
    data: "Scores, bands and evidence citations",
    kept: "Until you delete them",
    note: "This is the part we keep.",
  },
  {
    data: "Your account and billing records",
    kept: "As long as the law requires",
    note: "Listed individually in your deletion certificate.",
  },
];

function Section({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

export default function TrustPage() {
  const commitments: ReactNode[] = [
    <>
      <strong>We will never use your curriculum to train a model.</strong> Not
      ours, and not anyone else's. It won't be fine-tuned into anything, and it
      won't sit in a search index that another institution's assessment can
      reach.
    </>,
    ...(ZERO_RETENTION_CONFIRMED
      ? [
          <>
            <strong>
              The model provider doesn't keep your content either.
            </strong>{" "}
            We send it to an endpoint that retains nothing once the request is
            finished.
          </>,
        ]
      : []),
    <>
      <strong>Your documents are deleted within 24 hours.</strong> Once the
      assessment finishes, the files go. They aren't archived or moved into cold
      storage — they're deleted, automatically.
    </>,
    <>
      <strong>We keep the score, not the syllabus.</strong> What stays behind is
      the result: the dimension scores, the band, which version of the rubric we
      used, and short quotations showing where each score came from. That's
      enough to defend a score in a review meeting. It isn't enough to rebuild
      your curriculum.
    </>,
    <>
      <strong>Nothing goes into a benchmark unless you say so.</strong> Being
      assessed and sharing your results with other institutions are two separate
      decisions. We'll never treat a yes to the first as a yes to the second.
    </>,
    <>
      <strong>
        We won't name your institution without your written consent.
      </strong>{" "}
      Benchmarks show bands rather than raw scores, and only when at least five
      programs are in the comparison.
    </>,
    <>
      <strong>
        If you leave, everything is deleted within 30 days and we send you a
        certificate.
      </strong>{" "}
      You don't have to ask for it.
    </>,
  ];

  return (
    <div className="min-h-screen">
      <section className="border-b bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950/30">
        <div className="mx-auto max-w-5xl px-4 py-20 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <ShieldCheck className="h-10 w-10 text-blue-600" />
            <h1 className="text-foreground text-4xl font-bold tracking-tight">
              Trust
            </h1>
          </div>
          <p className="text-foreground mx-auto mb-4 max-w-2xl text-xl font-medium">
            We keep the score, not the syllabus.
          </p>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Everything on this page is written so you can check it. If there's a
            claim here you can't see how to verify, tell us and we'll rewrite
            it.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-5xl space-y-10 px-4 py-16">
        <Section
          icon={<FileSearch className="h-5 w-5 text-blue-600" />}
          title="What we hold today"
        >
          <p className="text-foreground">
            <strong>
              We've never held an institution's private curriculum, because
              there's currently no way to send it to us.
            </strong>
          </p>
          <p className="text-muted-foreground">
            Assessments read published handbook pages. You give us a public URL,
            and we read the same thing a prospective student would. There's no
            way to upload internal subject guides, unpublished course documents
            or draft curriculum, and no assessment reads from one.
          </p>
          <p className="text-muted-foreground">
            You don't have to take our word for that one. There's no upload
            button to find.
          </p>
          <div className="bg-muted/40 space-y-3 rounded-lg border p-4">
            <p className="text-muted-foreground text-sm font-medium">
              The personal information we do hold
            </p>
            <p className="text-muted-foreground text-sm">
              For your account: your email address, your username, and whether
              you're subscribed. No student records, no staff records, nothing
              about anyone's health or finances. Card details go straight to
              Stripe and never touch our systems.
            </p>
            <p className="text-muted-foreground text-sm">
              There's one other case worth naming. If your institution uploads
              graduate destination data, we store a job title, an employer, a
              graduation year and a program code for each graduate —{" "}
              <strong>no names and no contact details</strong>. Those fields
              aren't identifying on their own, but in a small cohort a
              particular combination could point at one person, so we treat this
              data as sensitive: it's used only to inform the assessment for
              that program, it never appears in a benchmark, and you can have it
              deleted on the same terms as anything else below.
            </p>
          </div>
        </Section>

        <Section
          icon={<Server className="h-5 w-5 text-blue-600" />}
          title="Where your data is stored"
        >
          <p className="text-muted-foreground">
            The application and its file storage run in Sydney. Below is
            everyone we rely on, what they do, and where they are.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pr-4 pb-2 font-medium">Provider</th>
                  <th className="pr-4 pb-2 font-medium">What they do</th>
                  <th className="pb-2 font-medium">Where</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {SUBPROCESSORS.map((s) => (
                  <tr key={s.name} className="border-b last:border-0">
                    <td className="text-foreground py-3 pr-4 font-medium">
                      {s.name}
                    </td>
                    <td className="py-3 pr-4">{s.purpose}</td>
                    <td className="py-3">
                      {s.region ?? (
                        <span className="text-muted-foreground italic">
                          Confirmed on request
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm">
            We'll tell you before we add anyone to this list.
          </p>
        </Section>

        <Section
          icon={<Lock className="h-5 w-5 text-blue-600" />}
          title="What we'll promise when you can upload curriculum"
        >
          <p className="text-muted-foreground">
            Uploading your own course documents isn't possible yet. When it is,
            these are the rules we'll be holding ourselves to — so you can read
            them before you decide, rather than after.
          </p>
          <ol className="space-y-4">
            {commitments.map((item, i) => (
              <li key={i} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          icon={<Clock className="h-5 w-5 text-blue-600" />}
          title="How long we keep things"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pr-4 pb-2 font-medium">What</th>
                  <th className="pr-4 pb-2 font-medium">How long</th>
                  <th className="pb-2 font-medium">Why</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {RETENTION.map((r) => (
                  <tr key={r.data} className="border-b last:border-0">
                    <td className="text-foreground py-3 pr-4 font-medium">
                      {r.data}
                    </td>
                    <td className="py-3 pr-4">{r.kept}</td>
                    <td className="py-3">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground text-sm">
            When we delete something it goes from our live systems straight
            away. Encrypted backups take a little longer, because they expire on
            a fixed cycle — we'll tell you exactly how long that is rather than
            claim backups can be erased instantly, which nobody can honestly
            promise. If we ever restore a backup holding something you deleted,
            it gets deleted again.
          </p>
        </Section>

        <Section
          icon={<Trash2 className="h-5 w-5 text-blue-600" />}
          title="Deleting your data"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                t: "5 business days",
                d: "Delete a single document you uploaded",
              },
              {
                t: "10 business days",
                d: "Delete a program's assessment along with its source material, or export everything we hold for you",
              },
              {
                t: "30 days",
                d: "If you leave: everything deleted, with a signed certificate listing what was destroyed, when, from which systems, and when the last backup expires",
              },
            ].map((x) => (
              <div key={x.t} className="rounded-lg border p-4">
                <p className="text-foreground font-semibold">{x.t}</p>
                <p className="text-muted-foreground mt-1 text-sm">{x.d}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            If we miss one of these deadlines, we'll tell you before you notice,
            with the reason and a new date. We won't offer you a service credit
            for it — a credit doesn't fix the actual problem, which is that we
            still have data you asked us to delete.
          </p>
        </Section>

        <Section
          icon={<Users className="h-5 w-5 text-blue-600" />}
          title="Benchmarks are opt-in, one program at a time"
        >
          <p className="text-muted-foreground">
            You choose which programs go into a cross-institutional comparison,
            and you can change your mind at any time. A comparison group only
            appears once at least five programs are in it — below that we show
            nothing at all, rather than a group small enough to guess your
            institution from. We also hide neighbouring groups where the
            difference between them would give you away.
          </p>
          <p className="text-muted-foreground">
            If you withdraw a program, the comparisons are recalculated. One
            honest limit: if a benchmark has already been exported into a PDF or
            a slide, we can't pull that back.
          </p>
        </Section>

        <Section
          icon={<ShieldCheck className="h-5 w-5 text-blue-600" />}
          title="About the scores themselves"
        >
          <p className="text-muted-foreground">
            Evidura assesses <strong>programs, not people</strong>. No personal
            information goes into an assessment. A score is something to bring
            to a decision, not something that makes one.
          </p>
          <p className="text-muted-foreground">
            Every score can be argued with, because we show our working. The
            rubric is published and versioned, each score carries the quotations
            it was based on, and every assessment records which version of the
            rubric and the engine produced it. A score you can't interrogate
            isn't one you should act on — ours included.
          </p>
        </Section>

        <Section
          icon={<Mail className="h-5 w-5 text-blue-600" />}
          title="Talking to us"
        >
          <p className="text-muted-foreground">
            Questions about any of this, a completed HECVAT for your procurement
            team, or a request to delete something — email{" "}
            <a
              className="text-blue-600 underline"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              {CONTACT_EMAIL}
            </a>
            . We'll acknowledge within one business day, and the clock on any
            deletion request starts from that acknowledgement.
          </p>
          <p className="text-muted-foreground text-sm">
            The{" "}
            <Link className="text-blue-600 underline" to="/privacy">
              privacy policy
            </Link>{" "}
            and{" "}
            <Link className="text-blue-600 underline" to="/terms">
              terms of service
            </Link>{" "}
            are the binding versions of this. If you're building against our
            API, the{" "}
            <Link className="text-blue-600 underline" to="/developers">
              developer portal
            </Link>{" "}
            covers how keys and authentication work.
          </p>
        </Section>

        <div className="border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            Last updated {LAST_UPDATED}. We'll tell customers in advance, in
            writing, before weakening anything on this page — and changes won't
            apply retrospectively to work already done under an earlier version.
          </p>
        </div>
      </div>
    </div>
  );
}
