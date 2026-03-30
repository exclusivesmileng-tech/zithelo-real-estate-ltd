import { client } from "@/sanity/client";
import { ALL_REGIONS_QUERY } from "@/sanity/queries";
import type { SanityRegion } from "@/sanity/types";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import PageHero from "@/components/PageHero";
import AfricaVisionHeroVector from "@/components/heroes/AfricaVisionHeroVector";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const FALLBACK_REGIONS: SanityRegion[] = [
  { _id: "1", name: "West Africa",    countries: "Nigeria, Ghana, Senegal",     status: "Active",    description: "Our largest market with developments across Lagos, Accra, and Dakar." },
  { _id: "2", name: "East Africa",    countries: "Kenya, Rwanda, Tanzania",     status: "Active",    description: "Fast-growing markets with significant demand for premium urban spaces." },
  { _id: "3", name: "Southern Africa",countries: "South Africa, Botswana",      status: "Expansion", description: "Strategic entry into established markets with strong institutional frameworks." },
  { _id: "4", name: "North Africa",   countries: "Morocco, Egypt",              status: "Research",  description: "Evaluating opportunities in Africa's most mature real estate markets." },
];

const statusStyle: Record<string, string> = {
  Active:    "gold-gradient text-primary-foreground",
  Expansion: "bg-white/10 border border-white/20 text-white",
  Research:  "bg-border/60 text-muted-foreground",
};

const megaTrends = [
  { figure: "1.5B",  label: "Africans by 2025",       sub: "Fastest-growing population on Earth" },
  { figure: "60%",   label: "Urban by 2050",           sub: "From under 45% today" },
  { figure: "$1.7T", label: "Housing Deficit",         sub: "Estimated value of unmet demand" },
  { figure: "900M",  label: "New Urban Residents",     sub: "Will be added by 2050" },
];

export const revalidate = 60;

export default async function AfricaVisionPage() {
  const data: SanityRegion[] | null = await client.fetch(ALL_REGIONS_QUERY).catch(() => null);
  const regions = data?.length ? data : FALLBACK_REGIONS;

  return (
    <>
      <PageHero
        title="Africa Vision"
        titleAccent="The Urban Future is Now."
        subtitle="A continental strategy for urban transformation across Africa's fastest-growing cities."
        image="/images/hero-skyline.jpg"
        breadcrumb="Africa Vision"
        vector={<AfricaVisionHeroVector />}
      />

      {/* ── Mega trend stats bar ── */}
      <section className="bg-[hsl(var(--charcoal))] py-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/8">
            {megaTrends.map((s, i) => (
              <div key={s.label} className="text-center px-4">
                <p className="font-display text-3xl md:text-4xl font-black gold-gradient-text">{s.figure}</p>
                <p className="mt-1 text-sm font-display font-bold text-white">{s.label}</p>
                <p className="mt-0.5 text-[11px] text-white/45 font-body leading-snug">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Thesis ── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-5">Our Thesis</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.06]">
              Africa Will Add<br />
              <span className="gold-gradient-text">900 Million</span><br />
              Urban Residents by 2050
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              This is not a forecast — it is a certainty. The question is not whether African cities will grow, but whether they will grow well. Zithelo exists to ensure they do.
            </p>
            <p className="mt-5 text-lg text-muted-foreground font-body leading-relaxed">
              We are strategically positioned across key growth corridors to capture this once-in-a-generation opportunity — delivering the quality infrastructure, residences, and investment structures Africa's next generation will call home.
            </p>
            <div className="mt-8 h-[2px] w-14 gold-gradient rounded-full" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Regional footprint ── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-5">Our Footprint</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-14">
              Strategic <span className="gold-gradient-text">Regions</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regions.map((region, i) => (
              <AnimatedCard
                key={region.name}
                index={i}
                className="group relative bg-background border border-border rounded-sm p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-400 overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-0 group-hover:opacity-80 transition-opacity duration-300" />

                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {region.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2">
                      <MapPin size={11} className="text-primary" />
                      <p className="text-[11px] tracking-[0.15em] uppercase text-primary font-body font-semibold">{region.countries}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] tracking-[0.15em] uppercase font-body font-bold px-3 py-1.5 rounded-sm shrink-0 ${statusStyle[region.status] ?? statusStyle.Research}`}>
                    {region.status}
                  </span>
                </div>

                <p className="text-base text-muted-foreground font-body leading-relaxed">{region.description}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bold statement ── */}
      <section className="section-padding bg-[hsl(var(--charcoal))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-8 pointer-events-none"
          style={{ background: "radial-gradient(circle at top right, hsl(43 81% 61%) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <AnimatedSection>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white leading-[1.06] mb-6">
              We Are Not Just Building<br />
              <span className="gold-gradient-text">Properties.</span>
            </h2>
            <p className="text-lg text-white/60 font-body leading-relaxed mb-10 max-w-xl mx-auto">
              We are building the physical foundation of Africa's economic future. Every development is a statement of confidence in this continent's potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects" className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                View Our Projects <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link href="/become-an-investor" className="group inline-flex items-center gap-3 border border-white/20 text-white px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:bg-white/5 transition-all duration-300">
                Invest With Us <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
