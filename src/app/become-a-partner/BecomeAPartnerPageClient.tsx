"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Handshake, Building2, Globe, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import AnimatedSection from "@/components/AnimatedSection";
import BecomeAPartnerHeroVector from "@/components/heroes/BecomeAPartnerHeroVector";

const partnerTypes = [
  { id: "jv", label: "Joint Venture", icon: Building2, desc: "Co-develop projects with Zithelo across prime urban corridors." },
  { id: "land", label: "Land Owner", icon: Globe, desc: "Bring your land asset into a structured development partnership." },
  { id: "contractor", label: "Contractor / Supplier", icon: Handshake, desc: "Provide services, materials, or expertise to our active builds." },
  { id: "other", label: "Other Partnership", icon: Users, desc: "Explore a bespoke arrangement suited to your capabilities." },
];

export default function BecomeAPartnerPageClient() {
  const [type, setType] = useState("");
  const [form, setForm] = useState({ name: "", company: "", email: "", phone: "", country: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/partner-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });
    } catch { /* fail silently */ }
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        title="Become a Partner"
        titleAccent="Build With Us."
        subtitle="We partner with landowners, contractors, and co-developers who share our commitment to quality urban development."
        image="/images/about-hero.jpg"
        breadcrumb="Partnership"
        vector={<BecomeAPartnerHeroVector />}
      />

      <section className="section-padding">
        <div className="max-w-[1100px] mx-auto">

          {/* Partnership types */}
          <AnimatedSection>
            <p className="text-[11px] tracking-[0.25em] uppercase text-primary font-body font-semibold mb-4">Partnership Types</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-10">
              How Would You Like to <span className="gold-gradient-text">Partner?</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
            {partnerTypes.map((pt, i) => (
              <motion.button
                key={pt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setType(pt.id)}
                className={`group text-left p-7 rounded-sm border transition-all duration-300 ${
                  type === pt.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className={`w-11 h-11 rounded-xl border-2 flex items-center justify-center mb-4 transition-all duration-300 ${
                  type === pt.id ? "border-primary bg-primary/10" : "border-border group-hover:border-primary/50"
                }`}>
                  <pt.icon size={20} className="text-primary" />
                </div>
                <h3 className={`font-display text-lg font-bold mb-2 transition-colors duration-300 ${type === pt.id ? "text-primary" : "text-foreground"}`}>
                  {pt.label}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{pt.desc}</p>
                {type === pt.id && (
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className="mt-4 h-[2px] w-10 gold-gradient rounded-full origin-left" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Form */}
          <AnimatedSection delay={0.2}>
            <div className="bg-card border border-border rounded-sm p-8 md:p-12">
              <div className="absolute top-0 left-0 right-0 h-[2px] gold-gradient opacity-60 rounded-t-sm" />
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full gold-gradient flex items-center justify-center mx-auto mb-6">
                    <Handshake size={28} className="text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">Thank You</h3>
                  <p className="text-muted-foreground font-body max-w-sm mx-auto">
                    We've received your partnership enquiry. Our team will be in touch within 2 business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { id: "name",    label: "Full Name",       type: "text",  required: true },
                      { id: "company", label: "Company / Organisation", type: "text", required: false },
                      { id: "email",   label: "Email Address",   type: "email", required: true },
                      { id: "phone",   label: "Phone Number",    type: "tel",   required: false },
                      { id: "country", label: "Country",         type: "text",  required: false },
                    ].map((f) => (
                      <div key={f.id} className={f.id === "message" ? "md:col-span-2" : ""}>
                        <label className="block text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground mb-2">
                          {f.label}{f.required && <span className="text-primary ml-1">*</span>}
                        </label>
                        <input
                          type={f.type}
                          required={f.required}
                          value={form[f.id as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                          className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200"
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-body font-semibold text-muted-foreground mb-2">
                      Tell Us About the Partnership
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Describe your proposal, assets, or how you'd like to collaborate..."
                      className="w-full bg-background border border-border rounded-sm px-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group inline-flex items-center gap-3 gold-gradient text-primary-foreground px-8 py-4 font-display font-bold text-sm tracking-[0.12em] uppercase rounded-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 disabled:opacity-60"
                  >
                    {loading ? "Submitting…" : <>Submit Partnership Enquiry<ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
