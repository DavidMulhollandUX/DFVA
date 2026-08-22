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
import ValidatedByResearch from "./components/ValidatedByResearch";
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
          description="Every program is measured on the same two axes, so the position is evidenced, repeatable and comparable across the portfolio."
          title={
            <>
              <p className="text-secondary text-center font-mono text-sm font-medium tracking-[0.18em] uppercase">
                What {brand.name} assesses
              </p>
              <h2 className="text-foreground mt-3 text-center font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Two measured axes, one defensible position
              </h2>
            </>
          }
        />
        <Trust />
        <MomentOfDecision />
        <Validation />
        <ValidatedByResearch />
        <FAQ faqs={faqs} />
        <ClosingCTA />
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}
