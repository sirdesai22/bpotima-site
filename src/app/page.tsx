import HeroSection from "@/components/HeroSection";
import LiveDecisionDemo from "@/components/LiveDecisionDemo";
import HowItWorks from "@/components/HowItWorks";
import WhyDeterministic from "@/components/WhyDeterministic";
import ForCTO from "@/components/ForCTO";
import SocialProof from "@/components/SocialProof";
import ClosingCTA from "@/components/ClosingCTA";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-8 text-center">
            Watch a real decision get made
          </h2>
          <LiveDecisionDemo />
        </div>
      </section>
      <HowItWorks />
      <WhyDeterministic />
      <ForCTO />
      <SocialProof />
      <ClosingCTA />
    </>
  );
}
