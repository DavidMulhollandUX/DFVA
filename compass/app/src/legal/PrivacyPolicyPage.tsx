// compass/app/src/legal/PrivacyPolicyPage.tsx
// Privacy policy — linked from the landing-page footer and the cookie-consent banner.
import { Link } from "react-router";
import { brand } from "../branding/brandConfig";

const LAST_UPDATED = "15 August 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen">
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-foreground text-4xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="text-foreground mt-10 space-y-8 text-base leading-7">
          <p>
            {brand.name} is a University of Melbourne research project that
            assesses the future viability of university degree programs. This
            policy explains what personal information we collect through this
            website, why we collect it, and how we handle it. We aim to comply
            with the Australian Privacy Principles under the Privacy Act 1988
            (Cth).
          </p>

          <section>
            <h2 className="text-2xl font-semibold">What we collect</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                <strong>Account information.</strong> When you create an account
                we collect your email address and a password. Passwords are
                stored only in hashed form.
              </li>
              <li>
                <strong>Content you provide.</strong> Program details and the
                handbook URLs you submit for assessment. Handbook pages are
                public — we read the same page a prospective student would.
                There is currently no way to upload private or unpublished
                curriculum, and no assessment reads from one.
              </li>
              <li>
                <strong>Graduate destination data.</strong> If your institution
                uploads it, we store a job title, employer, graduation year and
                program code per graduate — no names and no contact details. In
                a small cohort that combination could still point at one
                person, so we treat it as sensitive. It informs the assessment
                for that program only and never appears in a benchmark.
              </li>
              <li>
                <strong>Usage analytics.</strong> If you accept analytics
                cookies in the consent banner, we use Google Analytics to
                understand how the site is used. Analytics cookies are opt-in
                and can be rejected without affecting your use of the site.
              </li>
              <li>
                <strong>Payment details.</strong> If you purchase a paid plan,
                payment is processed by our payment provider (Stripe). We never
                see or store your full card details.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">How we use it</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                To operate your account and deliver assessments you request.
              </li>
              <li>
                To generate assessment results — content you submit may be
                processed by third-party AI services (e.g. OpenAI) solely to
                produce your assessment.
              </li>
              <li>To improve the service, using aggregate usage data.</li>
              <li>
                For research: anonymised, aggregate trends only. Individual
                assessments are confidential to the commissioning institution
                and are never published without explicit written consent.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Who we share it with</h2>
            <p className="mt-4">
              We do not sell personal information. We share data only with
              service providers needed to run the platform — cloud hosting and
              file storage, Google Analytics (if you opt in), Stripe for
              payments, and AI providers for assessment processing — and where
              required by law. Our application, database and file storage all
              run in Sydney. Some providers are based overseas: OpenAI (which
              processes assessment content), Stripe and our email provider are
              all in the United States. The{" "}
              <Link to="/trust" className="text-primary underline underline-offset-2">
                Trust page
              </Link>{" "}
              lists every provider and its location, and we update it before
              adding anyone new.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Retention and security</h2>
            <p className="mt-4">
              We keep personal information only as long as needed for the
              purposes above, then delete or de-identify it. Data is transmitted
              over encrypted connections and access is restricted to the project
              team. The{" "}
              <Link to="/trust" className="text-primary underline underline-offset-2">
                Trust page
              </Link>{" "}
              sets out how long we keep each kind of data and the deadlines we
              hold ourselves to for deleting it on request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Your rights</h2>
            <p className="mt-4">
              You may request access to, correction of, or deletion of your
              personal information, or withdraw analytics consent at any time
              (via the cookie banner settings). To exercise these rights, or to
              raise a privacy concern or complaint, contact us at{" "}
              <a
                href="mailto:privacy@evidura.ai"
                className="text-primary underline underline-offset-2"
              >
                privacy@evidura.ai
              </a>
              . If you are unsatisfied with our response you can complain to the
              Office of the Australian Information Commissioner (OAIC).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Changes to this policy</h2>
            <p className="mt-4">
              We may update this policy from time to time. Material changes will
              be flagged on this page with a new "last updated" date.
            </p>
          </section>

          <p className="text-muted-foreground text-sm">
            See also our{" "}
            <Link to="/trust" className="underline underline-offset-2">
              Trust page
            </Link>{" "}
            — where the data lives, exactly how long we keep each thing, and
            what we commit to when curriculum upload ships — and our{" "}
            <Link to="/terms" className="underline underline-offset-2">
              Terms of Service
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
