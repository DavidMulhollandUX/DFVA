// compass/app/src/legal/TermsOfServicePage.tsx
// Terms of service — linked from the landing-page footer and the cookie-consent banner.
import { Link } from "react-router";
import { brand } from "../branding/brandConfig";

const LAST_UPDATED = "15 August 2026";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          Terms of Service
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="text-foreground mt-10 space-y-8 text-base leading-7">
          <p>
            These terms govern your use of {brand.name} ({brand.domain}), an
            independent assessment service that assesses the future viability of
            university degree programs. By creating an account or using the site
            you agree to these terms.
          </p>

          <section>
            <h2 className="text-2xl font-semibold">The service</h2>
            <p className="mt-4">
              {brand.name} produces evidence-based assessments of degree
              programs against AI-driven labour-market change. It is currently
              operated as a pilot; features, availability, and methodology may
              change as the work evolves.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Your account</h2>
            <p className="mt-4">
              You are responsible for keeping your credentials secure and for
              activity under your account. You must provide accurate information
              and only submit content you have the right to share.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Acceptable use</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>No unlawful use, or interference with the service.</li>
              <li>
                No automated scraping or bulk extraction outside the documented
                developer API.
              </li>
              <li>
                No attempts to access other users' data or circumvent access
                controls.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Assessments are not advice
            </h2>
            <p className="mt-4">
              Assessments and scores are research outputs provided for
              information only. They are not professional, financial, or
              enrolment advice, and no decision should rest on them alone.
              Assessments are confidential to the commissioning institution; no
              program score is published without explicit written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Intellectual property</h2>
            <p className="mt-4">
              You retain rights to content you submit and grant us a licence to
              process it to deliver the service. The {brand.name} methodology,
              reports, and site content remain the property of the project and
              the University of Melbourne.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Disclaimers and liability
            </h2>
            <p className="mt-4">
              The service is provided "as is" without warranties of any kind, to
              the extent permitted by law. Nothing in these terms excludes
              rights you hold under the Australian Consumer Law. To the maximum
              extent permitted, our liability for any claim arising from use of
              the service is limited to the amount you paid for it in the 12
              months before the claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Termination and changes</h2>
            <p className="mt-4">
              You may close your account at any time. We may suspend accounts
              that breach these terms, and may update these terms — material
              changes will be flagged on this page with a new "last updated"
              date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">
              Governing law and contact
            </h2>
            <p className="mt-4">
              These terms are governed by the laws of Victoria, Australia.
              Questions about these terms:{" "}
              <a
                href="mailto:privacy@evidura.ai"
                className="text-primary underline underline-offset-2"
              >
                privacy@evidura.ai
              </a>
              .
            </p>
          </section>

          <p className="text-muted-foreground text-sm">
            See also our{" "}
            <Link to="/privacy" className="underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
