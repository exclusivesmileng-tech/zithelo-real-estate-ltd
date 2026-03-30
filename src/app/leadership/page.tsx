import { client } from "@/sanity/client";
import { ALL_TEAM_QUERY } from "@/sanity/queries";
import type { SanityTeamMember } from "@/sanity/types";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import PageHero from "@/components/PageHero";
import LeadershipHeroVector from "@/components/heroes/LeadershipHeroVector";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FALLBACK_BOARD: SanityTeamMember[] = [
  { _id: "b1", name: "Arc. Odunayo Lawani, MBA, PMP, PMI-RMP, PMI-PBA", role: "Board Advisor (Technical & Development)", category: "Board", bio: "Arc. Odunayo Lawani is an accomplished architect and project leader with over two decades of experience delivering complex construction and development projects across Nigeria. As Board Advisor, he provides independent technical oversight and strategic guidance across the Group's developments, ensuring alignment with global standards in design, engineering integrity, and project execution." },
  { _id: "b2", name: "Mrs. Ibitayo Akinbobola", role: "Chief Executive Officer", category: "Board", bio: "Mrs. Ibitayo Akinbobola is a healthcare entrepreneur and business leader responsible for driving execution across Zithelo Group's operations and development portfolio. As CEO, she leads the translation of strategy into results, overseeing operations, product development, sales, and market positioning." },
  { _id: "b3", name: "Dr. Oluwaseun Akinbobola", role: "Chairman, Zithelo Group", category: "Board", bio: "Dr. Oluwaseun Akinbobola is a healthcare entrepreneur, business strategist, and investor with a proven track record of building and scaling multi-sector businesses across healthcare, real estate, and consumer markets. As Chairman, he provides strategic direction and governance oversight." },
];

const FALLBACK_TEAM: SanityTeamMember[] = [
  { _id: "m1", name: "Mrs. Ibitayo Akinbobola", role: "Chief Executive Officer", category: "Management", bio: "Mrs. Ibitayo Akinbobola is a healthcare entrepreneur and business leader responsible for driving execution across Zithelo Group's operations and development portfolio." },
  { _id: "m2", name: "Mr. Ibikunle Iwalewa", role: "Group Head, Human Resources & Administration", category: "Management", bio: "Mr. Ibikunle Iwalewa is a highly experienced human capital and corporate services leader with over three decades of professional experience across telecommunications, banking, real estate, and multinational organizations." },
  { _id: "m3", name: "Builder Filusi Toyin Diya", role: "Head, Projects", category: "Management", bio: "Builder Filusi Toyin Diya is an accomplished construction professional and Quantity Surveyor with over two decades of experience delivering high-value residential, commercial, and industrial developments across Nigeria." },
  { _id: "m4", name: "TBA", role: "Head, Finance", category: "Management", bio: "This position is being recruited to lead the Group's financial strategy, reporting, and investment structuring functions." },
  { _id: "m5", name: "Mr. Gabriel Akintayo", role: "Head, Customer Experience", category: "Management", bio: "Gabriel Akintayo is a customer experience professional with an MBA and a strong track record in service delivery, client engagement, and operational excellence." },
  { _id: "m6", name: "TBA", role: "Lead Sales Consultant", category: "Management", bio: "This position is being recruited to lead sales strategy and client acquisition across the Group's development portfolio." },
];

function getInitials(name: string) {
  if (name === "TBA") return "?";
  return name.split(" ").filter(Boolean).slice(0, 2).map((n) => n[0]).join("");
}

export const revalidate = 60;

export default async function LeadershipPage() {
  const data: SanityTeamMember[] | null = await client.fetch(ALL_TEAM_QUERY).catch(() => null);
  const allMembers = data?.length ? data : [...FALLBACK_BOARD, ...FALLBACK_TEAM];
  const board = allMembers.filter((m) => m.category === "Board");
  const team  = allMembers.filter((m) => m.category === "Management");

  return (
    <>
      <PageHero
        title="Leadership"
        titleAccent="Built to Execute."
        subtitle="Governance, expertise, and long-term vision guiding every development."
        image="/images/about-hero.jpg"
        breadcrumb="Our Team"
        vector={<LeadershipHeroVector />}
      />

      {/* ── Intro ── */}
      <section className="section-padding pb-0">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-5">Who Leads Us</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-[1.06]">
              A Team Built for<br />
              <span className="gold-gradient-text">Scale & Precision.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-lg text-muted-foreground font-body leading-relaxed">
              Zithelo's leadership team brings together deep expertise across development, operations, and strategic oversight — creating a strong foundation for delivering high-quality assets and sustainable returns.
            </p>
            <p className="mt-5 text-lg text-muted-foreground font-body leading-relaxed">
              With complementary strengths in technical delivery, systems-driven execution, and investment strategy, the team is positioned to scale responsibly while maintaining discipline, quality, and investor confidence.
            </p>
            <div className="mt-8 flex gap-4">
              <Link href="#board" className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-primary border-b border-primary pb-0.5 hover:opacity-70 transition-opacity">Board & Governance</Link>
              <span className="text-border">·</span>
              <Link href="#management" className="text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground border-b border-transparent hover:border-primary hover:text-primary transition-all pb-0.5">Management Team</Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Board ── */}
      <section id="board" className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[2px] w-8 gold-gradient rounded-full" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold">Governance</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-14">
              Board & <span className="gold-gradient-text">Advisory</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {board.map((member, i) => (
              <AnimatedCard
                key={member._id}
                index={i}
                className="group relative bg-card border border-border rounded-sm p-8 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-400 overflow-hidden"
              >
                {/* Top gold accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Avatar */}
                <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  <span className="font-display text-xl font-black text-primary-foreground">
                    {getInitials(member.name)}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-[10px] tracking-[0.18em] uppercase text-primary font-body font-semibold mb-5">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{member.bio}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Management ── */}
      <section id="management" className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-[2px] w-8 bg-border rounded-full" />
              <p className="text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-body font-semibold">Operations</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-14">
              Executive <span className="gold-gradient-text">Management</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => {
              const isTBA = member.name === "TBA";
              return (
                <AnimatedCard
                  key={member._id}
                  index={i}
                  className={`group bg-background border border-border rounded-sm p-7 hover:border-primary/30 transition-all duration-300 ${isTBA ? "opacity-60" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isTBA ? "bg-muted" : "bg-[hsl(var(--charcoal))]"}`}>
                    <span className={`font-display text-base font-bold ${isTBA ? "text-muted-foreground" : "text-primary"}`}>
                      {getInitials(member.name)}
                    </span>
                  </div>

                  <h3 className={`font-display text-base font-bold leading-snug mb-1.5 ${isTBA ? "text-muted-foreground" : "text-foreground group-hover:text-primary transition-colors duration-300"}`}>
                    {member.name}
                  </h3>
                  <p className="text-[9px] tracking-[0.18em] uppercase text-primary font-body font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{member.bio}</p>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Join CTA ── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <div className="bg-[hsl(var(--charcoal))] rounded-sm p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }} />
              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Join the Team</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  We're Building a World-Class<br />
                  <span className="gold-gradient-text">African Real Estate Team.</span>
                </h3>
              </div>
              <Link
                href="/contact"
                className="relative z-10 group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 shrink-0"
              >
                Get in Touch
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
