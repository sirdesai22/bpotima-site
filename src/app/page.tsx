import HeroSection from "@/components/HeroSection";
import VideoSection from "@/components/VideoSection";
import LiveDecisionDemo from "@/components/LiveDecisionDemo";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ComparisonSection from "@/components/ComparisonSection";
import ModelFamilySection from "@/components/ModelFamilySection";
import RouterSection from "@/components/RouterSection";
import IndustriesSection from "@/components/IndustriesSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <VideoSection />
      <section className="border-b border-line py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <span className="font-mono text-[11px] text-ink-soft tracking-widest uppercase">
            Trace a decision yourself
          </span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-ink mt-4">
            Trace a decision yourself.
          </h2>
          <p className="font-sans text-base md:text-lg text-ink-soft mt-3 max-w-2xl leading-relaxed">
            Pick a real workflow. Run it. Then click any fact, rule, or decision to
            see exactly why it happened — all the way back to the source document.
          </p>
          <div className="mt-8" id="interactive-demo">
            <LiveDecisionDemo />
          </div>
        </div>
      </section>
      <ProblemSection />
      <SolutionSection />
      <ComparisonSection />
      <ModelFamilySection />
      <RouterSection />
      <IndustriesSection />
      <EnterpriseSection />
      <TeamSection />
      <ContactSection />
    </>
  );
}
