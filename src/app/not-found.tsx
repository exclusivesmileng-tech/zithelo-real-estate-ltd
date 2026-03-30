import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center section-padding text-center">
      <p className="text-sm tracking-[0.2em] uppercase text-primary mb-4 font-body font-semibold">404</p>
      <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6">Page Not Found</h1>
      <p className="text-lg text-muted-foreground font-body max-w-md mb-10">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="gold-gradient px-8 py-4 text-sm tracking-[0.15em] uppercase font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Return Home
      </Link>
    </div>
  );
}
