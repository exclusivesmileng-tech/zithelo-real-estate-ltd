"use client";

import { Check, MessageCircle, Phone } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import PropertyLeadForm from "@/components/PropertyLeadForm";
import { trackMeta } from "@/lib/metaPixel";

const PHONE_DISPLAY = "+234 9110 222 323";
const PHONE_TEL = "+2349110222323";

interface Props {
  projectName: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: string[];
}

/** Inline enquiry block for property pages — the qualification form, no click needed. */
export default function ProjectLeadSection({ projectName, eyebrow, title, intro, points }: Props) {
  const whatsappUrl = `https://wa.me/${PHONE_TEL.slice(1)}?text=${encodeURIComponent(
    `Hi Zithelo, I'm interested in ${projectName}.`
  )}`;

  return (
    <section id="enquire" className="section-padding bg-card scroll-mt-24">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-12 lg:gap-16 items-start">
        <AnimatedSection>
          <p className="text-[11px] tracking-[0.3em] uppercase text-primary font-body font-semibold mb-3">{eyebrow}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight">{title}</h2>
          <p className="mt-5 text-base text-foreground/80 font-body leading-relaxed max-w-lg">{intro}</p>
          <ul className="mt-7 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-foreground/80 font-body">
                <span className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={11} className="text-primary-foreground" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackMeta("Contact", { content_name: projectName, content_category: "WhatsApp" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-border bg-background text-foreground font-body font-semibold text-sm hover:border-primary/60 transition-colors"
            >
              <MessageCircle size={15} className="text-primary" /> Chat on WhatsApp
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => trackMeta("Contact", { content_name: projectName, content_category: "Call" })}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-border bg-background text-foreground font-body font-semibold text-sm hover:border-primary/60 transition-colors"
            >
              <Phone size={15} className="text-primary" /> {PHONE_DISPLAY}
            </a>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="bg-background border border-border rounded-2xl p-5 sm:p-7 shadow-xl shadow-black/5">
            <PropertyLeadForm projectName={projectName} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
