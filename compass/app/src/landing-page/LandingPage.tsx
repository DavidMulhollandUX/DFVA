import FAQ from "./components/FAQ";
import FeaturesGrid from "./components/FeaturesGrid";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import WhyDFVA from "../compass/WhyDFVA";
import {
  faqs,
  features,
  footerNavigation,
  testimonials,
} from "./contentSections";

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <main className="isolate">
        <Hero />
        <FeaturesGrid
          features={features}
          title={
            <>
              <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                What COMPASS assesses
              </p>
              <h3 className="text-foreground mt-3 text-center text-3xl font-bold">
                Built for curriculum committees
              </h3>
            </>
          }
        />
        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <WhyDFVA compact />
        </section>
        <Testimonials testimonials={testimonials} />
        <FAQ faqs={faqs} />
      </main>
      <Footer footerNavigation={footerNavigation} />
    </div>
  );
}
