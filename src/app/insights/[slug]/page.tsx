import { notFound } from "next/navigation";
import Link from "next/link";
import { client, urlFor } from "@/sanity/client";
import { INSIGHT_BY_SLUG_QUERY, ALL_INSIGHTS_QUERY } from "@/sanity/queries";
import type { SanityInsight } from "@/sanity/types";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import NewsletterSignup from "@/components/NewsletterSignup";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles: SanityInsight[] = await client.fetch(ALL_INSIGHTS_QUERY).catch(() => []);
  return articles
    .filter((a) => a.slug?.current)
    .map((a) => ({ slug: a.slug!.current }));
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return iso;
  }
}

// Very simple portable text renderer (no @portabletext/react needed)
function renderBody(body: unknown[]): React.ReactNode {
  return body.map((block: unknown, i: number) => {
    const b = block as { _type: string; style?: string; children?: { _key: string; text: string; marks?: string[] }[]; asset?: unknown; alt?: string };
    if (b._type === "image" && b.asset) {
      const src = urlFor(b.asset).width(900).url();
      return (
        <figure key={i} className="my-8">
          <img src={src} alt={b.alt ?? ""} className="w-full rounded-xl object-cover" />
          {b.alt && <figcaption className="text-center text-xs text-muted-foreground font-body mt-2">{b.alt}</figcaption>}
        </figure>
      );
    }
    if (b._type !== "block" || !b.children) return null;
    const text = b.children.map((span, si: number) => {
      const content = span.text;
      const bold = span.marks?.includes("strong");
      const italic = span.marks?.includes("em");
      if (bold && italic) return <strong key={si}><em>{content}</em></strong>;
      if (bold) return <strong key={si}>{content}</strong>;
      if (italic) return <em key={si}>{content}</em>;
      return <span key={si}>{content}</span>;
    });

    const style = b.style ?? "normal";
    if (style === "h2") return <h2 key={i} className="font-display text-2xl md:text-3xl font-bold text-foreground mt-10 mb-4">{text}</h2>;
    if (style === "h3") return <h3 key={i} className="font-display text-xl font-bold text-foreground mt-8 mb-3">{text}</h3>;
    if (style === "blockquote") return (
      <blockquote key={i} className="border-l-4 border-primary pl-5 my-6 italic text-foreground/70 font-body text-lg leading-relaxed">{text}</blockquote>
    );
    return <p key={i} className="font-body text-base md:text-lg text-foreground/80 leading-[1.85] mb-5">{text}</p>;
  });
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article: SanityInsight | null = await client
    .fetch(INSIGHT_BY_SLUG_QUERY, { slug })
    .catch(() => null);

  if (!article) notFound();

  const coverUrl = article.coverImage ? urlFor(article.coverImage).width(1400).url() : null;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[420px] md:min-h-[540px] flex items-end overflow-hidden bg-[hsl(var(--charcoal))]">
        {coverUrl && (
          <>
            <img src={coverUrl} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--charcoal))] via-[hsl(var(--charcoal))]/50 to-transparent" />
          </>
        )}
        {!coverUrl && (
          <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(hsl(43 81% 61%) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        )}

        <div className="relative z-10 w-full max-w-[860px] mx-auto px-6 md:px-12 pb-12 pt-32">
          <Link href="/insights" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-white/60 font-body font-semibold hover:text-primary transition-colors mb-6">
            <ArrowLeft size={13} /> All Insights
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {article.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 gold-gradient rounded-full text-[10px] tracking-[0.15em] uppercase font-body font-bold text-primary-foreground">
                <Tag size={9} /> {article.category}
              </span>
            )}
            {article.date && (
              <span className="inline-flex items-center gap-1.5 text-xs text-white/50 font-body">
                <Calendar size={11} /> {formatDate(article.date)}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-[1.1]">{article.title}</h1>
          {article.excerpt && (
            <p className="mt-4 text-white/60 font-body text-base md:text-lg leading-relaxed max-w-2xl">{article.excerpt}</p>
          )}
        </div>
      </section>

      {/* ── Body ── */}
      <section className="section-padding">
        <div className="max-w-[860px] mx-auto">
          <AnimatedSection>
            {article.body?.length ? (
              <div className="prose-zithelo">
                {renderBody(article.body)}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-muted-foreground font-body text-lg">Full article coming soon.</p>
                <p className="text-muted-foreground font-body text-sm mt-2">Subscribe below to be notified when it's published.</p>
              </div>
            )}
          </AnimatedSection>

          {/* Divider */}
          <div className="flex items-center gap-4 my-12">
            <div className="flex-1 h-px bg-border" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Newsletter CTA */}
          <AnimatedSection delay={0.1}>
            <NewsletterSignup variant="card" />
          </AnimatedSection>

          {/* Back link */}
          <div className="mt-10 flex justify-center">
            <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={14} /> Back to all insights
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
