import { brand } from "../branding/brandConfig";
import ClosingCTA from "./components/ClosingCTA";
import FAQ from "./components/FAQ";
import FeaturesGrid from "./components/FeaturesGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import MomentOfDecision from "./components/MomentOfDecision";
import Problem from "./components/Problem";
import Trust from "./components/Trust";
import Validation from "./components/Validation";
import { faqs, features, footerNavigation } from "./contentSections";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="isolate">
        <Hero />
        <Problem />
        <HowItWorks />
        <FeaturesGrid
          features={features}
          description="Every program is scored on the same rubric, so the verdict is evidenced, repeatable and comparable across the sector."
          title={
            <>
              <p className="text-secondary text-center font-mono text-sm font-medium uppercase tracking-[0.18em]">
                What {brand.name} assesses
              </p>
              <h2 className="text-foreground mt-3 text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Eleven dimensions, one comparable signal
              </h2>
            </>
          }
        />
        <Trust />
        <MomentOfDecision />
        <Validation />
        <FAQ faqs={faqs} />
        <ClosingCTA />
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}
