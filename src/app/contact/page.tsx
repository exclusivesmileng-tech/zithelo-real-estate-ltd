"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, ArrowRight, Clock, CheckCircle2, MessageSquare, Building2, Newspaper, Users, Share2 } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import AnimatedCard from "@/components/AnimatedCard";
import PageHero from "@/components/PageHero";
import ContactHeroVector from "@/components/heroes/ContactHeroVector";

const ENQUIRY_TYPES = [
  { value: "investment", label: "Investment", sub: "Opportunities & returns", icon: Building2 },
  { value: "partnership", label: "Partnership", sub: "Joint ventures & land", icon: Users },
  { value: "media", label: "Media / Press", sub: "PR & communications", icon: Newspaper },
  { value: "general", label: "General", sub: "Any other enquiry", icon: MessageSquare },
];

const CONTACT_ITEMS = [
  { icon: MapPin,     label: "Head Office", value: "Victoria Island, Lagos, Nigeria" },
  { icon: Mail,       label: "Email",       value: "info@zithelo.com" },
  { icon: Phone,      label: "Phone",       value: "+234 9110 222 323" },
  { icon: Share2,  label: "Instagram",   value: "@zithelohomes" },
  { icon: Clock,      label: "Response",    value: "Within 24 – 48 business hours" },
];

const NEXT_STEPS = [
  { step: "01", title: "Submit your enquiry", body: "Fill in the form with as much detail as possible so we can route your message to the right team." },
  { step: "02", title: "We review & respond", body: "A member of our team will review your enquiry and reach out within 24–48 business hours." },
  { step: "03", title: "Start the conversation", body: "We'll schedule a call or meeting to explore how Zithelo can best serve your goals." },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", type: "investment", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Contact Us"
        titleAccent="Let's Build Together."
        subtitle="Reach out to discuss investment opportunities, partnerships, or project enquiries."
        image="/images/project-commercial.jpg"
        breadcrumb="Get in Touch"
        vector={<ContactHeroVector />}
      />

      {/* ── Main grid: info + form ── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 xl:gap-16">

          {/* ── Left: info panel ── */}
          <AnimatedSection className="lg:col-span-2">
            <div className="h-full bg-[hsl(var(--charcoal))] rounded-sm p-8 md:p-10 flex flex-col gap-8 relative overflow-hidden">
              {/* Background texture */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
              <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{ background: "radial-gradient(circle, hsl(43 81% 61%) 0%, transparent 70%)" }} />

              <div className="relative z-10">
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">Get in Touch</p>
                <h2 className="font-display text-3xl font-bold text-white leading-tight">
                  We Welcome<br />
                  <span className="gold-gradient-text">Serious Conversations.</span>
                </h2>
                <p className="mt-4 text-white/55 font-body text-sm leading-relaxed">
                  Whether you&apos;re an investor, landowner, contractor, or journalist — our team is ready to engage.
                </p>
              </div>

              {/* Contact info cards */}
              <div className="relative z-10 flex flex-col gap-4">
                {CONTACT_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center shrink-0 shadow-md shadow-primary/20">
                      <item.icon size={15} className="text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-[9px] tracking-[0.2em] uppercase text-white/40 font-body font-semibold">{item.label}</p>
                      <p className="text-sm text-white/80 font-body mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Partnership note */}
              <div className="relative z-10 border border-primary/25 rounded-sm p-5 bg-primary/5">
                <p className="text-[9px] tracking-[0.2em] uppercase text-primary font-body font-semibold mb-2">Partnership &amp; Investment</p>
                <p className="text-xs text-white/55 font-body leading-relaxed">
                  For institutional discussions, joint ventures, or investment proposals, contact our partnerships team at{" "}
                  <span className="text-primary">partnerships@zithelo.com</span>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Right: form ── */}
          <AnimatedSection delay={0.15} className="lg:col-span-3">
            <div className="bg-card border border-border rounded-sm p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
                    <CheckCircle2 size={28} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">Enquiry Received</h3>
                  <p className="text-muted-foreground font-body text-sm max-w-xs leading-relaxed">
                    Thank you. A member of our team will be in touch within 24–48 business hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", type: "investment", message: "" }); }}
                    className="mt-4 px-6 py-3 border border-border rounded-sm font-body font-semibold text-sm text-foreground hover:border-primary/40 transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-body font-semibold mb-3">Enquiry Type</p>
                    <div className="grid grid-cols-2 gap-3">
                      {ENQUIRY_TYPES.map((t) => {
                        const active = formData.type === t.value;
                        return (
                          <button
                            key={t.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, type: t.value })}
                            className={`group relative text-left p-4 rounded-sm border transition-all duration-200 overflow-hidden ${
                              active
                                ? "border-primary/50 bg-primary/5 shadow-sm shadow-primary/10"
                                : "border-border hover:border-primary/30"
                            }`}
                          >
                            {active && <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient" />}
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2 ${active ? "gold-gradient shadow-sm shadow-primary/20" : "bg-muted"}`}>
                              <t.icon size={13} className={active ? "text-primary-foreground" : "text-muted-foreground"} />
                            </div>
                            <p className={`font-display text-sm font-bold leading-none ${active ? "text-primary" : "text-foreground"}`}>{t.label}</p>
                            <p className="text-[10px] text-muted-foreground font-body mt-1">{t.sub}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-body font-semibold mb-2 block">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-body font-semibold mb-2 block">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-body font-semibold mb-2 block">Company / Organisation</label>
                    <input
                      type="text"
                      placeholder="Optional"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <div>
                    <label className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-body font-semibold mb-2 block">Message *</label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your enquiry, goals, or how we can help…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-background border border-border rounded-sm px-4 py-3 text-foreground font-body text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full gold-gradient text-primary-foreground font-display font-bold text-sm tracking-[0.12em] uppercase py-4 rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-lg shadow-primary/20"
                  >
                    Submit Enquiry
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <p className="text-center text-[11px] text-muted-foreground font-body -mt-2">
                    Your information is handled with the utmost confidentiality.
                  </p>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── What happens next ── */}
      <section className="section-padding bg-card">
        <div className="max-w-[1400px] mx-auto">
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Process</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-12">
              What Happens <span className="gold-gradient-text">Next</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {NEXT_STEPS.map((s, i) => (
              <AnimatedCard key={s.step} index={i} className="relative bg-background border border-border rounded-sm p-8 overflow-hidden group hover:border-primary/30 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Large faded step number */}
                <p
                  className="absolute -bottom-3 -right-2 font-display text-8xl font-black text-foreground/[0.04] select-none pointer-events-none leading-none"
                >
                  {s.step}
                </p>
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-md shadow-primary/20 mb-6">
                  <span className="font-display text-sm font-black text-primary-foreground">{s.step}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{s.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{s.body}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="section-padding pb-0 bg-[hsl(var(--charcoal))] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />

        <div className="relative z-10 max-w-[1400px] mx-auto mb-8">
          <AnimatedSection>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-3">Find Us</p>
                <h2 className="font-display text-3xl font-bold text-white">
                  Victoria Island, <span className="gold-gradient-text">Lagos.</span>
                </h2>
              </div>
              <p className="text-white/40 font-body text-sm hidden md:block">Nigeria&apos;s premier commercial district</p>
            </div>
          </AnimatedSection>
        </div>

        <div className="w-full h-[300px] md:h-[460px] border-t border-white/10">
          <iframe
            title="Zithelo Head Office — Victoria Island, Lagos"
            src="https://maps.google.com/maps?q=Victoria+Island+Lagos+Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(40%) contrast(1.05) brightness(0.9)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
